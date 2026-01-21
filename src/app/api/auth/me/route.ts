import { NextResponse } from 'next/server';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: string;
}

export async function GET(request: Request) {
  try {
    // Get session token from cookies
    const cookieHeader = request.headers.get('cookie');
    const sessionToken = cookieHeader?.match(/sessionToken=([^;]+)/)?.[1];
    
    if (!sessionToken) {
      return NextResponse.json(
        { error: 'No session token found' },
        { status: 401 }
      );
    }

    // Get session data
    const sessions = JSON.parse(process.env.SESSIONS_DATA || '{}');
    const sessionData = sessions[sessionToken];
    
    if (!sessionData) {
      return NextResponse.json(
        { error: 'Invalid session' },
        { status: 401 }
      );
    }

    // Get user data
    const existingUsers: User[] = JSON.parse(process.env.USERS_DATA || '[]');
    const user = existingUsers.find(u => u.id === sessionData.userId);
    
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Return user data
    return NextResponse.json({
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
      }
    });

  } catch (error) {
    console.error('Auth check error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}