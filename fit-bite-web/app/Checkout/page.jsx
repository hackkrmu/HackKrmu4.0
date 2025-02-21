"use client";
import React from "react";

import "../globals.css";
import { useState, useEffect } from "react";
import { addtoCart, removeFromCart } from "../functions/cart";
import { SubTotal } from "../functions/subtotal";
import Head from "next/head";

import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";
import getStripe from "@/lib/getStripe";
import { UserContext } from "../Context/UserProvider";
import Image from "next/image";

function Page() {
  const router = useRouter();
  const [cartData, setcartData] = useState({});

  const [count, setCount] = useState(0);
  const { loggedIn, userData, contextLoading, setCountAgain, login } =
    React.useContext(UserContext);

  let userId = userData._id;

  const initiatePayment = async () => {
   
    if (contextLoading == false) {
      login()
      if (!loggedIn) {
        login()
        router.replace("/login");
      } else {
        toast.loading("Redirecting...");
        const stripe = await getStripe();
        try {
          const response = await fetch("api/stripe", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ cartData, userId }),
          });
         
          let res = await response.json();
          // console.log(res);
          stripe.redirectToCheckout({
            sessionId: res.id,
          });
        } catch (e) {
          console.log(e);
        }
      }
    }
  };

  useEffect(() => {
    if (contextLoading == false) {
      login()
    }
    try {
      if (localStorage.getItem("cart")) {
        setcartData(JSON.parse(localStorage.getItem("cart")));
        saveCart(JSON.parse(localStorage.getItem("cart")));
      }
    } catch (error) {
      console.error(error);
      localStorage.removeItem("cart");
    }
  }, [contextLoading, loggedIn, userData, count, login]);

  const handleClick = () => {
    setCount((prev) => prev + 1);
    setCountAgain((prev) => prev + 1);
  };

  const saveCart = (myCart) => {
    localStorage.setItem("cart", JSON.stringify(myCart));
  };
  // let Subtotal;
  // {
  //   typeof window !== "undefined" && (Subtotal = SubTotal());
  // }

  function CartAmountToggle({ k, cartData }) {
    return (
      <div className="flex space-x-2">
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
        <Head>
          <meta
            name="viewport"
            content="width=deviceWidth, height=device-height, initial-scale=1.0, maximum-scale=1.0"
          />
        </Head>
        <button
          className="text-blue-500 font-bold"
          onClick={() => removeFromCart(k, 1)}
        >
          <p onClick={handleClick}>-</p>
        </button>
        <span>{cartData[k].qty}</span>
        <button
          className="text-blue-500 font-bold"
          onClick={() =>
            addtoCart(
              k,
              1,
              cartData[k].price,
              cartData[k].productName,
              cartData[k].image
            )
          }
        >
          <p onClick={handleClick}>+</p>
        </button>
      </div>
    );
  }

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
      {/* {!loggedIn ? (
        <div className="text-gray-400 flex justify-center items-center absolute bottom-0 top-0 left-0 right-0 text-2xl">
          Loading...
        </div>
      ) : (
        <> */}
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm textLeft rtl:text-right text-gray-400 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-black dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Product
              </th>
              <th scope="col" className="px-6 py-3">
                Qty
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
            </tr>
          </thead>

          <tbody>
            {Object.keys(cartData).map((k) => {
              return (
                <tr
                  key={k}
                  className=" border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium whitespace-nowrap dark:text-white"
                  >
                    <span className="flex flex-col md:flex-row items-center">
                      <Image
                        src={cartData[k].image}
                        alt={cartData[k].productName}
                        width={600}
                        height={600}
                        className="w-24 h-24 object-cover mb-2"
                        priority={true}
                      />{" "}
                      <p className="text-blue-500 md:mx-auto">
                        {" "}
                        {cartData[k].productName}
                      </p>
                    </span>
                  </th>

                  <td className="px-6 py-4">
                    <CartAmountToggle k={k} cartData={cartData} />
                  </td>
                  <td className="px-6 py-4">
                    ${cartData[k].price?.toFixed(2)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className=" flex flex-row justify-between mx-4">
        <div className="flex flex-row my-8 bg-gray-900 w-fit p-2 text-sm md:text-[16px]">
          <p className="text-violet-600 ">Subtotal </p>
          <p className="text-violet-600 ml-1 ">
            {" "}
            <svg
              width="24"
              height="24"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {" "}
              <path
                d="M22.0029 3V7.49704C22.0029 7.77482 21.7777 8 21.4999 8V8C21.3 8 21.1201 7.88104 21.034 7.70059C19.4263 4.32948 15.9866 2 12.0029 2C6.81752 2 2.55397 5.94668 2.05225 11"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
              />{" "}
              <path
                d="M17 9.99999L17 15C17 16.1046 16.1046 17 15 17H9C7.89543 17 7 16.1046 7 15V10C7 8.89543 7.89543 8 9 8H15C16.1045 8 17 8.89543 17 9.99999Z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
              />{" "}
              <path
                d="M12 11L12 8"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
              />{" "}
              <path
                d="M2.05084 21V16.503C2.05084 16.2252 2.27603 16 2.5538 16V16C2.75372 16 2.93363 16.119 3.01969 16.2994C4.62743 19.6705 8.06709 22 12.0508 22C17.2362 22 21.4997 18.0533 22.0015 13"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
              />{" "}
            </svg>
          </p>
          {typeof window !== "undefined" && (
            <p className="text-gray-600 ml-3">${SubTotal()}</p>
          )}
        </div>

        <div
          className="flex flex-row my-8 bg-gray-300 w-fit p-1 sm:p-2 cursor-pointer items-center rounded"
          onClick={initiatePayment}
        >
          <p className="text-violet-600 text-xs">Order Now </p>
          <p className="text-violet-600  ml-1">
            {" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              className="bi bi-credit-card-2-front w-4 h-4 md:w-7 md:h-7"
              viewBox="0 0 16 16"
            >
              {" "}
              <path
                d="M14 3a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h12zM2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2z"
                fill="currentColor"
              ></path>{" "}
              <path
                d="M2 5.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1zm0 3a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5z"
                fill="currentColor"
              ></path>{" "}
            </svg>
          </p>
        </div>
      </div>
      {/* </>
      )} */}
    </div>
  );
}

export default Page;
