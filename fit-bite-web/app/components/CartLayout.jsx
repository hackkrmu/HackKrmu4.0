"use client";

import Image from "next/image";
import React from "react";
import { useState, useEffect } from "react";

function CartLayout() {
    const [Cart, setCart] = useState({});
    // const [subTotal, setSubTotal] = useState(0);

    // const [shouldHideButtons, setShouldHideButtons] = useState(false);

    // Update state based on prop
    // if (hideButtons) {
    //   setShouldHideButtons(true);
    // }
    useEffect(() => {
      // console.log("use effect from cart hi");
  
      try {
        if (localStorage.getItem("cart")) {
          setCart(JSON.parse(localStorage.getItem("cart")));
          saveCart(JSON.parse(localStorage.getItem("cart")))
        }
      } catch (error) {
        console.error(error);
        localStorage.removeItem("cart");
      }
    }, []);
    const saveCart = (myCart) => {
      localStorage.setItem("cart", JSON.stringify(myCart));
      // let subt = 0;
      // let keys = Object.keys(myCart);
      // for (let i = 0; i<keys.length; i++) {
      //   subt += myCart[keys[i]]["price"] * myCart[keys[i]].qty;
      // }
      // setSubTotal(subt);
    };
    const addtoCart = (itemCode, qty, price, productName, image) => {
      let newCart = Cart;
      if (itemCode in Cart) {
        newCart[itemCode].qty = Cart[itemCode].qty + qty;
      } else {
        newCart[itemCode] = {
          qty: qty,
          price: price,
          productName: productName,
          image: image,
        };
      }
      setCart(newCart);
      saveCart(newCart);
    };
    // const clearCart = () => {
    //   setCart({});
    //   saveCart({});
    // };
    const removeFromCart = (itemCode, qty) => {
      let newCart = Cart;
      if (itemCode in Cart) {
        newCart[itemCode].qty = Cart[itemCode].qty - qty;
      }
      if (newCart[itemCode].qty <= 0) {
        delete newCart[itemCode];
      }
      setCart(newCart);
      saveCart(newCart);
    };
  return (
    <div>
        
        {Object.keys(Cart).length===0 && <div>No items in the cart</div>}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {Object.keys(Cart).map((k) => {
        return <div  key={k}>
          
          
          <div
            // key={item.id}
            className="bg-white rounded-xl p-4 shadow-2xl shadow-cyan-500/50 m-8 opacity-100 w-fit"
          >
            <Image
              src={Cart[k].image}
              alt={Cart[k].productName}
              width={600}
              height={600}
              className="w-fit h-24 object-cover mb-2"
            />
            <h2 className="text-xl text-violet-700 font-semibold mb-2">
              {Cart[k].productName}
            </h2>
            <p className="text-gray-600">{Cart[k].price}</p>
            {/* <p className="text-gray-600">${Cart[k].price.toFixed(2)}</p> */}
            <div className="mt-2 flex justify-between items-center">
{/* {Cart[k].description}: image url */}
              <div className="flex space-x-2">
                <button className="text-blue-500 font-bold" onClick={() => removeFromCart(k,1 )}>-</button>
                <span>{Cart[k].qty}</span>
                <button className="text-blue-500 font-bold" onClick={() => addtoCart(k, 1, Cart[k].price, Cart[k].productName, Cart[k].image)}>+</button>
              </div>
            </div>
          </div>
          
          
          </div>;
      })}
      </div>

{/* <p className="text-gray-600">${subTotal.toFixed(2)}</p>  */}
{/* {!shouldHideButtons && ( */}
{/* {!shouldHideButtons && ( */}
{/* <div> 
      <button id="btnClearCart" className="inline-flex items-center font-medium text-indigo-700 hover:text-indigo-600 bg-indigo-100 border-0 py-1 px-2 focus:outline-none rounded text-base mt-4 md:mt-0" onClick={clearCart}>
  Clear Cart
</button>
<div>
      <button id = "btnCheckout" className="inline-flex font-medium text-indigo-700 items-center hover:text-indigo-600 bg-indigo-100 border-0 py-1 px-2 focus:outline-none rounded text-base mt-4 md:mt-0"> 
        <a   className="mt-4" href="/Checkout">
  Checkout

  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-bag ml-1" viewBox="0 0 16 16">
  <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1m3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z"/>
</svg>
  </a>
    </button>
  </div>
  </div>
)} */}
    


    </div>
  )
}

export default CartLayout