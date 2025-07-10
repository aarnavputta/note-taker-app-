import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import sql from 'mssql';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Ensure all DB env variables are defined
    const { DB_USER, DB_PASSWORD, DB_SERVER, DB_DATABASE } = process.env;
    if (!DB_USER || !DB_PASSWORD || !DB_SERVER || !DB_DATABASE) {
      return NextResponse.json(
        { error: 'Database configuration is missing in environment variables' },
        { status: 500 }
      );
    }

    const dbConfig = {
      user: DB_USER,
      password: DB_PASSWORD,
      server: DB_SERVER,
      database: DB_DATABASE,
      options: {
        encrypt: true,
        trustServerCertificate: false,
      },
    };

    // Connect to DB
    let pool;
    try {
      pool = await sql.connect(dbConfig);
    } catch (dbErr) {
      console.error('❌ DB connection error:', dbErr);
      return NextResponse.json(
        { error: 'Database connection failed' },
        { status: 500 }
      );
    }

    // Find user by email
    const userResult = await pool.request()
      .input('email', sql.NVarChar, email)
      .query('SELECT * FROM Users WHERE email = @email');
    if (userResult.recordset.length === 0) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }
    const user = userResult.recordset[0];

    // Compare password
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Success: login allowed
    return NextResponse.json(
      { message: 'Login successful', user: { name: user.name, email: user.email } },
      { status: 200 }
    );
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 