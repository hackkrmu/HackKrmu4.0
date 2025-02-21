import mongoose from "mongoose";
// import User from '@/models/UserModel';
import Order from "@/app/models/OrderModel";
import { NextResponse } from "next/server";
    
        export async function GET() {
            let  users =0;
            let success = true
            try{
                    await mongoose.connect(process.env.MONGODB_URI);
                    users= await Order.countDocuments();
              
                console.log(users);
                // if(user){
                // if (req.body.Email == user.Email && req.body.Password == user.Password){
                //     //  res.status(200).json({success: true}, {username:user.username, Email:user.Email })
                //     return NextResponse.json({success: true, message: 'Successfully Logged in', username:user.username, Email:user.Email})
                //     // username:user.username, Email:user.Email
                //     // return NextResponse.json(JSON.stringify({success: true, message: 'Successfully Loged in'}),{ status: 200, headers: { 'content-type': 'application/json' } }, {username:user.username, Email:user.Email })
                // }
                  
            // }
        }catch(e){
            users={result:"error"}
            success=false
            // console.log(e);
        }
        return NextResponse.json({result:users, success});
            // else {
            //         // If no user is found, send a different response (e.g., success: false)
            //         res.status(200).json({ success: false, message: "User not found" });
            //       }
        // const payload = await req.json();
        // await mongoose.connect(process.env.MONGODB_URI);
        // let user = new User(payload);
        // const result = await user.save();
        // return NextResponse.json({ result, success: true });
      }
    //     ex