import mongoose from "mongoose";
import Pastries from "@/app/models/PastriesModel";
import LargeCake from "@/app/models/LargeCakesModel";
import smallCake from "@/app/models/SmallCakesModel";
import Dessert from "@/app/models/DessertModel";
import { NextResponse } from "next/server";
import OtherProduct from "@/app/models/OtherProductModel";
export async function GET(req) {
    let dish = req.nextUrl.searchParams.get("dish") || 1; 
    console.log({dish})
    console.log(req.nextUrl.searchParams.get("id"))
    let pastries;
    let success = true;
    console.log(req.url)
let model;
console.log(dish=='pastries')
    if (dish == 'pastries') {
        model = Pastries;
    }else if (dish == "desserts") {
        model = Dessert;
    }else if(dish == "largeCakes"){
        model = LargeCake;
    }else if(dish=="otherProducts"){
      model=OtherProduct;
    }

    else{
        model = smallCake;
    }
    try {
      await mongoose.connect(process.env.MONGODB_URI);
      pastries = await model.find({
        _id: req.nextUrl.searchParams.get("id"),
      });
    } catch (e) {
      pastries = { result: "error" };
      success = false;
      // console.log(e);
    }
    return NextResponse.json({ result: pastries[0], success });
  }
  