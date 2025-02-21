"use client";
import React from "react";
import Head from "next/head";
import Link from "next/link";
import { useState, useEffect } from "react";
import { addtoCart } from "@/app/functions/cart";
import Image from "next/image";
import { UserContext } from "../../../Context/UserProvider";
import { useRouter } from "next/navigation";
// import { getQty } from '@/app/functions/cart';
function MenuPage() {
  const { setCountAgain } = React.useContext(UserContext);
  const [largeCakesData, setlargeCakesData] = useState([]);
 const router = useRouter();
  async function render() {
    try {
      const response = await fetch("/api/largeCakes", {
        method: "GET",
      });
      let res = await response.json();
      // console.log(res);
      if (response.status === 200) {
        setlargeCakesData(res.result);
        // console.log(res.result, "response orders");
      }
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    render();
  }, []);
  // Quanity Code(Not in Use)
  //  const getQty = (itemCode) => {
  //     let newCart = JSON.parse(localStorage.getItem('cart')) || {};
  //     if (itemCode in newCart) {
  //         console.log(newCart[itemCode].qty)
  //       return newCart[itemCode].qty;
  //     } else {
  //       return 0;
  //     }
  //   }
  // const isRemoveDisabled = (qty) => {

  //   return qty <= 0;
  // };

  return (
    <div>
      <Head>
        <title>Large Cakes </title>
      </Head>

      {/* //Large cakes */}
      <h1 className="text-lg md:text-2xl lg:text-3xl font-semibold mb-4 mx-12 mt-4 md:mt-24 sm:mt-12 text-gray-600">
        Restaurant Menu | Large Sized Cakes{" "}
      </h1>
      <span className="mx-12 text-gray-700">
        Total menu items {largeCakesData.length}
      </span>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {largeCakesData.map((item) => (
          <div
            key={item.id}
            className=" rounded-xl p-4 shadow-2xl shadow-blue-500/30 m-8 opacity-100"
          >
            <Image
              src={item.image}
              alt={item.name}
              width={600}
              height={600}
              className="w-full h-36 object-cover mb-2"
              priority
            />
            <h2 className="text-xl text-violet-700 font-semibold mb-2" onClick={()=> router.push(`/dishes/cakes/large/${item._id}`)}>
              {item.name}
            </h2>
            <p className="text-gray-600">{item.description}</p>
            <p className="text-gray-600">${item.price.toFixed(2)}</p>
            <div className="mt-6 flex justify-between items-center">
              {/* <div className="flex space-x-2"> */}
              {/* <button
                  className={`text-blue-500 font-bold ${
                    isRemoveDisabled(cartitem[item.id] ? cartitem[item.id].qty : 0) ? "disabled cursor-not-allowed" : ""
                  } `}
                  onClick={() => removeFromCart(item.id, 1)}
                  disabled={isRemoveDisabled(cartitem[item.id] ? cartitem[item.id].qty : 0)}
                >
                  
                    -
                 
                </button> */}
              {/* <span id={`${cartitem[item.id] ? cartitem[item.id].qty : 0}`}>
                  {cartitem[item.id] ? cartitem[item.id].qty : 0}
                </span> */}
              {/* <span>Add to Cart</span> */}
              <button
                className="text-blue-700 font-bold"
                onClick={() =>{
                  addtoCart(item.id, 1, item.price, item.name, item.image);
                  setCountAgain((prev) => prev + 1);
                }
                }
              >
                Add to Cart
              </button>
              <Link href="/Checkout">
                <button
                  className="text-blue-700 font-bold"
                  onClick={() =>{
                    addtoCart(item.id, 1, item.price, item.name, item.image);
                
                  }
                  }
                >
                  Buy Now
                </button>
              </Link>
            </div>
          </div>
          // </div>
        ))}
      </div>
    </div>
  );
}

export default MenuPage;
