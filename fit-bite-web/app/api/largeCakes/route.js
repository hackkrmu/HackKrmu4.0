import mongoose from "mongoose";
// import User from '@/models/UserModel';
import LargeCake from '@/app/models/LargeCakesModel';
import { NextResponse } from "next/server";
// import { largeCake } from '@/app/database/mongooseSchema';
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

        export async function POST(req) {
            const payload = await req.json();
            await mongoose.connect(process.env.MONGODB_URI);
            let d = new LargeCake(payload);
            const result = await d.save();
            return NextResponse.json({ result, success: true });
          }

        export async function GET() {
            let  LargeCakes =[]
            let success = true
            try{
                    await mongoose.connect(process.env.MONGODB_URI);
                    LargeCakes= await LargeCake.find();
              
                console.log(LargeCakes);
                // if(user){
                // if (req.body.Email == user.Email && req.body.Password == user.Password){
                //     //  res.status(200).json({success: true}, {username:user.username, Email:user.Email })
                //     return NextResponse.json({success: true, message: 'Successfully Logged in', username:user.username, Email:user.Email})
                //     // username:user.username, Email:user.Email
                //     // return NextResponse.json(JSON.stringify({success: true, message: 'Successfully Loged in'}),{ status: 200, headers: { 'content-type': 'application/json' } }, {username:user.username, Email:user.Email })
                // }
                  
            // }
        }catch(e){
            LargeCakes={result:"error"}
            success=false
            // console.log(e);
        }
        return NextResponse.json({result:LargeCakes, success});
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