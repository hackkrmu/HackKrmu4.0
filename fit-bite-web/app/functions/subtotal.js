"use client"
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
 