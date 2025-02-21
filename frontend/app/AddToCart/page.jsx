"use client";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie"; 
const token = Cookies.get("token");

export default function AddToCart() {
  const [cartItems, setCartItems] = useState([]); 
  const [quantities, setQuantities] = useState([]); 
  const [isScreen, setIsScreen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isLScreen, setIsLScreen] = useState(false);

  
  useEffect(() => {
    const handleResize = () => {
      setIsLScreen(window.innerWidth > 1440);
      setIsScreen(window.innerWidth <= 768); 
      setIsMobile(window.innerWidth <= 430);
    };

       handleResize();
    window.addEventListener("resize", handleResize);

    
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL_HOST}/cart`, {
          method: "GET",
          credentials: "include",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        console.log("Cart Data:", data);
        setCartItems(data.products);
        setQuantities(data.products.map((item) => item.quantity)); // Initialize quantities
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };

    fetchCart();
  }, []);

  const handleQuantityChange = (index, amount) => {
    setQuantities((prev) => {
      const newQuantities = [...prev];
      newQuantities[index] = Math.max(newQuantities[index] + amount, 1); // Minimum 1
      return newQuantities;
    });
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item, index) => {
      return total + quantities[index] * (item.price || 0); 
    }, 0);
  };

  return (
    <div
      style={{
        height: "100vh",
        backgroundColor: "#1c1c1c",
        color: "#fff",
        padding: "20px",
        marginLeft: isScreen ? "0" : "250px", 
        marginTop: isScreen ? "70px" : "88px", 
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <h2
            style={{
              fontSize: isMobile ? "20px" : "24px", 
              color: "#EBEBEB7A",
              fontWeight: "400",
              marginBottom: "10px",
            }}
          >
            Subtotal{" "}
            <span style={{ fontWeight: "700" }}> ₹{getTotalPrice()}</span>
          </h2>
        </div>

        <button
          style={{
            backgroundColor: "#435940",
            padding: isMobile ? "10px 20px" : "15px 30px", 
            fontSize: isMobile ? "16px" : "18px", 
            borderRadius: "9px",
            boxShadow: "4px 4px 11.6px #00000033 inset",
            color: "#CEDF9F",
            fontFamily: "Outfit",
            fontWeight: "900",
            width: isScreen ? "140px" : "180px",
            height: isScreen ? "40px" : "53px", 
          }}
        >
          CHECKOUT
        </button>
      </div>
      <p style={{ color: "#EBEBEB7A", fontSize: "15px" }}>
        Checkout with your saved items in cart...
      </p>
      {cartItems.map((item, index) => (
        <div
          key={index}
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "20px",
            marginTop: "60px",
          }}
        >
          <img
            src={item.imageURL}
            alt={item.title}
            style={{
              width: isMobile ? "60px" : "80px", 
              marginRight: "20px",
              boxShadow: "6px 4px 12.7px #10101040 inset",
              borderRadius: "9px",
            }}
          />
          <div style={{ flex: 1, color: "#EBEBEB7A" }}>
            <h3>{item.title}</h3>
            <p>Price: ₹{item.price}</p>
          </div>
          <div
            style={{
              backgroundColor: "#333333",
              width: isScreen ? "90px" : "110px", 
              height: isScreen ? "35px" : "39px",
              borderRadius: "9px",
              boxShadow: "4px 4px 11.6px #00000033 inset",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginLeft: "10px",
              }}
            >
              <button
                onClick={() => handleQuantityChange(index, -1)}
                style={{
                  backgroundColor: "#333",
                  color: "#EBEBEB5C",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "19px",
                }}
              >
                -
              </button>
              <span
                style={{
                  margin: "9px 10px",
                  color: "#EBEBEB9C",
                }}
              >
                {quantities[index]}
              </span>
              <button
                onClick={() => handleQuantityChange(index, 1)}
                style={{
                  backgroundColor: "#333",
                  color: "#EBEBEB5C",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "19px",
                }}
              >
                +
              </button>
            </div>
          </div>
        </div>
      ))}
      <div
        style={{
          width: "100%",
          height: "1px",
          backgroundColor: "#EBEBEB2E",
        }}
      />
    </div>
  );
}
