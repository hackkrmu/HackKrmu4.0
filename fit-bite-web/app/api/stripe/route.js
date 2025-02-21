import Stripe from "stripe";
import { NextResponse } from "next/server";
const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET);

export async function POST(req, res) {
  
  if (req.method === "POST") {
    // let data = await req.json();
    // console.log(req.headers);
    let passedValue = await req.text();
    // console.log(passedValue, "passed value");
    let valueToJson = JSON.parse(passedValue);
    // console.log(valueToJson);
    const cartData = valueToJson.cartData;
    const userId = valueToJson.userId;
    console.log(userId);
    try {
      const params = {
        submit_type: "pay",
        // payment_method_types: ["card"],
        billing_address_collection: "auto",
        shipping_options: [
          // { shipping_rate: "shr_1OKjBDSHh0F7a44U3SPgGKe2" },
          { shipping_rate: "shr_1OKjDRSHh0F7a44U2qOkHQc0" },
        ],
        line_items: Object.keys(cartData).map((item) => {
          const { price, productName, image, qty } = cartData[item];

          console.log(productName);
          console.log((price * 100).toFixed(0));
          console.log(image);
          console.log(qty)
          return {
            price_data: {
              currency: "inr",
              product_data: {
                name: productName,
                images: [image],
              },
              unit_amount: (price * 100).toFixed(0),
            },
            adjustable_quantity: {
              enabled: true,
              minimum: 1,
            },
            quantity: qty,
          };
        }),
        metadata: {
          userId, 
        },

        mode: "payment",
        success_url: `http://localhost:3000/orders?success=true&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `http://localhost:3000/?canceled=true`,
      };

      const session = await stripe.checkout.sessions.create(params);
console.log({session},session.url)
      return NextResponse.json(session);
    } catch (err) {
      console.log(err, "err");
      return NextResponse.json({ message: err.message });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}

//  Comments Ahead

// async function storeSession(ctx){
//   try {
//     // Assuming the Checkout Session ID is sent as a parameter in the request
//     const { sessionId } = ctx;
//   const session = await stripe.checkout.sessions.retrieve(sessionId);
//   console.log("my Session", session)
// }catch(err) {
//   console.log(err, "err");
// }
// }

export async function GET() {
  // console.log(sessionInfo);
  // console.log({session})
  const session1 = await stripe.checkout.sessions.retrieve('cs_test_a1KBcWZXjvzS0FTR7Ktns0LfelGPcualxbryd1Cu3s4YIg1FNqhtjmUwiC');
  const paymentIntent = await stripe.paymentIntents.retrieve(
    // "pi_3OLkg3SHh0F7a44U0iapBSkz"
   session1.payment_intent
  
  );
  
  // let subtotal = paymentIntent.amount;
  console.log("payment Intent", paymentIntent);
  const chargeId = paymentIntent.latest_charge;

  if (chargeId) {
    const charge = await stripe.charges.retrieve(chargeId);
    console.log("Charge", charge);

    const status = charge.status; // "succeeded"
    const amount = charge.amount; // 11999 (in the smallest currency unit, e.g., cents)
    const paymentMethod = charge.payment_method_details.type; // "card"
    const billingEmail = charge.billing_details.email;
    // Accessing card details
    const cardBrand = charge.payment_method_details.card.brand; // "visa"
    const last4Digits = charge.payment_method_details.card.last4; // "4242"
    const receipt_url = charge.receipt_url
    // Example: Log the details
    console.log("Status:", status);
    console.log("Invoice:", receipt_url);
    console.log("Billing Email:", billingEmail);
    console.log("Amount:", amount/100);
    console.log("Payment Method:", paymentMethod);
    console.log("Card Brand:", cardBrand);
    console.log("Last 4 Digits:", last4Digits);
  }
  }

//     const invoiceId = charge.invoice;

//     if (invoiceId) {
//       const invoice = await stripe.invoices.retrieve(invoiceId);
//       console.log("Invoice", invoice);
//       return NextResponse.json({ invoice: invoice });
//     }
//     return NextResponse.json({ charge: charge});
//   }
//   return NextResponse.json({ chargeid: chargeId });
// }
// export async function GET(req, res) {
// // const transactions = await stripe.issuing.transactions.list({
// //   limit: 3,
// // });
// const transaction = await stripe.issuing.transactions.retrieve(
//   // 'pm_1OL1VfSHh0F7a44UD5SElQ6M'
//   // 'pmc_1OL1gISHh0F7a44UgurHyeae'
//   sessionInfo.id
// );
// return NextResponse.json({transaction});
// }

// {
//   id: 'cs_test_a1mGf6uPqe1hWjMzwVCFxbkles9LyWgvPEaV50XHhnUhijAlLnz3xFmISw',
//   object: 'checkout.session',
//   after_expiration: null,
//   allow_promotion_codes: null,
//   amount_subtotal: 1999,
//   amount_total: 11999,
//   automatic_tax: { enabled: false, status: null },
//   billing_address_collection: 'auto',
//   cancel_url: 'http://localhost:3000/?canceled=true',
//   client_reference_id: null,
//   client_secret: null,
//   consent: null,
//   consent_collection: null,
//   created: 1702036742,
//   currency: 'inr',
//   currency_conversion: null,
//   custom_fields: [],
//   custom_text: {
//     shipping_address: null,
//     submit: null,
//     terms_of_service_acceptance: null
//   },
//   customer: null,
//   customer_creation: 'if_required',
//   customer_details: null,
//   customer_email: null,
//   expires_at: 1702123141,
//   invoice: null,
//   invoice_creation: {
//     enabled: false,
//     invoice_data: {
//       account_tax_ids: null,
//       custom_fields: null,
//       description: null,
//       footer: null,
//       metadata: {},
//       rendering_options: null
//     }
//   },
//   livemode: false,
//   locale: null,
//   metadata: {},
//   mode: 'payment',
//   payment_intent: null,
//   payment_link: null,
//   payment_method_collection: 'if_required',
//   payment_method_configuration_details: { id: 'pmc_1OL1gISHh0F7a44UgurHyeae', parent: null },
//   payment_method_options: {},
//   payment_method_types: [ 'card' ],
//   payment_status: 'unpaid',
//   phone_number_collection: { enabled: false },
//   recovered_from: null,
//   setup_intent: null,
//   shipping_address_collection: null,
//   shipping_cost: {
//     amount_subtotal: 10000,
//     amount_tax: 0,
//     amount_total: 10000,
//     shipping_rate: 'shr_1OKjDRSHh0F7a44U2qOkHQc0'
//   },
//   shipping_details: null,
//   shipping_options: [
//     {
//       shipping_amount: 10000,
//       shipping_rate: 'shr_1OKjDRSHh0F7a44U2qOkHQc0'
//     }
//   ],
//   status: 'open',
//   submit_type: 'pay',
//   subscription: null,
//   success_url: 'http://localhost:3000/?success=true',
//   total_details: { amount_discount: 0, amount_shipping: 10000, amount_tax: 0 },
//   ui_mode: 'hosted',
//   url: 'https://checkout.stripe.com/c/pay/cs_test_a1mGf6uPqe1hWjMzwVCFxbkles9LyWgvPEaV50XHhnUhijAlLnz3xFmISw#fidkdWxOYHwnPyd1blpxYHZxWjA0T31QSUtWTW01QzJkMTFQNl89M1FcRHJoXWN3Z3VucmpNcnJQZHZ0TlVnXXdXNU1vaU58UFdTTkZqRHVyd3cySj1MQU1WUnF3an1uUGxXSTBGPE48bWRiNTVHfXRJbmZnaycpJ2N3amhWYHdzYHcnP3F3cGApJ2lkfGpwcVF8dWAnPyd2bGtiaWBabHFgaCcpJ2BrZGdpYFVpZGZgbWppYWB3dic%2FcXdwYHgl'
// }
