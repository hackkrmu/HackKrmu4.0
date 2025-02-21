import mongoose from "mongoose";
import Admin from "@/app/models/AdminModel";
import { NextResponse } from "next/server";
var jwt = require("jsonwebtoken");
await mongoose.connect(process.env.MONGODB_URI);

// export async function POST(req, res) {
//     const payload = await req.json();
//     await mongoose.connect(process.env.MONGODB_URI);
//     const { username, Email, Password } = payload;
//     let user = new Admin({ username, Email, Password});
//     const result = await user.save();
//     return NextResponse.json({ result, success: true });
//   }
export async function POST(req) {
  let success = true;
  let message = "Successfully Logged in";
  let status = 201;
  const payload = await req.json();

  console.log(payload);
  const user = await Admin.find({
    Email: payload.Email,
  });
  console.log(user, "user found");

  console.log(user.Password);
  if (user.length !== 0) {
    if (
      payload.Email === user[0].Email &&
      payload.Password === user[0].Password
    ) {
      console.log("Authenticated", user[0].Email, user[0].Password);
      var token = jwt.sign(
        {
          Email: user[0].Email,
          username: user[0].username,
        },
        process.env.JWT_SECRET,
        { expiresIn: "3d" }
      );

      console.log("Token", token);
      // cookies().set('adminToken', token, { secure: true })
      return NextResponse.json(
        { result: user, success, message, token: token },
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
}
