"use server"
import mongoose from "mongoose";
import User from "../../models/UserModel";
import { NextResponse } from "next/server";
var CryptoJS = require("crypto-js");
var jwt = require("jsonwebtoken");
import { cookies } from 'next/headers'


// String does not match expected pattern occurs on not parsing the response to JSON or fetching the wrong URL


// const handler = async (req, res) =>{
// const {name, email, password} = req.body
// const user = await User.create({
//     name,
//     email,
//     password
// })
// res.status(201).json({
//     message: 'User Created Successfully',
//     user
// })

// export async function POST(req, res) {
// //   let user = [];
//   const payload = await req.json();
//   await mongoose.connect(process.env.MONGODB_URI);
//   let user = await User.find({
//     Email: payload.Email,
//   });
// console.log(user);
//   if (user) {
//     if (
//       payload.Email === user[0].Email &&
//       payload.Password === user[0].Password
//     ) {
//       console.log("Authenticated");
//     //   status;
//       //  res.status(200).json({success: true}, {username:user.username, Email:user.Email })
//       return NextResponse.json({success: true, message: 'Successfully Logged in', username:user.username, Email:user.Email})
//       // username:user.username, Email:user.Email
//       // return NextResponse.json(JSON.stringify({success: true, message: 'Successfully Loged in'}),{ status: 200, headers: { 'content-type': 'application/json' } }, {username:user.username, Email:user.Email })
//     } else {
//     //   message = "Wrong username or Email address";
//     //   success = false;
//     //   status = 401;
//       return NextResponse.json({success: false, message: "Wrong username or Email address"})
//     }
//   }
// }

await mongoose.connect(process.env.MONGODB_URI);
export async function POST(req) {
  // let user = [];
  let success = true;
  let message = "Successfully Logged in";
  let status = 201;
  const payload = await req.json();

  //   console.log(payload.Email===undefined);

  // if(payload.Email===undefined) {
  //     message="User not found"
  // }
  // hhi@mail.com
  // console.log(payload.Password)
  // console.log(JSON.parse(encryptedPassword))
  console.log(payload)
  const user = await User.find({
    Email: payload.Email,
  });
  console.log(user);
 
  console.log(payload.Password);
  if (user.length !== 0) {
    let decryptedPassword = CryptoJS.AES.decrypt(
      user[0].Password,
      process.env.CRYPTO_JS_KEY
    ).toString(CryptoJS.enc.Utf8);
    console.log(decryptedPassword);
        
    
    if (
          payload.Email === user[0].Email &&
          payload.Password === decryptedPassword
    ) {
      console.log("Authenticated", user[0].Email, user[0].Password);
      var token = jwt.sign({Email:user[0].Email, username: user[0].username, ContactNumber: user[0].ContactNumber, Address: user[0].Address}, process.env.JWT_SECRET, { expiresIn: '3d' });

      console.log("Token", token)
      // var objToken = {
      //   token: token,
      // }
      //Save Cookies=>
        // const response =  NextResponse.json(token, {status:201} );
        // response.cookies.set("token", token,{
        //   httpOnly: true
        // });
        // return response;
        
        cookies().set('token', token, { secure: true,  httpOnly: true })

      return NextResponse.json(
        { result: user, success, message,token: token },
        { status, headers: { "content-type": "application/json" } }
      );
    } else {
      console.log("Wrong password");
      return NextResponse.json(
        { success: false, message: "Wrong Password" },
        { status: 401, headers: { "content-type": "application/json" } }
      );
    }
  } else if (user.length === 0) {
    console.log("User not found");
    return NextResponse.json(
      { result: user, success: false, message: "User not found" },
      { status: 200, headers: { "content-type": "application/json" } }
    );
  }

  // user = { result: "Error" };
  // success = false;
  // message = "Invalid Credientials";
  // status=200
  // console.log("Error is", e);

  // return NextResponse.json({result:user, success})
}
// export async function gettingUserss(userEmail) {
//   await mongoose.connect(process.env.MONGODB_URI);
//   const user = await User.find({
//     Email: userEmail,
//   });
//   console.log(user);
//   // return user
// }

export async function GET(req) {
  try {
      
    let userEmail= req.nextUrl.searchParams.get("userEmail");
    console.log(userEmail);
    const users = await User.find({Email:userEmail});

    console.log(users, "from login");
    return NextResponse.json( { result: users})
  } catch (error) {
    console.error('Error fetching users:', error);
    NextResponse.json({ error: 'Internal Server Error' });
  }
}