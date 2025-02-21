"use client";
import React from "react";
import Head from "next/head";
import Link from "next/link";
import { useState, useEffect } from "react";
import { addtoCart } from "@/app/functions/cart";
import Image from "next/image";
import { UserContext } from "../../../Context/UserProvider";
import { useRouter } from "next/navigation";
function MenuPage() {
  const { setCountAgain } = React.useContext(UserContext);
  const [smallCakesData, setsmallCakesData] = useState([]);
   const router = useRouter();
  async function render() {
    try {
      const response = await fetch(
        "/api/smallCakes",
        { cache: "force-cache" },
        {
          method: "GET",
        }
      );
      let res = await response.json();
      // console.log(res);
      if (response.status === 200) {
        setsmallCakesData(res.result);
        // console.log(res.result, "response orders");
      }
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    render();
  }, []);
  return (
    <div>
      <Head>
        <title>Small Cakes </title>
      </Head>
      <h1 className=" font-semibold mb-4 mx-12 mt-4 text-lg md:text-2xl lg:text-3xl md:mt-24 sm:mt-12 text-gray-600">
        Restaurant Menu | Small Sized Cakes{" "}
      </h1>
      <span className="mx-12 text-gray-700">
        Total menu items {smallCakesData.length}
      </span>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {smallCakesData.map((item) => (
          <div
            key={item.id}
            className=" rounded-2xl p-4 shadow-2xl shadow-blue-500/30 m-8 opacity-100 gap-2"
          >
            <Image
              src={item.image}
              alt={item.name}
              width={400}
              height={400}
              className="w-full h-36 object-cover rounded mb-2"
              priority
            />
            <h2 className="text-xl text-violet-700 font-semibold mb-2" onClick={()=> router.push(`/dishes/cakes/small/${item._id}`)}>
              {item.name}
            </h2>
            <p className="text-gray-600 md:truncate">{item.description}</p>
            <p className="text-gray-600">${item.price.toFixed(2)}</p>
            <div className="mt-6 flex justify-between items-center">
              <button
                className="text-blue-700 font-bold"
                onClick={() => {
                  addtoCart(item.id, 1, item.price, item.name, item.image);
                  setCountAgain((prev) => prev + 1);
                }}
              >
                Add to Cart
              </button>
              <Link href="/Checkout">
                <button
                  className="text-blue-700 font-bold"
                  onClick={() =>
                    addtoCart(item.id, 1, item.price, item.name, item.image)
                  }
                >
                  Buy Now
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MenuPage;
