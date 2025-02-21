"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const LandingPage = () => {
  const [isScreen, setIsScreen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsScreen(window.innerWidth <= 768); // Adjust for Screen screen width
      setIsMobile(window.innerWidth <= 430);
    };

    // Initial check and adding a resize listener
    handleResize();
    window.addEventListener("resize", handleResize);

    // Cleanup listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const router = useRouter();

  const handleLoginClick = () => {
    // Replace this with your actual authentication check
    const isAuthorized = true; // Set this to true if the user is authenticated

    if (isAuthorized) {
      router.push("/login");
    } else {
      router.push("/register");
    }
  };

  const styles = {
    container: {
      height: "100vh",
      backgroundImage: "url('landing.png')",
      // backgroundSize: "1440px 1024px", // Smaller background size
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat", // Prevent tiling if the image is smaller than the container
      backgroundPosition: "center",
      overflowY: "hidden", // Allow vertical scrolling
      overflowX: "hidden",
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "20px",
    },
    logo: {
      color: "#ffffff",
      fontSize: "24px",
      fontWeight: "bold",
    },
    nav: {
      display: "flex",
      alignItems: "center",
    },
    loginButton: {
      background: "#181818",
      border: "2px solid #CEDF9F",
      borderRadius: "31px",
      padding: "10px 20px",
      color: "#CEDF9F",
      cursor: "pointer",
      marginRight: "10px",
    },
    searchButton: {
      backgroundColor: "#181818",
      borderRadius: "100%",
      cursor: "pointer",
      width: "48px",
      height: "49px",
      flexShrink: "0",
    },
    content: {
      position: "relative",
      bottom: "20%",
      left: isMobile ? "0px" : "4%",
      color: "#F0F0D4", // Use a light yellowish color
      top: isMobile ? "462px" : "200px",
    },
    tagline: {
      fontSize: isMobile ? "24px" : "48px",
      top: isMobile ? "-40px" : "0px",
      position: "relative",
      left: "17px",
      margin: "0",
      color: "#CEDF9F",
      fontFamily: "Istok Web",
      fontWeight: "400",
      lineHeight: "85px",
    },
    tagline2: {
      top: "12px",
      fontSize: isMobile ? "24px" : "48px",
      position: "relative",
      left: "17px",
      margin: "0",
      color: "#CEDF9F",
      fontFamily: "Istok Web",
      fontWeight: "400",
      lineHeight: "85px",
    },
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.logo}>
          <img
            src="/icons kit/small logo (k).png"
            alt="logo"
            style={{ width: "56px", height: "67px" }}
          />
        </h1>
        <div style={styles.nav}>
          <button style={styles.loginButton} onClick={handleLoginClick}>
            Login
          </button>
          <button style={styles.searchButton}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="49"
              viewBox="0 0 48 49"
              fill="none"
            >
              <rect
                x="1"
                y="1"
                width="46"
                height="47"
                rx="23"
                fill="#181818"
                stroke="#CEDF9F"
              />
              <path
                d="M23 31C27.4183 31 31 27.4183 31 23C31 18.5817 27.4183 15 23 15C18.5817 15 15 18.5817 15 23C15 27.4183 18.5817 31 23 31Z"
                stroke="#CEDF9F"
              />
              <path d="M33.0004 33L28.6504 28.65" stroke="#CEDF9F" />
            </svg>
          </button>
        </div>
      </header>
      <div style={styles.content}>
        <img
          src="/icons kit/logo final.png"
          alt="logo"
          style={{
            width: isMobile ? "416px" : "1255px",
            height: isMobile ? "80.709px" : "276px",
          }}
        />
        <h2 style={styles.tagline2}>revitalize your care for skin</h2>
        <h2 style={styles.tagline}>with skincare</h2>
      </div>
    </div>
  );
};

export default LandingPage;

