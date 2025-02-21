'use client'
import React from "react";
import Link from "next/link";
import { useState, useEffect } from "react";

const DoctorConsultation = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Adjust for mobile screen width
    };

    // Initial check and adding a resize listener
    handleResize();
    window.addEventListener("resize", handleResize);

    // Cleanup listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <div
      style={{
        position: "relative",
        marginLeft: "250px",
        marginTop: "80px",
        padding: "20px",
        backgroundColor: "#1a1a1a",
        color: "white",
        height: "100vh", // Corrected to lowercase 'height'
        overflowY: "scroll", // Enables vertical scrolling
        // marginLeft: isMobile ? "0px" : "250px",
        // marginTop: isMobile ? "0px" : "88px",
      }}
    >
      {/* Back Button */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "20px",
          // marginTop: "80px",
        }}
      >
        {/* <span
          style={{ fontSize: "24px", cursor: "pointer", marginRight: "10px" }}
        >
          ←
        </span> */}
        {/* <Link href="/BookSession" passHref>
          <span style={{ color: "#cddc39", fontSize: "18px" }}>
            Book a consultation
          </span>
        </Link> */}
        <Link href="/BookSession" passHref>
          <span>⚡️</span>
          <span>Book a consultation</span>
        </Link>
      </div>

      <div style={{ display: "flex", gap: "30px" }}>
        {/* Doctor Profile */}
        <div style={{ display: "flex", gap: "40px" }}>
          <img
            src="/icons kit/drbabbar.png" // Replace with actual image source
            alt="Dr. Yash Babbar"
            style={{ width: "100%", borderRadius: "8px" }}
          />
        </div>

        {/* Booking Slots */}
        <div style={{ top: "10px" }}>
          <div>
            <h2
              style={{
                fontSize: "32px",
                fontWeight: "bold",
                display: "flex",
                alignItems: "center",
              }}
            >
              Dr. Yash Babbar{" "}
              <span style={{ color: "#4c6ef5", marginLeft: "10px" }}>✔</span>
            </h2>
            <p style={{ fontSize: "18px", color: "#999" }}>
              MBBS - Top Tier Dermatologist
            </p>
            <p style={{ fontSize: "16px", margin: "10px 0" }}>
              <span style={{ fontSize: "14px", color: "#999" }}>7+ year</span>
              <span style={{ marginLeft: "15px" }}>⭐⭐⭐⭐☆</span>
            </p>

            {/* About */}
            <div
              style={{ marginTop: "20px", fontSize: "16px", lineHeight: "1.5" }}
            >
              <h3 style={{ fontSize: "22px", marginBottom: "10px" }}>
                About <span style={{ fontSize: "14px", color: "#999" }}>ℹ</span>
              </h3>
              <p
                style={{
                  wordWrap: "break-word",
                  whiteSpace: "normal",
                  maxWidth: "100%",
                }}
              >
                Dr. Yash Babbar is a renowned dermatologist, recognized for his
                expertise in advanced skincare and dermatological treatments.
                With a passion for providing personalized care, he specializes
                in diagnosing and treating a wide range of skin conditions, from
                common concerns like acne and eczema to complex issues such as
                autoimmune skin disorders and skin cancer.
              </p>
            </div>

            {/* Appointment Fee */}
            <div
              style={{
                marginTop: "20px",
                fontSize: "18px",
                fontWeight: "bold",
                display: "flex",
                alignItems: "center",
                border: "1px solid #888",
                padding: "10px",
                borderRadius: "8px",
                maxWidth: "300px",
              }}
            >
              Appointment Fee: ₹4,000
            </div>
          </div>
          <h3 style={{ fontSize: "22px", fontWeight: "bold" }}>
            Booking Slots
          </h3>

          {/* Date Selection */}
          <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
            {[
              "WED 11",
              "THU 12",
              "FRI 13",
              "SAT 14",
              "SUN 15",
              "MON 16",
              "TUE 17",
            ].map((day, index) => (
              <div
                key={index}
                style={{
                  padding: "10px 15px",
                  border:
                    day === "WED 11" ? "2px solid #cddc39" : "1px solid #555",
                  borderRadius: "8px",
                  color: day === "WED 11" ? "#cddc39" : "#999",
                  fontWeight: day === "WED 11" ? "bold" : "normal",
                  cursor: "pointer",
                }}
              >
                {day}
              </div>
            ))}
          </div>

          {/* Time Slots */}
          <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
            {[
              "11:20 am",
              "12:10 pm",
              "01:30 pm",
              "02:40 pm",
              "03:20 pm",
              "11:20 am",
            ].map((time, index) => (
              <div
                key={index}
                style={{
                  padding: "10px 15px",
                  border:
                    time === "12:10 pm"
                      ? "2px solid #cddc39"
                      : "1px solid #555",
                  borderRadius: "8px",
                  color: time === "12:10 pm" ? "#cddc39" : "#999",
                  fontWeight: time === "12:10 pm" ? "bold" : "normal",
                  cursor: "pointer",
                }}
              >
                {time}
              </div>
            ))}
          </div>

          {/* Offline/Online Selection */}
          <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
            <div
              style={{
                padding: "10px 20px",
                border: "1px solid #555",
                borderRadius: "8px",
                color: "#999",
                cursor: "pointer",
              }}
            >
              offline
            </div>
            <div
              style={{
                padding: "10px 20px",
                border: "2px solid #cddc39",
                borderRadius: "8px",
                color: "#cddc39",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              online
            </div>
          </div>

          {/* Book Now Button */}
          <Link href="/Confirmation" passHref>
            <button
              style={{
                position: "relative",
                top: "20px",
                padding: "15px 20px",
                backgroundColor: "#556b2f",
                border: "none",
                borderRadius: "8px",
                color: "#cddc39",
                fontSize: "18px",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              BOOK NOW
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DoctorConsultation;
