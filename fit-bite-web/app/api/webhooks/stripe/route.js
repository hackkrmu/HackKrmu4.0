// import Order from "@/models/OrderModel";
// import { headers } from "next/headers";
// import { NextResponse } from "next/server";
// import mongoose from "mongoose";
// import Stripe from "stripe";
// const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET);
// export async function POST(req, res) {
//   let body = await req.text();
//   let valueToJson = JSON.parse(body);
//   const sig = req.headers["stripe-signature"];
//   let event;

//   try {
//     event = stripe.webhooks.constructEvent(
//       valueToJson,
//       sig,
//       process.env.Stripe_Webhook_Secret
//     );
//   } catch (err) {
//     return new Response(
//       `Webhook Error: ${err ? err.message : "Unknown Error"}`
//     );
//   }
//   let session = event.data.object;
//   console.log(session, "session");
//   if (!session?.metadata?.userId) {
//     return new Response(null, { status: 200 });
//   }

//   // Handle the event
//   switch (event.type) {
//     case "checkout.session.completed":
//       await mongoose.connect(process.env.MONGODB_URI);
//       const session1 = await stripe.checkout.sessions.retrieve(session.id);

//       // let session = event.data.object;
//       let paymentIntentId = session1.payment_intent;
//       const paymentIntent = await stripe.paymentIntents.retrieve(
//         paymentIntentId
//       );
//       // let subtotal = paymentIntent.amount;
//       console.log("payment Intent", paymentIntent);
//       let chargeId = paymentIntent.latest_charge;
//       if (chargeId) {
//         let charge = await stripe.charges.retrieve(chargeId);
//         console.log("Charge", charge);

//         let orderStatus = charge.status; // "succeeded"
//         let amount = charge.amount; // 11999 (in the smallest currency unit, e.g., cents)
//         let paymentMethod = charge.payment_method_details.type; // "card"
//         let billingEmail = charge.billing_details.email;
//         // Accessing card details
//         let cardBrand = charge.payment_method_details.card.brand; // "visa"
//         let last4Digits = charge.payment_method_details.card.last4; // "4242"
//         let receipt_url = charge.receipt_url;
//         console.log(userId,
//           orderStatus,
//           amount,
//           paymentMethod,
//           billingEmail,
//           cardBrand,
//           last4Digits,
//           receipt_url)
//         // let order = new Order({
//         //   userId,
//         //   orderStatus,
//         //   amount,
//         //   paymentMethod,
//         //   billingEmail,
//         //   cardBrand,
//         //   last4Digits,
//         //   receipt_url,
//         // });
//         // await order.save();
//       }
//     default:
//       console.log(`Unhandled event type ${event.type}`);
//   }

//   return new Response(null, { status: 200 });
// }
