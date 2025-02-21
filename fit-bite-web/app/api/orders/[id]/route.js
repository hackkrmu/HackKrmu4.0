import Order from "@/app/models/OrderModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";


await mongoose.connect(process.env.MONGODB_URI);

export async function PUT(req, content)
{
    console.log(content)
    let orderId = content.params.id
    let filter = {_id:orderId};
    let payload =  await req.json()
    console.log(payload)
    let result = await Order.findOneAndUpdate(filter, payload)
    
   
      //         order = await Order.findOne({ chargeId });
      //       } else {
      //         order = await Order.findByIdAndUpdate(id, { deliveryStatus });
      
        
return NextResponse.json({result, success: true})
}

// export async function POST(req, res) {
//     const payload = await req.json();
//     console.log({ payload });
//     const { chargeId, deliveryStatus, id } = payload;
//     // Establish a global connection outside the function
  
//     try {
//       let order;
//       // Find by chargeId first for better search performance
//       if (chargeId) {
//         order = await Order.findOne({ chargeId });
//       } else {
//         order = await Order.findByIdAndUpdate(id, { deliveryStatus });
//       }
  
//       if (!order) {
//         return NextResponse.json({ success: false, message: 'Order not found' });
//       }
  
//     //   order.deliveryStatus = deliveryStatus;
//     //   await order.save();
//       console.log('updated');
//       return NextResponse.json({ order, success: true });
//     } catch (err) {
//       console.error(err); // Log full error object
//       return NextResponse.json({ success: false, message: 'Internal server error' });
//     }
  
//   //   try{
//   //   let order = await Order.find({ chargeId: orderId });
//   // console.log(order);
//   //   if (!order) {
//   //     return res.status(404).json({ message: 'Order not found' });
//   //   }
//   // if(order){
//   //   order.deliveryStatus = deliveryStatus;
//   //   const result = await order.save();
//   //   console.log("updated")
//   //   return NextResponse.json({ result, success: true });
//   // }

//   // }catch(err){
//   //       return NextResponse.json({ success: false, message: err.message });

//   // }
// }
