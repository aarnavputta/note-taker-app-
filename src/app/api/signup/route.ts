import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import sql from 'mssql';

// Use process.env for DB config
const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  options: {
    encrypt: true, // for Azure
    trustServerCertificate: false,
  },
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, password, confirmPassword } = body;
    
    // Log the incoming request (without password for security)
    console.log('Signup request received:', { name, email, passwordLength: password?.length });

    // Validation
    if (!name || !email || !password || !confirmPassword) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }
    if (password !== confirmPassword) {
      return NextResponse.json(
        { error: 'Passwords do not match' },
        { status: 400 }
      );
    }
    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters long' },
        { status: 400 }
      );
    }

    // Connect to DB
    const { DB_USER, DB_PASSWORD, DB_SERVER, DB_DATABASE } = process.env;
    if (!DB_USER || !DB_PASSWORD || !DB_SERVER || !DB_DATABASE) {
      return NextResponse.json(
        { error: 'Database configuration is missing in environment variables' },
        { status: 500 }
      );
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
      return NextResponse.json(
        { error: 'Database connection failed' },
        { status: 500 }
      );
    }

    // Check if user already exists
    const checkUser = await pool.request()
      .input('email', sql.NVarChar, email)
      .query('SELECT * FROM Users WHERE email = @email');
    if (checkUser.recordset.length > 0) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 409 }
      );
    }

    // Hash password
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // Insert new user
    try {
      await pool.request()
        .input('name', sql.NVarChar, name)
        .input('email', sql.NVarChar, email)
        .input('passwordHash', sql.NVarChar, passwordHash)
        .query('INSERT INTO Users (name, email, passwordHash) VALUES (@name, @email, @passwordHash)');
    } catch (insertErr) {
      console.error('Insert error:', insertErr);
      return NextResponse.json(
        { error: 'Failed to create user' },
        { status: 500 }
      );
    }

    // Success
    console.log('User created successfully:', { name, email });
    return NextResponse.json(
      { message: 'User created successfully', user: { name, email } },
      { status: 201 }
    );
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 