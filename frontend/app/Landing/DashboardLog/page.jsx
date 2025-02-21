
"use client";

import React from "react";
import { Line } from "react-chartjs-2";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
} from "chart.js";
import DiscussionRoom from "../../Discussion/page";
import Footer from "../../Footer/page";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title);

const lineData = {
  labels: ["Jan", "Mar", "May", "Jul", "Sep", "Now"],
  datasets: [
    {
      label: "Progress over Time",
      data: [0, 75, 50, 50, 50, 80],
      borderColor: "#b6e486",
      backgroundColor: "#b6e486",
      tension: 0.4,
      fill: false,
    },
    {
      label: "Hyperpigmentation",
      data: [0, 25, 40, 60, 60, 60],
      borderColor: "#8f8f8f",
      backgroundColor: "#8f8f8f",
      tension: 0.4,
      fill: false,
    },
  ],
};

const lineOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      beginAtZero: true,
      max: 90,
    },
  },
};

const DashboardLog = () => {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [isScreen, setIsScreen] = useState(null);
  const [isMobile, setIsMobile] = useState(null);
  const [isLScreen, setIsLScreen] = useState(null);

  useEffect(() => {
    setMounted(true);
    const handleResize = () => {
      setIsLScreen(window.innerWidth > 1440);
      setIsScreen(window.innerWidth <= 768);
      setIsMobile(window.innerWidth <= 430);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    // Check if there's a stored navigation path
    const navigateTo = localStorage.getItem('navigateTo');
    if (navigateTo) {
      // Remove the stored path to prevent infinite reloads
      localStorage.removeItem('navigateTo');
      
      // Optional: You can add a small delay to ensure the page has time to load
      setTimeout(() => {
        // Remove any loading state or perform additional actions if needed
      }, 500);
    }
  }, []);

  if (!mounted) {
    return null;
  }

  const handleNavigation = (path) => {
    // Store the path in localStorage to trigger reload
    localStorage.setItem('navigateTo', path);
    // Reload the page
    window.location.href = path;
  };

  const getBackgroundPosition = () => {
    if (isMobile || isScreen) return "0px 0px";
    return "-4px -36px";
  };

  const styles = {
    dashboardContainer: {
      minHeight: "150vh",
      backgroundColor: "#1C1C1C",
      marginLeft: isScreen ? "0px" : "250px",
      marginTop: "84px",
    },
    cardsContainer: {
      padding: "16px",
      display: "grid",
      gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)",
      gap: "20px",
      marginBottom: "20px",
    },
    card: {
      height: isMobile ? "175px" : isLScreen ? "260px" : "220px",
      borderRadius: "12px",
      boxShadow: "rgba(16, 16, 16, 0.46) 0px 0px 12.7px 7px inset",
      backgroundColor: "#222",
      cursor: "pointer",
    },
    cardText: {
      padding: "20px",
      color: "#ffffff",
      fontSize: "16px",
    },
  };

  return (
    <div style={styles.dashboardContainer}>
      {isMobile && (
        <img
          src="/icons kit/oliveclearmainpage.png"
          alt="Olive Clear Main Page"
          style={{
            padding: "15px",
            marginTop: "84px",
            width: "100%",
            borderRadius: "8px",
          }}
        />
      )}

      <div style={{ minWidth: "100%", minHeight: "150vh" }}>
        <div style={styles.cardsContainer}>
          <div
            onClick={() => handleNavigation("/FaceScan")}
            style={{
              ...styles.card,
              backgroundImage: "url('/icons kit/facescan.png')",
              backgroundSize: "cover",
              backgroundPosition: getBackgroundPosition(),
            }}
          >
            <div style={styles.cardText}></div>
          </div>
          
          <div
            onClick={() => handleNavigation("/ChatBot")}
            style={{
              ...styles.card,
              backgroundImage: "url('/icons kit/answer.png')",
              backgroundSize: "cover",
              backgroundPosition: getBackgroundPosition(),
            }}
          >
            <div style={styles.cardText}></div>
          </div>

          <div
            onClick={() => handleNavigation("/Ecommmerce/BuyProduct")}
            style={{
              ...styles.card,
              backgroundImage: "url('/icons kit/discover.png')",
              backgroundSize: "cover",
              backgroundPosition: getBackgroundPosition(),
            }}
          >
            <div style={styles.cardText}></div>
          </div>

          <div
            onClick={() => handleNavigation("/BookSession")}
            style={{
              ...styles.card,
              backgroundImage: "url('/icons kit/bookyourskin.png')",
              backgroundSize: "cover",
              backgroundPosition: getBackgroundPosition(),
            }}
          />
        </div>

        <div
          style={{
            margin: "20px",
            padding: "20px",
            borderRadius: "28px",
            height: "378px",
            background: "#171717",
            boxShadow: "rgba(16, 16, 16, 0.46) 0px 0px 12.7px 7px inset",
          }}
        >
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            <div
              onClick={() => handleNavigation("/Chart")}
              style={{ cursor: "pointer" }}
            >
              <h1
                style={{
                  paddingLeft: "20px",
                  color: "#ffffff",
                  fontFamily: "Istok Web",
                  letterSpacing: "-2.4px",
                  fontSize: "30px",
                  fontWeight: 600,
                  lineHeight: "39px",
                  transition: "color 0.3s ease, text-decoration 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = "#CEDF9F";
                  e.target.style.textDecoration = "underline";
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = "#ffffff";
                  e.target.style.textDecoration = "none";
                }}
              >
                Track Your Progress
              </h1>
            </div>
            <div
              style={{
                height: "280px",
                display: isMobile ? "block" : "flex",
                minWidth: "100%",
                maxWidth: "1101px",
                justifyContent: "space-between",
                alignItems: "center",
                padding: isMobile ? "1.5rem" : "2rem",
                color: "#b6e486",
                borderRadius: "12px",
                margin: "1rem 0",
              }}
            >
              <div
                style={{
                  marginLeft: "20px",
                  width: isMobile ? "500px" : "737px",
                  height: isMobile ? "15vh" : "275px",
                }}
              >
                <Line data={lineData} options={lineOptions} />
              </div>

              <div
                style={{
                  width: "30%",
                  textAlign: "center",
                  flexDirection: "column",
                  alignItems: "center",
                  display: isMobile ? "none" : "flex",
                }}
              >
                <div
                  style={{
                    position: "relative",
                    width: "150px",
                    height: "150px",
                    margin: "0 auto",
                  }}
                >
                  <svg width="150" height="150">
                    <circle
                      cx="75"
                      cy="75"
                      r="70"
                      stroke="#333"
                      strokeWidth="10"
                      fill="none"
                    />
                    <circle
                      cx="75"
                      cy="75"
                      r="70"
                      stroke="#b6e486"
                      strokeWidth="10"
                      fill="none"
                      strokeDasharray="440"
                      strokeDashoffset="132"
                    />
                  </svg>
                  <div
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      fontSize: "24px",
                      color: "#ffffff",
                    }}
                  >
                    70%
                  </div>
                </div>
                <div
                  style={{
                    marginTop: "1rem",
                    textAlign: "right",
                    lineHeight: "39px",
                    fontFamily: "Istok Web",
                    letterSpacing: "-1.28px",
                    fontSize: "16px",
                    fontStyle: "normal",
                    fontWeight: 600,
                  }}
                >
                  <div>
                    <span style={{ color: "#CEDF9F" }}>acne reduced:</span>{" "}
                    <span style={{ color: "#EBEBEB" }}>50% of 100</span>
                  </div>
                  <div>
                    <span style={{ color: "#CEDF9F" }}>hyperpigmentation:</span>{" "}
                    <span style={{ color: "#EBEBEB" }}>60% of 100</span>
                  </div>
                  <div>
                    <span style={{ color: "#CEDF9F" }}>blackheads:</span>{" "}
                    <span style={{ color: "#EBEBEB" }}>70% of 100</span>
                  </div>
                  <div>
                    <span style={{ color: "#CEDF9F" }}>oiliness reduced:</span>{" "}
                    <span style={{ color: "#EBEBEB" }}>80% of 100</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            margin: "20px",
            padding: "20px",
            borderRadius: "28px",
            background: "#171717",
            height: isMobile ? "65vh" : "65vh",
            boxShadow: "rgba(16, 16, 16, 0.46) 0px 0px 12.7px 7px inset",
            marginLeft: "20px",
          }}
        >
          <div
            style={{
              marginTop: "-80px",
              borderRadius: "50px",
              height: "0vh",
              marginLeft: isScreen ? "0px" : "-250px",
              boxShadow: "rgb(16, 16, 16) 0px 0px 12.7px 7px inset",
            }}
          >
            <DiscussionRoom />
          </div>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default DashboardLog;
