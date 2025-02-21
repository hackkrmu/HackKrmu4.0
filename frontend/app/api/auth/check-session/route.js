import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function GET(req) {
  const token = req.cookies.get('token'); // Retrieve token from cookies

  if (!token) {
    return NextResponse.json({ isAuthenticated: false, message: 'Not logged in' }, { status: 401 });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, 'secret-key'); // Replace with your actual secret
    return NextResponse.json({ isAuthenticated: true, user: decoded });
  } catch (err) {
    return NextResponse.json({ isAuthenticated: false, message: 'Invalid token' }, { status: 401 });
  }
}
