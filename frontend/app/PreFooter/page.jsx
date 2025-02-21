'use client';
import React, { useEffect, useState } from "react";
import Link from 'next/link';

const PreFooter = () => {
  const [isHovered, setIsHovered] = useState(false); // State for hover

  const styles = {
    preFooter: {
      position: "relative",
      height: "53vh",
      backgroundImage: "url('/icons kit/geting started.png')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    overlay: {
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      position: 'absolute',
    },
    content: {
      position: "relative",
      color: "#dfeac3",
      textAlign: "center",
      zIndex: 1,
    },
    heading: {
      fontSize: "3rem",
      marginBottom: "1rem",
      color: "#CEDF9F",
      fontFamily: "Istok Web",
      fontSize: "83px",
      fontStyle: "normal",
      fontWeight: "400",
      lineHeight: "82px",
      letterSpacing: "-4.98px",
    },
    paragraph: {
      fontSize: "1.2rem",
      marginBottom: "2rem",
      color: "#CEDF9F",
      fontFamily: "Istok Web",
      fontSize: "34px",
      fontStyle: "normal",
      fontWeight: "400",
      lineHeight: "82px",
      letterSpacing: "-2.04px",
    },
    loginButton: {
      backgroundColor: isHovered ? "#333" : "#111", 
      color: "#dfeac3",
      padding: "0.8rem 2rem",
      fontSize: "1rem",
      cursor: "pointer",
      borderRadius: "31px",
      border: "2px solid #CEDF9F",
      transition: "background-color 0.3s ease",
    },
  };

  return (
    <div style={styles.preFooter}>
      <div style={styles.overlay}></div>
      <div style={styles.content}>
        <h1 style={styles.heading}>Get Started with Skincare</h1>
        <p style={styles.paragraph}>
          Create an account on skincare & explore our services
        </p>
        <Link href="/login" passHref>
          <div style={{ textDecoration: 'none' }}>
            <button
              style={styles.loginButton}
              onMouseEnter={() => setIsHovered(true)} // Set hover state to true
              onMouseLeave={() => setIsHovered(false)} // Set hover state to false
            >
              Login
            </button>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default PreFooter;
