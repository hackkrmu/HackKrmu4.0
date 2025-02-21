"use client";
import React from "react";
import Link from "next/link";
import { useState, useEffect } from "react";

const style = {
  container: {
    position: "relative",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#1a1a1a",
    padding: "20px",
  },
  card: {
    backgroundColor: "#1c1c1c",
    color: "#fff",
    padding: "10px",
    borderRadius: "10px",
    textAlign: "center",
    boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
  },
  doctorImage: {
    width: "100%",
    borderRadius: "10px",
  },
  name: {
    color: "#EBEBEB",
    fontFamily: "Outfit",
    fontSize: "35px",
    fontStyle: "normal",
    fontWeight: "700",
    lineHeight: "33px",
    fontSize: "24px",
    fontWeight: "bold",
  },
  qualifications: {
    fontSize: "16px",
    margin: "10px 0",
  },
  stars: {
    color: "#f4c150",
    fontSize: "20px",
  },
  button: {
    backgroundColor: "#435940",
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    marginBottom: "8px",
  },
};
// const [isMobile, setIsMobile] = useState(false);

// useEffect(() => {
//   const handleResize = () => {
//     setIsMobile(window.innerWidth <= 768); // Adjust for mobile screen width
//   };

//   // Initial check and adding a resize listener
//   handleResize();
//   window.addEventListener("resize", handleResize);

//   // Cleanup listener on component unmount
//   return () => window.removeEventListener("resize", handleResize);
// }, []);
const DoctorCard = ({ doctor }) => (
  <div style={style.card}>
    <img src={doctor.image} alt={doctor.name} style={style.doctorImage} />
    <h2 style={style.name}>{doctor.name}</h2>
    <p style={style.qualifications}>{doctor.qualifications}</p>
    <p style={style.stars}>{"★".repeat(doctor.rating)}</p>
    <Link href="DoctorConsultation" passHref>
      <div
        style={{
          display: "inline-block",
          padding: "15px 20px",
          backgroundColor: "#435940",
          border: "none",
          borderRadius: "8px",
          color: "#CEDF9F",
          fontSize: "18px",
          fontWeight: "bold",
          cursor: "pointer",
          textDecoration: "none", 
          textAlign: "center", 
        }}
      >
        BOOK NOW
      </div>
    </Link>
  </div>
);

const doctorsData = [
  {
    name: "Dr. Yash Babbar",
    qualifications: "MBBS - Top Tier Dermatologist",
    rating: 4,
    image: "/icons kit/drbabbar.png",
  },
  {
    name: "Dr. Maya Patel",
    qualifications: "MD - Cardiologist",
    rating: 5,
    image: "/icons kit/drbabbar.png",
  },
  {
    name: "Dr. Rachel Green",
    qualifications: "MS - Orthopedic Surgeon",
    rating: 3,

    image: "/icons kit/drbabbar.png",
  },
  {
    name: "Dr. John Doe",
    qualifications: "MBBS - Pediatrician",
    rating: 4,
    image: "/icons kit/drbabbar.png",
  },
  {
    name: "Dr. Jane Smith",
    qualifications: "MD - Neurologist",
    rating: 5,
    image: "/icons kit/drbabbar.png",
  },
  {
    name: "Dr. John Doe",
    qualifications: "MBBS - Pediatrician",
    rating: 4,

    image: "/icons kit/drbabbar.png",
  },
  {
    name: "Dr. John Doe",
    qualifications: "MBBS - Pediatrician",
    rating: 4,

    image: "/icons kit/drbabbar.png",
  },
  {
    name: "Dr. John Doe",
    qualifications: "MBBS - Pediatrician",
    rating: 4,

    image: "/icons kit/drbabbar.png",
  },
];

const BookSession = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); 
    };

    handleResize();
    window.addEventListener("resize", handleResize);


    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <div
      style={{
        display: "flex",
        scrollBehavior: "smooth",
        flexDirection: "column",
        marginLeft: "250px",
        position: "relative",
        overflow: "hidden",
        backgroundColor: "#1a1a1a",
        // minHeight: isMobile ? "330vh" : "150vh",
        minHeight: "150vh", 
        height: "auto", 

        marginLeft: isMobile ? "0px" : "250px",
        marginTop: isMobile ? "0px" : "84px",
      }}
    >
      <h2
        style={{
          color: "#EBEBEB",
          fontFamily: "Outfit",
          fontSize: "39px",
          fontStyle: "normal",
          fontWeight: 700,
          lineHeight: "normal",
          letterSpacing: "-2.73px",
          position: "relative",
          marginLeft: "20px",
          marginTop: "20px",
        }}
      >
        Select Practitioner
      </h2>
      <div style={style.container}>
        {doctorsData.map((doctor, index) => (
          <DoctorCard doctor={doctor} key={index} />
        ))}
      </div>
    </div>
  );
};

export default BookSession;
