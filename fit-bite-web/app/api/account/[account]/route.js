import User from "@/app/models/UserModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
var CryptoJS = require("crypto-js");
var jwt = require("jsonwebtoken");
await mongoose.connect(process.env.MONGODB_URI);

export async function PUT(req, content) {
  try {
    console.log(content);
    let userId = content.params.account;
    let filter = { _id: userId };
    let payload = await req.json();
    console.log(payload);

    let modifypayload = Object.keys(payload);
    for (var i = 0; i < modifypayload.length; i++) {
      if (Object.values(payload)[i].length < 2) {
        console.log("I am going to delete", modifypayload[i]);
        delete modifypayload[i];
      } else if (typeof Object.values(payload)[i] === "number") {
        if (Object.values(payload)[i].toString().length < 9) {
          console.log("I am going to delete this number", modifypayload[i]);
          delete modifypayload[i];
        }
      } else {
        console.log(modifypayload[i]);
      }
    }
    const resultObject = modifypayload.reduce((obj, key) => {
      if (key !== undefined) {
        obj[key] = payload[key];
      }
      return obj;
    }, {});

    console.log(resultObject, "resultObject");
    console.log(modifypayload, "modifyPayload");

    let result;
    if (resultObject.Password) {
      console.log(resultObject.Password, "Password");
      if (resultObject.Password.toString().length > 2) {
        resultObject.Password = CryptoJS.AES.encrypt(
          resultObject?.Password,
          "SecretKey"
        ).toString();
        // let objWithPw = {
        //   username: payload?.username,
        //   ContactNumber: payload?.ContactNumber,
        //   Address: payload?.Address,
        //   Email: payload?.Email,
        //   Password: CryptoJS.AES.encrypt(
        //     payload?.Password,
        //     "SecretKey"
        //   ).toString(),
        // };
        // {
        //     username: 'Abhijeet',
        //     ContactNumber: '1234567789',
        //     Address: '22/3 LA, USA',
        //     Email: 'abhijeet@mail.com',
        //     Password: 'kensis-tyddAf-6qormi'
        //   }
      }
    }
    result = await User.findOneAndUpdate(filter, resultObject);
    // else {

    //   result = await User.findOneAndUpdate(filter,resultObject);
    // }
    if (result._id && resultObject.Email.length > 1) {
      var token = jwt.sign(
        {
          Email: resultObject.Email,
        },
        process.env.JWT_SECRET,
        { expiresIn: "3d" }
      );

      console.log("Token", token);
      return NextResponse.json({ result, token, success: true });
    }

    /// REVERT BACK  ///////////
    // let result;
    // if (payload.Password.length> 2) {
    //   let objWithPw = {
    //     username: payload?.username,
    //     ContactNumber: payload?.ContactNumber,
    //     Address: payload?.Address,
    //     Email: payload?.Email,
    //     Password: CryptoJS.AES.encrypt(
    //       payload?.Password,
    //       "SecretKey"
    //     ).toString(),
    //   };
    //   // {
    //   //     username: 'Abhijeet',
    //   //     ContactNumber: '1234567789',
    //   //     Address: '22/3 LA, USA',
    //   //     Email: 'abhijeet@mail.com',
    //   //     Password: 'kensis-tyddAf-6qormi'
    //   //   }
    //   result = await User.findOneAndUpdate(filter, objWithPw);
    // } else {
    //   delete payload.Password
    //   result = await User.findOneAndUpdate(filter, payload);
    // }
    // if (result._id) {
    //   var token = jwt.sign(
    //     {
    //       Email: payload.Email,
    //       username: payload.username,
    //       ContactNumber: payload.ContactNumber,
    //       Address: payload.Address,
    //     },
    //      process.env.JWT_SECRET,
    //     { expiresIn: "3d" }
    //   );

    //   console.log("Token", token);
    //   return NextResponse.json({ result, token, success: true });
    // }
    /// REVERT BACK  ///////////

    //         order = await Order.findOne({ chargeId });
    //       } else {
    //         order = await Order.findByIdAndUpdate(id, { deliveryStatus });

    return NextResponse.json({ result, success: true });
  } catch (err) {
    return NextResponse.json({ success: false });
  }
}
