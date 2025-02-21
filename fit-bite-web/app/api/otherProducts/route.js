import mongoose from "mongoose";
import OtherProduct from "@/app/models/OtherProductModel";
import { NextResponse } from "next/server";

        export async function GET() {
            let  desserts =[]
            let success = true
            try{
                    await mongoose.connect(process.env.MONGODB_URI);
                    desserts= await OtherProduct.find();
              
                console.log(desserts);
                // if(user){
                // if (req.body.Email == user.Email && req.body.Password == user.Password){
                //     //  res.status(200).json({success: true}, {username:user.username, Email:user.Email })
                //     return NextResponse.json({success: true, message: 'Successfully Logged in', username:user.username, Email:user.Email})
                //     // username:user.username, Email:user.Email
                //     // return NextResponse.json(JSON.stringify({success: true, message: 'Successfully Loged in'}),{ status: 200, headers: { 'content-type': 'application/json' } }, {username:user.username, Email:user.Email })
                // }
                  
            // }
        }catch(e){
            desserts={result:"error"}
            success=false
   
        }
        return NextResponse.json({result:desserts, success});
      }
