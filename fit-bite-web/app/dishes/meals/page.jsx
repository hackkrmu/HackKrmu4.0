"use client"
import React from "react";
import Head from "next/head";
import Link from "next/link";
import { useState, useEffect } from "react";
import { addtoCart} from "@/app/functions/cart";
// import { addtoCart } from "@/app/functions/addtoCart";
import Image from "next/image";
import { UserContext } from "../../Context/UserProvider";
import { useRouter } from "next/navigation";
function MenuPage() {
  const { setCountAgain } = React.useContext(UserContext);
  const [dessertData, setDessertData] = useState([]);
   const router = useRouter();
  async function render() {
    try {
        const response = await fetch("/api/otherProducts", {
          method: "GET",
        });
        let res = await response.json();
        // console.log(res);
        if (response.status === 200) {
          setDessertData(res.result);
          // console.log(res.result, "response orders");
        }
    }catch (err) {
    console.log(err)
    }
    }

  useEffect(() => {
    render()
  }, []);
  return (
    <div>
      <Head>
        <title>Desserts</title>
      </Head>
      <h1 className="font-semibold mb-4 mx-12 mt-4 text-lg md:text-2xl lg:text-3xl md:mt-24 sm:mt-12 text-gray-600">
        Restaurant Menu | Healthy Items
      </h1>
      <span className="mx-12 text-gray-600">
        Total menu items {dessertData.length}
      </span>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {/* <ul className="mt-2 space-y-2"> */}
   { dessertData
      .flatMap((item) => (item.dishes ? item.dishes : [item])) // Extract nested dishes if they exist
      .map((dish, index) =>
        dish.dish_name ? (
         

                <div
          key={index} 
          onClick={()=> {
            console.log(dish)
            router.push(`/dishes/${dish.id}`)}}
          className=" rounded-xl p-4 shadow-2xl shadow-violet-500/30 m-8 opacity-100 "
        >
                  {console.log(JSON.stringify(dish))}
          <Link href="/dishes/cakes/small">
            <Image
              src={dish.image ? dish.image : "/testimages.jpg"}
              alt="Small sized cakes"
              className="w-full h-36 object-cover mb-2"
              width={400}
              height={400}
            />
            <h2 className="text-xl text-violet-700 font-semibold mb-2">
            {dish.dish_name}
            </h2>
          </Link>
          <p className="text-gray-600">{dish.calories} kcal</p>
          <p className="text-gray-600">{dish.carbs}g carbs</p>
          <p className="text-gray-600">{dish.fat}g fat</p>
          <p className="text-gray-600">{dish.protein}g protein</p>
          <div className="mt-2 flex justify-between items-center"></div>
      
        </div>
         ) : null
          )
} : (
          <p className="text-gray-500">No matching dishes found.</p>
        )
      
      {/* </ul> */}
    </div>
    </div>
  );
}

export default MenuPage;
