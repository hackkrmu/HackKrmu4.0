'use client';
import React from "react";
import Link from "next/link";

const handleClick = () => {
  alert("Booking confirmed");
};

const Confirmation = () => {
  // Inline styles using const
  const styles = {
    container: {
      position: "relative",
      marginLeft: "250px",
      top: "88px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "flex-start",
      height: "100vh",
      backgroundColor: "#1E1E1E",
      color: "#fff",
      padding: "20px",
      boxSizing: "border-box",
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      width: "100%",
      maxWidth: "1200px",
      marginBottom: "30px",
      fontSize: "36px",
      fontWeight: "bold",
    },
    backButton: {
      cursor: "pointer",
      fontSize: "24px",
    },
    finishButton: {
      cursor: "pointer",
      fontSize: "24px",
      color: "#9A9A9A",
    },
    doctorCard: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: "#2A2A2A",
      width: "100%",
      maxWidth: "1200px",
      borderRadius: "12px",
      padding: "20px",
      boxSizing: "border-box",
      marginBottom: "30px",
    },
    doctorInfo: {
      display: "flex",
      flexDirection: "column",
      marginLeft: "20px",
      flex: 1,
    },
    doctorImage: {
      width: "150px",
      height: "150px",
      borderRadius: "12px",
      objectFit: "cover",
    },
    doctorName: {
      fontSize: "24px",
      fontWeight: "bold",
      margin: "0 0 10px 0",
    },
    doctorDetails: {
      fontSize: "18px",
      margin: "5px 0",
      color: "#EBEBEB9C",
    },
    actionButtons: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    button: {
      backgroundColor: "#3E3E3E",
      color: "#9A9A9A",
      border: "none",
      borderRadius: "19px",
      padding: "10px 20px",
      fontSize: "16px",
      cursor: "pointer",
      marginBottom: "10px",
      border: "2px solid #9A9A9A",
    },
    pagination: {
      position: "absolute",
      bottom: "20px",
      display: "flex",
      justifyContent: "center",
      width: "100%",
    },
    paginationButton: {
      backgroundColor: "#3E3E3E",
      color: "#fff",
      border: "none",
      borderRadius: "50%",
      width: "40px",
      height: "40px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      margin: "0 5px",
      cursor: "pointer",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <Link href="/DoctorConsultation" passHref>
          <div style={styles.backButton}>&lt; Confirmation</div>
        </Link>
        {/* <div style={styles.finishButton}>Finish &gt;</div> */}
        <Link href="/" passHref>
          <div style={styles.finishButton} onClick={handleClick}>
            Finish
          </div>
        </Link>
      </div>
      <div style={styles.doctorCard}>
        <img
          style={styles.doctorImage}
          src="/icons kit/drbabbar.png" // Replace with actual doctor image URL
          alt="Doctor"
        />
        <div style={styles.doctorInfo}>
          <div style={styles.doctorName}>Dr. Yash Babbar</div>
          <div style={styles.doctorDetails}>MBBS - Top Tier Dermatologist</div>
          <div style={styles.doctorDetails}>Mode: online</div>
          <div style={styles.doctorDetails}>Day/Date: Wednesday, 11/09/24</div>
          <div style={styles.doctorDetails}>Timings: 12:10 pm</div>
        </div>
        <div style={styles.actionButtons}>
          <button style={styles.button}>view receipt</button>
          <button style={styles.button}>request cancellation</button>
        </div>
      </div>
      <div style={styles.pagination}>
        <button style={styles.paginationButton}>&lt;</button>
        <button style={styles.paginationButton}>&gt;</button>
      </div>
    </div>
  );
};

export default Confirmation;
