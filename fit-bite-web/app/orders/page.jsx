"use client";
import React from "react";
import { useEffect, useState, useCallback } from "react";
import Stripe from "stripe";
import { useRouter } from "next/navigation";
import { UserContext } from "../Context/UserProvider";
import { ToastContainer, toast } from "react-toastify";
import Link from "next/link";
import "react-toastify/dist/ReactToastify.css";
// http://localhost:3000/orders?success=true&session_id=cs_test_a14K975hTnLpOjnrTpNxKjc4K6SW1Jiov4OtHUzMwJYdH5mBG5mGmB1syr
const Page = () => {
  const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET);
  const [orders, setOrder] = useState([]);
  const router = useRouter();
  const { loggedIn, contextLoading, userData } = React.useContext(UserContext);
  // let userEmail = decoded.Email
  // console.log("user", userEmail)
  // let userId = decoded.Email
  // console.log("user", userId)
  // setTimeout(() => {

  // }, 3000);

  const fetchData = useCallback(async () => {
    const userId = userData._id;
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams) {
        const sessionId = urlParams.get("session_id");

        // console.log(sessionId, "session");

        if (sessionId) {
          const session1 = await stripe.checkout.sessions.retrieve(sessionId);
          // let userId = session1?.metadata?.userId;
          // console.log(session1, "session");
          let paymentIntentId = session1.payment_intent;
          // console.log(paymentIntentId, "payment intent");
          const paymentIntent = await stripe.paymentIntents.retrieve(
            // "pi_3OMS8xSHh0F7a44U0R8y24GA"
            paymentIntentId
          );
          // let subtotal = paymentIntent.amount;
          // console.log("payment Intent", paymentIntent);
          let chargeId = paymentIntent.latest_charge;
          // console.log("charge Intent", chargeId);
          if (chargeId) {
            let charge = await stripe.charges.retrieve(chargeId);
            // console.log("Charge", charge);

            let orderStatus = charge.status; // "succeeded"
            let amount = charge.amount; // 11999 (in the smallest currency unit, e.g., cents)
            let paymentMethod = charge.payment_method_details.type; // "card"
            let billingEmail = charge.billing_details.email;
            // Accessing card details
            let cardBrand = charge.payment_method_details.card.brand; // "visa"
            let last4Digits = charge.payment_method_details.card.last4; // "4242"
            let receipt_url = charge.receipt_url;
            // console.log({ userId }, "from useEffect");
            let deliveryStatus = "Topping up sweetness";
            let obj = {
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
            };
            // console.log(JSON.stringify(obj));

            try {
              const jsonDataFinal = JSON.stringify(obj, null, 2);
              // console.log({ jsonDataFinal });
              const response = await fetch("/api/orders", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: jsonDataFinal,
              });
              let res = await response.json();
              setOrder(res.orders);
              if (response.status === 201) {
                toast.success("🤗 Order Placed 🎈🎈!", {
                  position: "bottom-center",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "dark",
                });
                // alert("Order created");
                setTimeout(() => {
                  router.push("/orders");
                }, 1000);
                //   let res = response.json();
                // console.log(
                //   res.orders,
                //   "response orders from Successful Creation"
                // );
              } else {
                console.log("Order not created", response.status);
              }
            } catch (e) {
              console.log(e.message);
            }
          }
        }
      }
    }
    let urlParameter = new URLSearchParams(window.location.search);

    if (urlParameter) {
      const sessionData = urlParameter.get("session_id");

      if (
        sessionData === undefined ||
        sessionData === null ||
        sessionData === ""
      ) {
        // const jsonDataFinal = JSON.stringify(userId, null, 2);
        // console.log({ jsonDataFinal });
        try {
          const response = await fetch("/api/orders", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId }),
          });
          let res = await response.json();
          // console.log(res);
          if (response.status === 200) {
            setOrder(res.orders);
          }
        } catch (err) {
          console.log(err);
        }
      }
    }
  },[router, stripe.charges, stripe.checkout.sessions, stripe.paymentIntents, userData._id]);

  // async function getUser() {
  //   // if (loggedIn) {
  //   let decodedToken = jwt.decode(user.value);
  //   // console.log("decoded token", decodedToken)
  //   setDecoded(decodedToken);
  //   return decodedToken;
  // }
  // }
  // if(!loggedIn){
  //   return
  //   }
  //   if(!loggedIn) {
  //     setTimeout(() => {

  //       router.push('/login')
  //     }, 3000)
  //   }
  {
    /* {
    }
    </> */
  }

  // }
  useEffect(() => {
    if (contextLoading == false) {
      if (loggedIn) {
        fetchData();
      }
      if (!loggedIn) {
        console.log("else from orders page is getting triggered");
        // Schedule the redirect after 3 seconds
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      }
    }

    // else {
    //   // Show the div first

    //   // Schedule the redirect after 3 seconds
    //   setTimeout(() => {
    //     router.push("/login");
    //   }, 3000);
    // }

    //  getUser().then(()=>{
    //   console.log({decoded});
    //  })

    // cs_test_a1sBkOnJyyCv9FfZt5rogyFokDMk60s6SSVyrogePJGRyVE8u8I1c1vA2Y
  }, [loggedIn, contextLoading, userData, fetchData, router]);

  // console.log({userId}, "from useEffect")

  // console.log({order})
  // console.log({jsonDataFinal})
  // console.log({orders})
  return (
    <div>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <h1 className="text-gray-600 text-lg md:text-xl ml-4">
        {" "}
        {!loggedIn ? (
          <div className="text-gray-400 flex flex-col justify-center items-center mt-72 md:mt-96 text-2xl absolute top-0 bottom-0 left-0 right-0 h-screen">
            Loading...
          </div>
        ) : orders.length > 0 ? (
          "Recent Orders"
        ) : (
          "No Orders Found"
        )}
        {/* {orders.length > 0 ? "Recent Orders" : "Orders Found: NAN"} */}
      </h1>
      <section className="text-gray-600 body-font">
        <div className="container px-5 md:py-24 mx-auto flex flex-wrap">
          <div className="flex flex-wrap m-4 items-center justify-center">
            {orders?.map((order) => (
              // <h1>{order.chargeId,
              //     order.userId,
              //     order.orderStatus,
              //     order.amount,
              //     order.paymentMethod,
              //     order.billingEmail,
              //     order.cardBrand,
              //     order.last4Digits,
              //     order.receipt_url}</h1>

              <div
                className={`p-4 ${orders.length > 1 ? "xl:w-1/2" : ""} w-full`}
                key={order.chargeId}
              >
                <div className="flex border-2 rounded-lg border-gray-200 border-opacity-50 p-8 sm:flex-row flex-col w-full  text-sm">
                  <div className="w-16 h-16 sm:mr-8 sm:mb-0 mb-4 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 flex-shrink-0">
                    {/* <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-8 h-8" viewBox="0 0 24 24">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
            </svg> */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      className="bi bi-bag-check"
                      viewBox="0 0 16 16"
                    >
                      {" "}
                      <path
                        fillRule="evenodd"
                        d="M10.854 8.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L7.5 10.793l2.646-2.647a.5.5 0 0 1 .708 0z"
                      />{" "}
                      <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />{" "}
                    </svg>
                    {/* <svg className="text-violet-700 bg-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12ZM22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM13.5003 8C13.8278 8.43606 14.0625 8.94584 14.175 9.5H16V11H14.175C13.8275 12.7117 12.3142 14 10.5 14H10.3107L14.0303 17.7197L12.9697 18.7803L8 13.8107V12.5H10.5C11.4797 12.5 12.3131 11.8739 12.622 11H8V9.5H12.622C12.3131 8.62611 11.4797 8 10.5 8H8V6.5H16V8H13.5003Z"></path></svg> */}
                  </div>
                  <div className="flex-grow">
                    <h2 className=" text-sm md:text-lg title-font font-medium mb-3">
                      Amount:{" "}
                      <span className="text-violet-700">
                        {order.amount / 100} INR.
                      </span>
                    </h2>
                    <p className="leading-relaxed text-base text-green-500 opacity-75">
                      {order.orderStatus.toUpperCase()}
                    </p>
                    <div className="flex hover:bg-gray-700 opacity-75 hover:opacity-100 rounded p-2 my-2 w-fit text-blue-500 flex-col justify-between">
                      <p className="leading-relaxed  md:text-base">
                        Method: {order.paymentMethod}
                      </p>
                      <p className="leading-relaxed  md:text-base">
                        Billing Email: {order.billingEmail}
                      </p>
                      <p className="leading-relaxed  md:text-base">
                        Card Brand: {order.cardBrand}
                      </p>
                      <p className="leading-relaxed  md:text-base">
                        Last 4 Digits: {order.last4Digits}
                      </p>
                    </div>
                    <h2 className=" md:text-lg title-font md:font-medium mb-3">
                      {order?.deliveryStatus
                        ? order.deliveryStatus === "Delivered"
                          ? ""
                          : "Delivery Status: "
                        : "Awaiting approval"}
                      <span
                        className={` md:text-md ml-1 ${
                          order?.deliveryStatus === "Delivered"
                            ? "text-gray-600"
                            : "text-pink-500 text-[15px]"
                        }`}
                      >
                        {order?.deliveryStatus}
                      </span>
                    </h2>
                    <Link
                      className="mt-3 text-indigo-500 inline-flex items-center"
                      href={`${order.receipt_url}`}
                    >
                      {" "}
                      Invoice
                      <svg
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="w-4 h-4 ml-2"
                        viewBox="0 0 24 24"
                      >
                        <path d="M5 12h14M12 5l7 7-7 7"></path>
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Page;
