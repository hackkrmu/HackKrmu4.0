import Restaurant from "@/app/models/RestaurantModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
      
    let userId= req.nextUrl.searchParams.get("userId");
    console.log({userId});
    const Restaurants = await Restaurant.find({userId});

    console.log(Restaurants, "from restaurants");
    return NextResponse.json( { result: Restaurants})
  } catch (error) {
    console.error('Error fetching Restaurants:', error);
    NextResponse.json({ error: 'Internal Server Error' });
  }
}
// export async function GET() {
//     let data = {};
//     try {
//       await mongoose.connect(process.env.MONGODB_URI);
//       data = await Restaurant.find();
//     } catch (error) {
//       data = { success: false };
//     }
//     return NextResponse.json({ result: data, success: true });
//   }

  export async function POST(req) {
    const payload = await req.json();
    console.log({payload})
    await mongoose.connect(process.env.MONGODB_URI);
    let d = new Restaurant(payload);
    const result = await d.save();
    return NextResponse.json({ result, success: true });
  }