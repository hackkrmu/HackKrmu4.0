import React from "react";

const Dashboard2 = () => {
  return (
    <div style={styles.container}>
      <div style={styles.rightContainer}>
        <div style={styles.imagePlaceholder}></div>
        <button style={styles.exploreButton}>EXPLORE</button>
      </div>
      <div style={styles.leftContainer}>
        <h2 style={styles.benefitNumber}>02</h2>
        <h3 style={styles.benefitTitle}>BOOK APPOINTMENTS</h3>
        <p style={styles.benefitDescription}>
          Book appointments with top dermatologists in your area for expert care
          and personalized skin treatment, all through our easy-to-use platform.
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "50px",
    backgroundColor: "#1c1c1c", // Dark background
  },
  leftContainer: {
    marginLeft: "35px",
    flex: 1,
    color: "#CEDF9F", // Light green color
    paddingRight: "20px",
  },
  benefitNumber: {
    fontSize: "40px",
    marginBottom: "10px",
  },
  benefitTitle: {
    fontSize: "30px",
    marginBottom: "10px",
  },
  benefitDescription: {
    fontSize: "16px",
    lineHeight: "24px",
  },
  rightContainer: {
    flex: 1,
    position: "relative",
  },
  imagePlaceholder: {
    width: "100%",
    height: "500px",
    backgroundColor: "#ddd", // Light grey color
  },
  exploreButton: {
    position: "absolute",
    bottom: "-20px",
    right: "10px",
    backgroundColor: "#1c1c1c",
    color: "#CEDF9F",
    border: "2px solid #CEDF9F",
    borderRadius: "20px",
    padding: "5px 10px",
    cursor: "pointer",
  },
};

export default Dashboard2;
