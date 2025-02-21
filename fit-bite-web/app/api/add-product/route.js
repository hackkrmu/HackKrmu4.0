import mongoose from "mongoose";
import OtherProduct from "@/app/models/OtherProductModel";
import { NextResponse } from "next/server";
var CryptoJS = require("crypto-js");


export async function POST(req) {
    const payload = await req.json();
    await mongoose.connect(process.env.MONGODB_URI);
    const { name, Description, Price, image, Calories, Protein, Fat, Carbohydrates, restaurantId, type} = payload;
    let user = new OtherProduct({ name, Description, Price, image, Calories, Protein, Fat, Carbohydrates, restaurantId, type});
    const result = await user.save();
    return NextResponse.json({ result, success: true });
  }