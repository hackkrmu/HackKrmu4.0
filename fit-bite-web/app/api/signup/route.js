import mongoose from "mongoose";
import User from "@/app/models/UserModel";
import { NextResponse } from "next/server";
var CryptoJS = require("crypto-js");
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
// await mongoose.connect(process.env.MONGODB_URI);
export async function POST(req) {
  const payload = await req.json();
  await mongoose.connect(process.env.MONGODB_URI);
  const { username, ContactNumber, Address, Email } = payload;
  let user = new User({ username, ContactNumber, Address, Email, Password: CryptoJS.AES.encrypt(payload.Password, process.env.CRYPTO_JS_KEY).toString() });
  const result = await user.save();
  return NextResponse.json({ result, success: true });
}
//     export async function POST(req, res) {
//     if(req.method === 'POST'){
//         console.log(req.body)
//         let u = new User(req.body)
//         console.log(req.body);

//         await u.save()
//         return res.json({ success: true });
//     }else{
//        return res.json({ success: false, message:"faileddd"});
//         // return res.status(400).json({error: "Bad Request, Method not allowed"})
//     }
// }
// }
// export async function POST(req, res) {
//     const payload = await req.json();
//     await mongoose.connect(process.env.MONGODB_URI);
//     let d = new Restaurant(payload);
//     const result = await d.save();
//     return NextResponse.json({ result, success: true });
//   }

// export default connectDb(handler)
