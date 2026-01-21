import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
    // Clear session data
    const cookieHeader = request.headers.get('cookie');
    const sessionToken = cookieHeader?.match(/sessionToken=([^;]+)/)?.[1];
    
    if (sessionToken) {
      // Remove session from storage (in real app, remove from database/Redis)
      const sessions = JSON.parse(process.env.SESSIONS_DATA || '{}');
      delete sessions[sessionToken];
      process.env.SESSIONS_DATA = JSON.stringify(sessions);
    }

    // Return success response with cleared cookie
    return NextResponse.json(
      { message: 'Logout successful' },
      { 
        status: 200,
        headers: {
          'Set-Cookie': 'sessionToken=; HttpOnly; Path=/; Max-Age=0'
        }
      }
    );

  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}