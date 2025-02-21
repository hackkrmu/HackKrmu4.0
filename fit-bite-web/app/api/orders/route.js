import Order from "@/app/models/OrderModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";


export async function GET() {

  await mongoose.connect(process.env.MONGODB_URI);
  

  const orders = await Order.find().sort({ createdAt: -1 });
  if(orders.length > 0){
    // console.log(orders);
    return NextResponse.json({ orders, success: true });
  }

  return NextResponse.json({ success: true });



}


export async function POST(req) {
  const payload = await req.json();
  // console.log(payload);
  const {
    deliveryStatus,
    chargeId,
    userId,
    orderStatus,
    amount,
    paymentMethod,
    billingEmail,
    cardBrand,
    last4Digits,
    receipt_url,
  } = payload;
  console.log(userId, "from route");
  await mongoose.connect(process.env.MONGODB_URI);
  // try{
if(payload.deliveryStatus){
  let orders = await Order.find({
    userId
  }).sort({ createdAt: -1 });
 try{
  let Orders = new Order({
    deliveryStatus,
    chargeId,
    userId,
    orderStatus,
    amount,
    paymentMethod,
    billingEmail,
    cardBrand,
    last4Digits,
    receipt_url,
  });
  const result = await Orders.save();
  return NextResponse.json({ result, orders, success: true }, {status: 201});
}
catch(err){
  console.error(err);
  console.log(orders, "form catch")
  return NextResponse.json({ orders, success: true }, {status: 200});
}
  // if(orders.length > 0){
  //   console.log(orders);
  // }
} else{
  
  let orders = await Order.find({
    userId
  }).sort({ createdAt: -1 });
  if(orders.length > 0){
    console.log(orders, "from else block");
    return NextResponse.json({ orders, success: true });
  }
}
  // return NextResponse.json({ orders:result, success: true });
// }catch(err){
//   console.log(err);
  // if(userId){
  //   console.log(userId, "from catch");
  // const orders1 = await Order.find({
  //   userId,
  // });

  // if(orders1.length > 0){
  //   console.log(orders1, "from route");
  //   return NextResponse.json({ orders:orders1 });
  // }
  // }


//   return NextResponse.json({ success: false });


// }
}
