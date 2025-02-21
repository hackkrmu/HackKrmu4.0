"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import searchIcon from "../../public/icons kit/search.png";
import notiffsIcon from "../../public/icons kit/notiffs.png";
import cartIcon from "../../public/icons kit/cart.png";
import dynamic from "next/dynamic";

const Header = () => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [activeButton, setActiveButton] = useState("dashboard");

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [isScreen, setIsScreen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsScreen(window.innerWidth <= 768);
      setIsMobile(window.innerWidth <= 430);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ✅ MetaMask Wallet Connection Function
  const handleOpenMetaMask = async () => {
    console.log("Checking MetaMask availability...");
    if (typeof window !== "undefined" && window.ethereum) {
      try {
        console.log("Requesting MetaMask connection...");
        await window.ethereum.request({ method: "eth_requestAccounts" });
        window.open("https://metamask.io/download/", "_blank");
        console.log("MetaMask opened!");
      } catch (error) {
        console.error("MetaMask connection failed", error);
      }
    } else {
      console.log("MetaMask not found, redirecting to download...");
      window.open("https://metamask.io/download/", "_blank");
    }
  };

  const styles = {
    headerContainer: {
      height: "84px",
      position: "fixed",
      top: "0",
      left: isMobile
        ? "40px"
        : screenWidth > 1200
        ? "250px"
        : isScreen
        ? "40px"
        : "140px",
      width: isMobile
        ? "91%"
        : screenWidth > 1200
        ? "calc(100% - 250px)"
        : isScreen
        ? "calc(100% - 40px)"
        : screenWidth > 430
        ? "89%"
        : "82%",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: isScreen ? "20px" : "15px",
      backgroundColor: "#1C1C1C",
      zIndex: "1",
    },
    ordersInfo: {
      display: isScreen ? "none" : "flex",
      alignItems: "center",
      color: "#CEDF9F",
    },
    toggleButtons: {
      marginLeft: isMobile ? "78px" : "0px",
      display: "flex",
      alignItems: "center",
      borderRadius: "40px",
      padding: "2px",
      border: "3px solid #CEDF9F",
    },
    button: (isActive) => ({
      padding: isMobile ? "4px 3px" : "10px 20px",
      backgroundColor: isActive ? "#CEDF9F" : "transparent",
      color: isActive ? "#1A1A1A" : "#CEDF9F",
      borderRadius: isMobile ? "32px" : "25px",
      cursor: "pointer",
      border: "none",
      fontSize: "15px",
    }),
    headerIcons: {
      display: "flex",
      alignItems: "center",
    },
    cartIcon: {
      width: isMobile ? "24px" : "40px",
      height: isMobile ? "24px" : "40px",
      fontSize: isScreen ? "28px" : "20px",
      color: "#CEDF9F",
      marginRight: isMobile ? "-2px" : "15px",
      marginTop: "2px",
      cursor: "pointer",
    },
    userAvatar: {
      width: isMobile ? "0px" : "40px",
      height: isMobile ? "0px" : "40px",
      display: isMobile ? "none" : "",
      borderRadius: "50%",
      cursor: "pointer",
    },
  };

  return (
    <div style={styles.headerContainer}>
      <div style={styles.ordersInfo}>
        <span style={{ fontSize: isScreen ? "32px" : "24px", fontWeight: "bold", marginRight: "10px" }}>37</span>
        <span
          style={{
            display: "inline-block",
            width: "1px",
            height: "17px",
            backgroundColor: "#E6E6E6",
          }}
        ></span>
        <div style={{ marginLeft: "10px", display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
          <span style={{ fontSize: isScreen ? "18px" : "16px", marginRight: "5px" }}>Orders</span>
          <span style={{ fontSize: isScreen ? "14px" : "12px", color: "#A1A1A1" }}>Last 7 days</span>
        </div>
      </div>

      <div style={styles.toggleButtons}>
        <div onClick={() => (window.location.href = "/Landing/DashboardLog")} style={{ cursor: "pointer" }}>
          <button
            style={styles.button(activeButton === "dashboard")}
            onClick={() => setActiveButton("dashboard")}
          >
            Dashboard
          </button>
        </div>
        <div onClick={() => (window.location.href = "/Meeting")} style={{ cursor: "pointer" }}>
          <button
            style={styles.button(activeButton === "meeting")}
            onClick={() => setActiveButton("meeting")}
          >
            Meeting
          </button>
        </div>
      </div>

      <div style={styles.headerIcons}>
        <Image src={searchIcon} alt="Search Icon" style={styles.cartIcon} />
        <Image src={notiffsIcon} alt="Notif Icon" style={styles.cartIcon} />

        {/* ✅ MetaMask Wallet Opens on Click */}
        <div onClick={handleOpenMetaMask} style={{ cursor: "pointer" }}>
          <button style={styles.cartIcon} aria-label="Add to Cart">
            <Image src={cartIcon} alt="Cart Icon" style={styles.cartIcon} />
          </button>
        </div>

        <img src="/assets/user.png" alt="User Avatar" style={styles.userAvatar} />
      </div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(Header), { ssr: false });
