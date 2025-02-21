"use client";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie"; // Import js-cookie
const token = Cookies.get("token");

const DetailedAnalysis = () => {
  const [analysisData, setAnalysisData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data from the backend API
    const fetchAnalysisData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_URL_HOST}/ht/api/health/depthanalysis`,
          {
            method: "GET",
            headers: {
              "Authorization":`Bearer ${token}`,
              // "Content-Type": "application/json",
            },
            credentials: "include", // This ensures that cookies or credentials are sent with the request
          }
        );
          console.log(response)
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const result = await response.json();
        console.log(result);
        setAnalysisData(result.analysis[0].analysis.res); // Accessing res field of analysis
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchAnalysisData();
  }, []);

  const styles = {
    container: {
      backgroundColor: "#1c1c1c",
      color: "#fff",
      padding: "20px",
      fontFamily: "Arial, sans-serif",
      borderRadius: "8px",
      marginLeft: "250px",
      marginTop: "87px",
      position: "relative",
      height: "100vh",
    },
    backButton: {
      color: "#EBEBEB",
      fontSize: "35px",
      textDecoration: "none",
      display: "flex",
      alignItems: "center",
      marginBottom: "20px",
      fontWeight: "700",
      fontFamily: "Outfit",
    },
    header: {
      fontSize: "32px",
      fontWeight: "bold",
      marginBottom: "20px",
    },
    dateSkinTypeRow: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: "20px",
      fontSize: "18px",
    },
    dateSkinTypeText: {
      fontWeight: "bold",
      color: "#EBEBEB",
      fontFamily: "Istok Web",
    },
    contentHeader: {
      fontSize: "24px",
      fontWeight: "bold",
      marginBottom: "15px",
      color: "#EBEBEB",
      fontFamily: "Istok Web",
    },
    contentText: {
      lineHeight: "1.6",
      fontSize: "16px",
      color: "#EBEBEB",
      fontFamily: "Istok Web",
    },
    list: {
      listStyleType: "disc",
      paddingLeft: "20px",
      color: "#EBEBEB",
    },
    listItem: {
      marginBottom: "10px",
    },
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!analysisData) {
    return <div>No data available</div>;
  }

  // Destructure the data and reply from the fetched analysis data
  const { data, reply } = analysisData;

  return (
    <div style={styles.container}>
      <a href="#" style={styles.backButton}>
        ← Detailed Analysis
      </a>
      <div style={styles.contentHeader}>In Depth</div>
      <div style={styles.contentText}>
        <strong>Personalized Suggestions:</strong>
        <p>{reply}</p>
      </div>
      <div style={styles.contentHeader}>Key Factors</div>
      <ul style={styles.list}>
        <li style={styles.listItem}>Diet Balance: {data.dietBalance}</li>
        <li style={styles.listItem}>Sun Exposure: {data.sunExposure}</li>
        <li style={styles.listItem}>Water Intake: {data.waterIntake}</li>
        <li style={styles.listItem}>Sleep Quality: {data.sleepQuality}</li>
        <li style={styles.listItem}>Stress Levels: {data.stressLevels}</li>
        <li style={styles.listItem}>Skin Hydration: {data.skinHydration}</li>
        <li style={styles.listItem}>
          Exercise Routine: {data.exerciseRoutine}
        </li>
        <li style={styles.listItem}>
          Skincare Routine: {data.skinCareRoutine}
        </li>
        <li style={styles.listItem}>
          Skin Sensitivity: {data.skinSensitivity}
        </li>
        <li style={styles.listItem}>
          Inflammation & Breakouts: {data.inflammationBreakouts}
        </li>
      </ul>
    </div>
  );
};

export default DetailedAnalysis;
