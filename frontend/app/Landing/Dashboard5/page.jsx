import React from "react";

const Dashboard5 = () => {
  return (
    <div style={styles.cont}>
      <div
        style={{
          height: "35px",
          width: "100%",
          left: "250px",
          backgroundColor: "#CEDF9F",
          zIndex: "+1",
        }}
        className="rectangle"
      ></div>
      <div style={styles.container}>
        <div style={styles.leftContainer}>
          <h2 style={styles.benefitNumber}>05</h2>
          <h3 style={styles.benefitTitle}>AI CONSULTATION</h3>
          <p style={styles.benefitDescription}>
            Get AI-powered consultations for every question related to skin
            health, providing you with personalized advice and expert insights.
          </p>
        </div>
        <div style={styles.rightContainer}>
          <div style={styles.imagePlaceholder}></div>
          <button style={styles.exploreButton}>EXPLORE</button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  cont: {
    // marginTop: "87px",
    // marginLeft: "250px",
  },
  container: {
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "50px",
    backgroundColor: "#1c1c1c", // Dark background
  },
  leftContainer: {
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
    backgroundImage: "url('/assets/skincare htm/5.jpg')", // Path to your new image
    backgroundSize: "cover", // Ensures the image covers the entire area
    backgroundPosition: "center", // Centers the image
    backgroundRepeat: "no-repeat", // Prevents the image from repeating
  },
  exploreButton: {
    position: "absolute", // Position button within rightContainer
    bottom: "20px",
    right: "10px",
    backgroundColor: "#1c1c1c",
    color: "#CEDF9F",
    border: "2px solid #CEDF9F",
    borderRadius: "20px",
    padding: "5px 10px",
    cursor: "pointer",
  },
};

export default Dashboard5;
