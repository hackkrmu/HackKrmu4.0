"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

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
    width: "100%", // Fixed width issue
  },
  doctorImage: {
    width: "100%",
    borderRadius: "10px",
  },
  name: {
    color: "#EBEBEB",
    fontFamily: "Outfit",
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

const DoctorCard = ({ doctor, onChat }) => (
  <div style={style.card}>
    <h2 style={style.name}>{doctor.name}</h2>
    <p style={style.qualifications}>{doctor.qualifications}</p>
    <p style={style.stars}>{"★".repeat(doctor.rating)}</p>
    <button style={style.button} onClick={() => onChat(doctor._id, doctor.name)}>
      Chat Now
    </button>
  </div>
);

const GetDoctors = () => {
  const router = useRouter();
  const [doctors, setDoctors] = useState([]);
  const [isMobile, setIsMobile] = useState(false);

  const fetchDoctors = async () => {
    const token = Cookies.get("token"); // Fetch token dynamically
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL_HOST}/doc/get-doctors`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      if (data.doctors) {
        setDoctors(data.doctors);
      } else {
        console.error("Sorry, no doctors are available right now.");
      }
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []); // Added dependency array to prevent re-fetching on every render

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

//   const handleChatNow = (doctorId, docname) => {
//     router.push(/ChatDoc?doctorId=${doctorId}?docname=${docname});
//   };

const handleChatNow = (doctorId, docname) => {
    router.push(`/ChatDoc?doctorId=${doctorId}&docname=${encodeURIComponent(docname)}`);
  };
  return (
    <div
      style={{
        display: "flex",
        scrollBehavior: "smooth",
        flexDirection: "column",
        position: "relative",
        overflow: "hidden",
        backgroundColor: "#1a1a1a",
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
          fontWeight: 700,
          marginLeft: "20px",
          marginTop: "20px",
        }}
      >
        Select Practitioner
      </h2>
      <div style={style.container}>
        {doctors.map((doctor, index) => (
          <DoctorCard doctor={doctor} key={index} onChat={handleChatNow} />
        ))}
      </div>
    </div>
  );
};

export default GetDoctors;