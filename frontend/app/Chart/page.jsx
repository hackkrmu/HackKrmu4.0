"use client";
import React from "react";
import Link from "next/link";
import { useState, useEffect } from "react";

const MeetingSchedule = () => {
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
  const scheduleData = [
    {
      date: "1",
      day: "SEP, SAT",
    },
    {
      date: "3",
      day: "SEP, SAT",
    },
    {
      date: "7",
      day: "SEP, SAT",
    },
    {
      date: "9",
      day: "SEP, SAT",
    },
  ];

  const meetingStyles = {
    container: {
      position: "relative",
      marginLeft: "250px",
      // top: "84px",
      padding: "20px",
      backgroundColor: "#1D1D1D",
      color: "#EBEBEB",
      fontFamily: "Arial, sans-serif",
      height: "100vh",
      marginLeft: isScreen ? "0px" : "250px",
      marginTop: isScreen ? "0px" : "84px",
      zIndex: isScreen ? "-1" : "",
    },
    monthTitle: {
      fontSize: "2em",
      fontWeight: "bold",
      marginBottom: "10px",
      fontFamily: "Outfit",
    },
    meetingItem: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      borderBottom: "1px solid #444",
      padding: "10px 0",
      fontFamily: "Istok Web",
    },
    meetingDetails: {
      flex: 1,
      paddingLeft: "10px",
      display: "flex",
    },
    dateCircle: {
      width: "40px",
      height: "40px",
      borderRadius: "50%",
      backgroundColor: "#CEDF9F",
      color: "#1D1D1D",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontSize: "1.2em",
      fontWeight: "bold",
    },
    button: {
      backgroundColor: "#0070f3",
      color: "#fff",
      border: "none",
      borderRadius: "5px",
      padding: "8px 16px",
      cursor: "pointer",
      fontSize: "14px",
      textDecoration: "none", 
      display: "inline-block",
      textAlign: "center",
    },
    buttonContainer: {
      zIndex: "1",
      display: "flex",
      alignItems: "center",
    },
    activeButton: {
      padding: "10px 20px",
      backgroundColor: "#CEDF9F",
      border: "none",
      borderRadius: "15px",
      marginRight: "10px",
      fontWeight: "bold",
      cursor: "pointer",
      color: "#000000",
      transition: "transform 0.3s ease", 
    },
  };

  return (
    <div style={meetingStyles.container}>
      <div>
        <div style={meetingStyles.monthTitle}>October</div>
        <Link href="/Form" passHref>
          
          <button
            style={meetingStyles.activeButton}
            onMouseEnter={(e) => (e.target.style.transform = "scale(1.1)")} 
            onMouseLeave={(e) => (e.target.style.transform = "scale(1)")} 
          >
            Know Your Skin
          </button>
        </Link>
      </div>
      {scheduleData.map((item, index) => (
        <div key={index} style={meetingStyles.meetingItem}>
          <div style={meetingStyles.dateCircle}>{item.date}</div>
          <div style={meetingStyles.meetingDetails}>
            <div>{item.day}</div>
            <div style={{ marginLeft: "20px" }}>{item.time}</div>
            <div style={{ marginLeft: "20px" }}>
              {item.treatment} &#123; {item.doctor} &#125;
            </div>
          </div>
          <div style={meetingStyles.buttonContainer}>
            <Link href="/DetailedAnalysis" passHref>
              <div style={meetingStyles.button}>Show</div>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MeetingSchedule;
