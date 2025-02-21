"use client";
import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { UserContext } from "../Context/UserProvider";
import Link from "next/link";
// var jwt = require("jsonwebtoken");
function Page() {
  const [orders, setOrders] = useState([]);
  const [counter, setCounter] = useState(0);
  const [selectedStatus, setSelectedStatus] = useState({});
  const { contextLoading, adminloggedIn, adminlogout} =
    React.useContext(UserContext);
  const router = useRouter();
  const handleChange = (event, order) => {
    // console.log(event, order.chargeId);
    setSelectedStatus({ chargeId: order.chargeId, status: event });
  };

  const handleUpdateStatus = async (order) => {
    // console.log(order.chargeId);
    // console.log(selectedStatus);
    // console.log(order._id);
    let jsonData = {
      deliveryStatus: selectedStatus.status,
    };
    const jsonDataFinal = JSON.stringify(jsonData, null, 2);
    const response = await fetch(`/api/orders/${order._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: jsonDataFinal,
    });

    // const data = await response.json();

    if (response.status === 200) {
      // Update UI to reflect successful update
      console.log("Delivery status updated successfully!");
      setCounter((prev) => prev + 1);
    } else {
      // Handle error
      console.error(response.message);
    }
  };
  async function render() {
    try {
      const response = await fetch("/api/orders", {
        method: "GET",
      });
      let res = await response.json();
      if (response.status === 200) {
        setOrders(res.orders);
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (contextLoading == false) {
        // console.log({adminloggedIn}, "adminlogged in");
        if (adminloggedIn) {
          // adminlogin();
          render();
          // adminlogin();
        }
        if (!adminloggedIn) {
        
          console.log("else from admin orders page is getting triggered");
          // Schedule the redirect after 3 seconds
          setTimeout(() => {
            router.push("/adminSignin");
          }, 1000);
        }
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
  }, [adminloggedIn, contextLoading, selectedStatus, counter, router]);

  return (
    <div>
      <h1 className="text-violet-700 text-lg md:text-xl ml-4">
        {" "}
        {contextLoading || !adminloggedIn ? (
          <div className="text-gray-400 flex flex-col justify-center items-center mt-72 md:mt-96 text-2xl">
            Loading...
          </div>
        ) : orders.length > 0 ? (
          "Recent Orders"
        ) : (
          "No Orders Found"
        )}
        {/* {orders.length > 0 ? "Recent Orders" : "Orders Found: NAN"} */}
      </h1>
      <button
        className={`bg-gradient-to-r ml-4 from-violet-500 to-pink-500  hover:bg-indigo-700  mt-4 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline absolute right-6  ${
          !adminloggedIn ? "hidden" : "block"
        }`}
        onClick={adminlogout}
        disabled={!adminloggedIn}
      >Logout</button>
      {adminloggedIn ? (
        <section className="text-gray-600 body-font">
          <div className="container px-5 py-24  flex flex-wrap ">
            <div className="flex flex-wrap  items-center justify-center text-sm md:text-[16px]">
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

                <div className="p-4 lg:w-1/2 sm:w-full" key={order.chargeId}>
                  Order ID: {order.chargeId}
                  <div className="flex border-2 rounded-lg border-gray-200 border-opacity-50 p-8 md:flex-row flex-col w-full">
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
                      <h2 className=" text-md sm:text-lg title-font font-medium mb-3">
                        Amount:{" "}
                        <span className="text-violet-700">
                          {order.amount / 100} INR.
                        </span>
                      </h2>
                      <p className="leading-relaxed text-base text-green-500 opacity-75">
                        {order.orderStatus.toUpperCase()}
                      </p>
                      <div className="text-md md:text-base flex hover:bg-gray-700 opacity-75 hover:opacity-100 rounded p-2 my-2 w-fit text-blue-500 flex-col justify-between">
                        <p className="leading-relaxed ">
                          Method: {order.paymentMethod}
                        </p>
                        <p className="leading-relaxed ">
                          Billing Email: {order.billingEmail}
                        </p>
                        <p className="leading-relaxed ">
                          Card Brand: {order.cardBrand}
                        </p>
                        <p className="leading-relaxed ">
                          Last 4 Digits: {order.last4Digits}
                        </p>
                      </div>
                      <div>
                        <h2 className=" text-md  md:text-lg title-font font-medium mb-3">
                          {order?.deliveryStatus
                            ? order.deliveryStatus === "Delivered"
                              ? ""
                              : "Delivery Status: "
                            : "Awaiting approval"}
                          <span
                            className={` text-md ml-1 ${
                              order?.deliveryStatus === "Delivered"
                                ? "text-gray-600"
                                : "text-blue-500 text-[15px]"
                            }`}
                          >
                            {order?.deliveryStatus}
                          </span>
                        </h2>
                        <select
                          className="text-blue-500 text-md my-6 p-1 md:p-2 rounded"
                          value={selectedStatus.event}
                          onChange={(event) =>
                            handleChange(event.target.value, order)
                          }
                        >
                          <option value="Pending">Pending</option>

                          <option value="In Transit">In Transit</option>

                          <option value="Delivered">Delivered</option>
                        </select>
                        <button
                          className="text-white bg-blue-500 border-0 focus:outline-none hover:bg-indigo-600 rounded text-xs md:text-sm ml-4 p-1"
                          onClick={() => handleUpdateStatus(order)}
                        >
                          Update Status
                        </button>
                      </div>
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
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default Page;
