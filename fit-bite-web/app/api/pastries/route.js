import mongoose from "mongoose";
// import User from '@/models/UserModel';
import Pastries from "@/app/models/PastriesModel";
import { NextResponse } from "next/server";

//Get pastries based on pagination
export async function GET(req) {
  let page = req.nextUrl.searchParams.get("page") || 1;
  let pageSize = 3;
  let skip = (page - 1) * pageSize;
  let pastries = [];
  let success = true;
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    pastries = await Pastries.find().skip(skip).limit(pageSize);

    // console.log(pastries);
  } catch (e) {
    pastries = { result: "error" };
    success = false;
    // console.log(e);
  }
  return NextResponse.json({ result: pastries, success });
}



export async function POST(req) {
  const payload = await req.json();
  await mongoose.connect(process.env.MONGODB_URI);
  let d = new Pastries(payload);
  const result = await d.save();
  return NextResponse.json({ result, success: true });
}
//Get all pastries
// export async function GET() {
//   let pastries = [];
//   let success = true;
//   try {
//     await mongoose.connect(process.env.MONGODB_URI);
//     pastries = await Pastries.find();

//     console.log(pastries);
//   } catch (e) {
//     pastries = { result: "error" };
//     success = false;
//   }
//   return NextResponse.json({ result: pastries, success });
// }

// if(user){
// if (req.body.Email == user.Email && req.body.Password == user.Password){
//     //  res.status(200).json({success: true}, {username:user.username, Email:user.Email })
//     return NextResponse.json({success: true, message: 'Successfully Logged in', username:user.username, Email:user.Email})
//     // username:user.username, Email:user.Email
//     // return NextResponse.json(JSON.stringify({success: true, message: 'Successfully Loged in'}),{ status: 200, headers: { 'content-type': 'application/json' } }, {username:user.username, Email:user.Email })
// }

// }
// if(user){
// if (req.body.Email == user.Email && req.body.Password == user.Password){
//     //  res.status(200).json({success: true}, {username:user.username, Email:user.Email })
//     return NextResponse.json({success: true, message: 'Successfully Logged in', username:user.username, Email:user.Email})
//     // username:user.username, Email:user.Email
//     // return NextResponse.json(JSON.stringify({success: true, message: 'Successfully Loged in'}),{ status: 200, headers: { 'content-type': 'application/json' } }, {username:user.username, Email:user.Email })
// }

// }
// console.log(e);
// else {
//         // If no user is found, send a different response (e.g., success: false)
//         res.status(200).json({ success: false, message: "User not found" });
//       }
// const payload = await req.json();
// await mongoose.connect(process.env.MONGODB_URI);
// let user = new User(payload);
// const result = await user.save();
// return NextResponse.json({ result, success: true });
//     ex
