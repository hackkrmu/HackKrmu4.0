"use client";
import React from "react";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { addtoCart } from "@/app/functions/cart";
import Image from "next/image";
import { UserContext } from "../../Context/UserProvider";
import useSWR from "swr";
import { useRouter } from "next/navigation";
function MenuPage() {
  const { setCountAgain } = React.useContext(UserContext);
 const router = useRouter();
  // const [pastriesData, setpastriesData] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  let { data, isLoading, isValidating } = useSWR(
    `/api/pastries?page=${pageNumber}`,
    render,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
  // console.log(data, "pastries");
  async function render(url) {
    try {
      const response = await fetch(url, {
        method: "GET",
      });
      let res = await response.json();
      // console.log(res);
      if (response.status === 200) {
        // setpastriesData(res.result);
        return res.result;
        // console.log(res.result, "response orders");
      }
    } catch (err) {
      console.log(err);
    }
  }
  // useEffect(() => {
  //   // const storedCart = JSON.parse(localStorage.getItem("cart")) || {};
  //   // setCartitem((prevCart) => {
  //   //   // Using a callback for avoiding re-renders
  //   //   if (JSON.stringify(prevCart) !== JSON.stringify(storedCart)) {
  //   //     return storedCart;
  //   //   }
  //   //   return prevCart;
  //   // });
  //   render();
  // }, []);
  return (
    <div className="mb-36 md:mb-0">
      <Head>
        <title>Pastries</title>
      </Head>

      {/* //Pastries */}
      <h1 className=" font-semibold mb-4 mx-12 mt-4 text-lg md:text-2xl lg:text-3xl md:mt-24 sm:mt-12 text-gray-600">
        Restaurant Menu | Pastries{" "}
      </h1>
      <span className="mx-12 text-gray-700">
        Total menu items {data?.length}
      </span>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data?.map((item) => (
          <div
            key={item.id}
            className="rounded-xl p-4 shadow-2xl shadow-blue-500/30 m-8 opacity-100"
          >
            <Image
              src={item.image}
              alt={item.name}
              width={400}
              height={400}
              className="w-full h-36 object-cover mb-2"
              priority
            />
            <h2 className="text-xl text-violet-700 font-semibold mb-2" onClick={()=> router.push(`/dishes/pastries/${item._id}`)}>
              {item.name}
            </h2>
            <p className="text-gray-600">{item.description}</p>
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
      <div className={`flex items-center justify-evenly md:mb-56 md:mt-12 ${isLoading || isValidating ? "hidden" : ""}`}>
        <button
          className={`text-blue-700 font-bold  ${
            pageNumber <= 1 ? "cursor-not-allowed" : ""
          }`}
          onClick={() =>
            pageNumber > 1 ? setPageNumber((prev) => prev - 1) : ""
          }
        >
          Previous
        </button>

        <button
          className={`text-blue-700 font-bold ${
            pageNumber >= 4 ? "cursor-not-allowed" : ""
          }`}
          onClick={() =>
            pageNumber < 4 ? setPageNumber((prev) => prev + 1) : ""
          }
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default MenuPage;
