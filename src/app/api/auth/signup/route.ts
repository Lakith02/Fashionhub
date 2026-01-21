import { NextResponse } from 'next/server';

interface SignupRequestBody {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
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
    const body: SignupRequestBody = await request.json();
    
    const { firstName, lastName, email, password } = body;

    // Basic validation
    if (!firstName || !lastName || !email || !password) {
      return NextResponse.json(
        { error: 'All fields are required' },
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

    // Password validation (at least 6 characters)
    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters long' },
        { status: 400 }
      );
    }

    // Check if user already exists (in real app, this would query database)
    // For demo purposes, we'll simulate checking against stored users
    const existingUsers = JSON.parse(process.env.USERS_DATA || '[]');
    const userExists = existingUsers.find((user: User) => user.email === email);
    
    if (userExists) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 409 }
      );
    }

    // Create new user (in real app, hash password and save to database)
    const newUser = {
      id: Date.now().toString(),
      firstName,
      lastName,
      email,
      createdAt: new Date().toISOString()
    };

    // Store user data (in real app, save to database)
    const updatedUsers = [...existingUsers, newUser];
    process.env.USERS_DATA = JSON.stringify(updatedUsers);

    // Return success response
    return NextResponse.json(
      { 
        message: 'User created successfully',
        user: {
          id: newUser.id,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          email: newUser.email
        }
      },
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