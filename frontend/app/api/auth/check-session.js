// import { NextResponse } from 'next/server';
// import jwt from 'jsonwebtoken';

// // Define the handler function for your API route
// export async function GET(req) {
//   // Retrieve the token from cookies
//   const token = req.cookies.token;

//   if (!token) {
//     // No token found, user is not authenticated
//     return NextResponse.json({ isAuthenticated: false, message: 'Not logged in' }, { status: 401 });
//   }

//   try {
//     // Verify the token
//     const decoded = jwt.verify(token, process.env.JWT_SECRET); // Replace 'process.env.JWT_SECRET' with your actual secret
//     // Token is valid, return authentication status
//     return NextResponse.json({ isAuthenticated: true, user: decoded });
//   } catch (err) {
//     // Token is invalid
//     return NextResponse.json({ isAuthenticated: false, message: 'Invalid token' }, { status: 401 });
//   }
// }
