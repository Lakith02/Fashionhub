import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

interface SigninRequestBody {
  email: string;
  password: string;
  rememberMe?: boolean;
}

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: string;
}

export async function POST(request: Request) {
  try {
    const body: SigninRequestBody = await request.json();
    const { email, password, rememberMe = false } = body;

    // Basic validation
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // In a real app, you would verify the password against hashed password in database
    // For demo purposes, we'll accept any password for existing users
    
    // Get existing users
    const existingUsers: User[] = JSON.parse(process.env.USERS_DATA || '[]');
    const user = existingUsers.find(u => u.email === email);
    
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // In real app: verify password hash
    // const isValidPassword = await bcrypt.compare(password, user.hashedPassword);
    // if (!isValidPassword) {
    //   return NextResponse.json(
    //     { error: 'Invalid email or password' },
    //     { status: 401 }
    //   );
    // }

    // Create session token (in real app, use JWT or session management)
    const sessionToken = `token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // Set cookie for session (in real app, use secure, httpOnly cookies)
    const cookieStore = cookies();
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: rememberMe ? 30 * 24 * 60 * 60 : 24 * 60 * 60, // 30 days or 1 day
      path: '/',
    };

    // Store session data (in real app, store in database or Redis)
    const sessions = JSON.parse(process.env.SESSIONS_DATA || '{}');
    sessions[sessionToken] = {
      userId: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      createdAt: new Date().toISOString()
    };
    process.env.SESSIONS_DATA = JSON.stringify(sessions);

    // Return success response with user data
    return NextResponse.json(
      { 
        message: 'Sign in successful',
        user: {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email
        },
        token: sessionToken
      },
      { 
        status: 200,
        headers: {
          'Set-Cookie': `sessionToken=${sessionToken}; HttpOnly; Path=/; Max-Age=${cookieOptions.maxAge}`
        }
      }
    );

  } catch (error) {
    console.error('Signin error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}