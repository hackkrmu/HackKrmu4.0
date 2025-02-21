// "use client"
// import mongoose from "mongoose";
// import User from "@/models/UserModel";
export const addtoCart = (itemCode, qty, price, productName, image) => {
    var newCart = JSON.parse(localStorage.getItem('cart')) || {};
    if (itemCode in newCart) {
      newCart[itemCode].qty = newCart[itemCode].qty + qty;
      // console.log(itemCode)
    } else {
      newCart[itemCode] = {
        qty: qty,
        price: price,
        productName: productName,
        image: image,
      };
    }
    localStorage.setItem("cart", JSON.stringify(newCart));
// console.log("Added to cart", itemCode, newCart)
// console.log(newCart[itemCode].qty )
  };
  // export const itemqty = (itemCode)=>{JSON.parse(localStorage.getItem('cart'))[itemCode].qty}
  // console.log(itemqty(21))
 export const removeFromCart = (itemCode, qty) => {
    let newCart = JSON.parse(localStorage.getItem('cart')) || {};
    if (itemCode in newCart) {
      newCart[itemCode].qty = newCart[itemCode].qty - qty;
    }
    if (newCart[itemCode].qty <= 0) {
      delete newCart[itemCode];
    }
    localStorage.setItem("cart", JSON.stringify(newCart));
  //   let qty1 = 0;
  // let keys = Object.keys(newCart);
  // for (let i = 0; i<keys.length; i++) {
  //   qty1 += newCart[keys[i]]["qty"];
  // }
  // console.log(qty1)
  };
  
  // export const cartLength = (hn)=>{
  // let newCart = JSON.parse(localStorage.getItem('cart')) || {};
  // let qty = 0;
  // let keys = Object.keys(newCart);
  // for (let i = 0; i<keys.length; i++) {
  //   qty += newCart[keys[i]]["qty"];
  // }
  // console.log(qty)
  // return Object.keys(newCart).length
// }
export const SubTotal = ()=>{
  let newCart = JSON.parse(localStorage.getItem('cart')) || {};
  let subTotal = 0;
  let keys = Object.keys(newCart);
  for (let i = 0; i<keys.length; i++) {
    subTotal += newCart[keys[i]]["price"] * newCart[keys[i]].qty;
  }
  // console.log(subTotal)
  return subTotal.toFixed(2)
}
export const clearCart = ()=>{
  localStorage.removeItem("cart");
}

