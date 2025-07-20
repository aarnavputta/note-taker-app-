import type { NextAuthOptions } from "next-auth"
import GitHubProvider from 'next-auth/providers/github'
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs';
import sql from 'mssql';

export const options: NextAuthOptions = {
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {
                    label: "Email",
                    type: "text",
                    placeholder: "email"
                },
                password: {
                    label: "Password",
                    type: "password",
                    placeholder: "password"
                }
            },
            async authorize(credentials){
                const email = credentials?.email;
                const password = credentials?.password;
                if (!email || !password) {
                    return null;
                }
                // Ensure all DB env variables are defined
                const { DB_USER, DB_PASSWORD, DB_SERVER, DB_DATABASE } = process.env;
                if (!DB_USER || !DB_PASSWORD || !DB_SERVER || !DB_DATABASE) {
                    throw new Error('Database configuration is missing in environment variables');
                }
                const dbConfig = {
                    user: DB_USER as string,
                    password: DB_PASSWORD as string,
                    server: DB_SERVER as string,
                    database: DB_DATABASE as string,
                    options: {
                        encrypt: true,
                        trustServerCertificate: false,
                    },
                };
                let pool;
                try {
                    pool = await sql.connect(dbConfig);
                } catch (dbErr) {
                    console.error('DB connection error:', dbErr);
                    return null;
                }
                // Find user by email
                const userResult = await pool.request()
                    .input('email', sql.NVarChar, email)
                    .query('SELECT * FROM Users WHERE email = @email');
                if (userResult.recordset.length === 0) {
                    return null;
                }
                const user = userResult.recordset[0];
                // Compare password
                const isMatch = await bcrypt.compare(password, user.passwordHash);
                if (!isMatch) {
                    return null;
                }
                // Success: return user object for session
                return { id: user.id, name: user.name, email: user.email };
            }
        })
    ],
    pages: {
        signIn: '/', // Redirect to your custom login page
    },
    callbacks: {
        async signIn({ user, account, profile }) {
            if (account?.provider === 'github' || account?.provider === 'google') {
                const { DB_USER, DB_PASSWORD, DB_SERVER, DB_DATABASE } = process.env;
                if (!DB_USER || !DB_PASSWORD || !DB_SERVER || !DB_DATABASE) {
                    return false;
                }
                const dbConfig = {
                    user: DB_USER as string,
                    password: DB_PASSWORD as string,
                    server: DB_SERVER as string,
                    database: DB_DATABASE as string,
                    options: {
                        encrypt: true,
                        trustServerCertificate: false,
                    },
                };
                try {
                    const pool = await sql.connect(dbConfig);
                    
                    // Check if user already exists
                    const userResult = await pool.request()
                        .input('email', sql.NVarChar, user.email)
                        .query('SELECT * FROM Users WHERE email = @email');
                    
                    if (userResult.recordset.length === 0) {
                        // Create new OAuth user
                        await pool.request()
                            .input('email', sql.NVarChar, user.email)
                            .input('name', sql.NVarChar, user.name)
                            .query('INSERT INTO Users (email, name, passwordHash) VALUES (@email, @name, NULL)');
                    }
                    // If user exists, just log them in (account linking)
                } catch (error) {
                    console.error('OAuth user creation error:', error);
                    return false;
                }
            }
            return true;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.name = token.name;
                session.user.email = token.email;
            }
            return session;
        },
        async jwt({ token, user }) {
            if (user?.name) token.name = user.name;
            if (user?.email) token.email = user.email;
            return token;
        }
    },
}