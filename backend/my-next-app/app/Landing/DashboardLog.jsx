"use client";

import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title);

const lineData = {
  labels: ["Jan", "Mar", "May", "Jul", "Sep", "Now"],
  datasets: [
    {
      label: "Progress over Time",
      data: [0, 75, 50, 50, 50, 80], // Sample data
      borderColor: "#b6e486",
      backgroundColor: "#b6e486",
      tension: 0.4,
      fill: false,
    },
    {
      label: "Hyperpigmentation",
      data: [0, 25, 40, 60, 60, 60], // Sample data
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
      max: 100,
    },
  },
};

const DashboardLog = () => {
  return (
    <div style={styles.dashboardContainer}>
      <div style={styles.sidebar}>
        <div style={styles.logoContainer}>
          <h1 style={styles.logo}>skincare</h1>
        </div>
        <nav style={styles.nav}>
          <a href="#" style={styles.navItem}>
            <span style={styles.icon}>⚡️</span>
            <span style={styles.navText}>Home</span>
          </a>
          <a href="#" style={styles.navItem}>
            <span style={styles.icon}>🟢</span>
            <span style={styles.navText}>AI Chat</span>
          </a>
          <a href="#" style={styles.navItem}>
            <span style={styles.icon}>💡</span>
            <span style={styles.navText}>Book Session</span>
          </a>
          <a href="#" style={styles.navItem}>
            <span style={styles.icon}>🎁</span>
            <span style={styles.navText}>Rewards</span>
          </a>
          <a href="#" style={styles.navItem}>
            <span style={styles.icon}>💬</span>
            <span style={styles.navText}>Discussion</span>
          </a>
          <a href="#" style={styles.navItem}>
            <span style={styles.icon}>⚙️</span>
            <span style={styles.navText}>Settings</span>
          </a>
        </nav>
        <div style={styles.ordersSection}>
          <p style={styles.ordersTitle}>Last orders:</p>
          <ul style={styles.orderList}>
            <li style={styles.orderItem}>
              <span style={styles.orderIcon}>🌞</span>
              sunscreen spf 50+...
            </li>
            <li style={styles.orderItem}>
              <span style={styles.orderIcon}>🌙</span>
              retinol based face...
            </li>
          </ul>
          <a href="#" style={styles.seeAllLink}>
            See All
          </a>
        </div>
        <div style={styles.logoutContainer}>
          <a href="#" style={styles.logoutLink}>
            → Log Out
          </a>
        </div>
      </div>

      {/* Main Content Section */}
      <div style={{ width: "100%" }}>
        {/* Header Section */}
        <div style={styles.headerContainer}>
          <div style={styles.ordersInfo}>
            <span style={styles.ordersNumber}>37</span>
            <span style={styles.ordersText}>Orders</span>
            <span style={styles.ordersSubText}>Last 7 days</span>
          </div>
          <div style={styles.toggleButtons}>
            <button style={styles.activeButton}>Dashboard</button>
            <button style={styles.inactiveButton}>Meeting</button>
          </div>
          <div style={styles.headerIcons}>
            <span style={styles.headerIcon}>🔍</span>
            <span style={styles.headerIcon}>🔔</span>
            <span style={styles.headerIcon}>🛒</span>
            <img
              src="https://via.placeholder.com/40"
              alt="User Avatar"
              style={styles.userAvatar}
            />
          </div>
        </div>

        {/* Cards Section */}
        <div style={styles.cardsContainer}>
          <div
            style={{
              ...styles.card,
              backgroundImage: "url()",
            }}
          >
            <div style={styles.cardText}>Face scan for skin type</div>
          </div>
          <div
            style={{
              ...styles.card,
              backgroundImage: "url()",
            }}
          >
            <div style={styles.cardText}>Answer to find your skin issues</div>
          </div>
          <div
            style={{
              ...styles.card,
              backgroundImage: "url(https://via.placeholder.com/400)",
            }}
          >
            <div style={styles.cardText}>Discover and buy here!</div>
          </div>
          <div
            style={{
              ...styles.card,
              backgroundImage: "url(https://via.placeholder.com/400)",
            }}
          >
            <div style={styles.cardText}>Book your skin session</div>
          </div>
        </div>

        {/* chart JS */}
        <div style={{display: 'flex', justifyContent: 'space-around'}}>
            <div style={{ display: 'flex', width: '1101px', justifyContent: 'space-between', alignItems: 'center', padding: '2rem', backgroundColor: '#222', color: '#b6e486', borderRadius: '12px' }}>
                {/* Line Chart */}
                <div style={{ width: '60%' }}>
                    <Line data={lineData} options={lineOptions} />
                </div>

                {/* Circular Progress Indicator */}
                <div style={{ width: '30%', textAlign: 'center' }}>
                    <div style={{ position: 'relative', width: '150px', height: '150px', margin: '0 auto' }}>
                    <svg width="150" height="150">
                        <circle cx="75" cy="75" r="70" stroke="#333" strokeWidth="10" fill="none" />
                        <circle cx="75" cy="75" r="70" stroke="#b6e486" strokeWidth="10" fill="none" strokeDasharray="440" strokeDashoffset="132" />
                    </svg>
                    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: '24px' }}>
                        70%
                    </div>
                    </div>
                    <div style={{ marginTop: '1rem', textAlign: 'left', lineHeight: '1.5' }}>
                    <div>acne reduced: 50%</div>
                    <div>hyperpigmentation: 60%</div>
                    <div>blackheads: 70%</div>
                    <div>oiliness reduced: 80%</div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  dashboardContainer: {
    display: "flex",
    height: "100vh",
    backgroundColor: "#1C1C1C",
  },
  sidebar: {
    
    width: "250px",
    backgroundColor: "#000000",
    color: "#CEDF9F",
    display: "flex",
    flexDirection: "column",
    padding: "20px",
  },
  logoContainer: {
    marginBottom: "40px",
  },
  logo: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#ffffff",
  },
  nav: {
    marginTop: "85px",
    flexGrow: 1,
  },
  navItem: {
    display: "flex",
    alignItems: "center",
    color: "#CEDF9F",
    textDecoration: "none",
    marginBottom: "20px",
  },
  icon: {
    marginRight: "10px",
  },
  navText: {
    fontSize: "18px",
  },
  ordersSection: {
    marginTop: "auto",
    marginBottom: "20px",
  },
  ordersTitle: {
    marginBottom: "10px",
    color: "#CEDF9F",
    fontSize: "14px",
  },
  orderList: {
    listStyle: "none",
    padding: "0",
    margin: "0",
  },
  orderItem: {
    marginBottom: "10px",
    color: "#ffffff",
  },
  orderIcon: {
    marginRight: "10px",
  },
  seeAllLink: {
    color: "#CEDF9F",
    fontSize: "14px",
    textDecoration: "none",
  },
  logoutContainer: {
    marginTop: "20px",
  },
  logoutLink: {
    color: "#FF4C4C",
    textDecoration: "none",
    fontSize: "16px",
  },
  headerContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px",
    backgroundColor: "#1A1A1A",
  },
  ordersInfo: {
    display: "flex",
    alignItems: "center",
    color: "#CEDF9F",
  },
  ordersNumber: {
    fontSize: "32px",
    fontWeight: "bold",
    marginRight: "10px",
  },
  ordersText: {
    fontSize: "18px",
    marginRight: "5px",
  },
  ordersSubText: {
    fontSize: "14px",
    color: "#A1A1A1",
  },
  toggleButtons: {
    display: "flex",
    alignItems: "center",
  },
  activeButton: {
    padding: "10px 20px",
    backgroundColor: "#CEDF9F",
    border: "none",
    borderRadius: "20px",
    marginRight: "10px",
    fontWeight: "bold",
    cursor: "pointer",
  },
  inactiveButton: {
    padding: "10px 20px",
    backgroundColor: "transparent",
    color: "#CEDF9F",
    border: "2px solid #CEDF9F",
    borderRadius: "20px",
    cursor: "pointer",
  },
  headerIcons: {
    display: "flex",
    alignItems: "center",
  },
  headerIcon: {
    fontSize: "24px",
    color: "#CEDF9F",
    marginRight: "20px",
    cursor: "pointer",
  },
  userAvatar: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    cursor: "pointer",
  },
  cardsContainer: {
    // width: "237px",
    // height: "228px",
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "20px",
    padding: "20px",
    backgroundColor: '#171717',
  },
  card: {
    backgroundColor: "#171717",
    color: "#fff",
    borderRadius: "15px",
    padding: "20px",
    textAlign: "center",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  },
  cardText: {
    fontSize: "20px",
    fontWeight: "bold",
    marginTop: "100px", // Adjust to ensure text is visible on image
  },
};

export default DashboardLog;
