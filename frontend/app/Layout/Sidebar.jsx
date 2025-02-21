import React, { useState, useEffect } from "react";
import Image from "next/image";
import Cookies from "js-cookie";
import dynamic from "next/dynamic";
import sideIcon from "../../public/icons kit/sideicon.png";

const Sidebar = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [screenWidth, setScreenWidth] = useState(0);

  // Detect screen size changes and automatically show/hide the sidebar
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setScreenWidth(width);
      
      if (width > 768) {
        setIsSidebarVisible(true);
      } else {
        setIsSidebarVisible(false);
      }
    };

    // Initial call and event listener
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarVisible((prev) => !prev);
  };

  // New function to handle navigation with reload
  const handleNavigationWithReload = (path) => {
    window.location.href = path;
  };

  const handleLogout = () => {
    // Remove authentication cookies
    Cookies.remove("token"); // Replace with your cookie name
    window.location.href = "/";
  };

  const styles = {
    sidebar: {
      height: "100vh",
      background: "#171717",
      color: "#CEDF9F",
      display: "flex",
      flexDirection: "column",
      padding: "20px",
      position: "fixed",
      left: "0",
      top: "0",
      zIndex: "1",
      width: isSidebarVisible ? "250px" : "0",
      marginLeft: isSidebarVisible ? "0" : "-250px",
      visibility: isSidebarVisible ? "visible" : "hidden",
      transition: "left 0.3s ease, width 0.3s ease, visibility 0.3s ease",
    },
    toggleButton: {
      fontSize: "20px",
      color: "#ffffff",
      background: "#1a1a1a",
      border: "none",
      padding: "0px",
      paddingLeft: "18px",
      cursor: "pointer",
      position: "fixed",
      zIndex: "2",
      width: "40px",
      height: "84px",
      fontWeight: "bold",
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
      flexGrow: 1,
      marginTop: "85px",
      position: "relative",
      zIndex: "2",
      paddingLeft: "15px",
    },
    navItem: {
      display: "flex",
      alignItems: "center",
      color: "#CEDF9F",
      textDecoration: "none",
      marginBottom: "35px",
      cursor: "pointer",
    },
    navText: {
      marginLeft: "10px",
      fontSize: "18px",
    },
    logoutContainer: {
      marginTop: "120px",
      marginLeft: "15px",
    },
    logoutLink: {
      color: "#FF4C4C",
      textDecoration: "none",
      fontSize: "16px",
      cursor: "pointer",
    },
  };

  return (
    <div>
      {screenWidth <= 768 && (
        <button style={styles.toggleButton} onClick={toggleSidebar}>
          <Image
            src={sideIcon}
            alt="Toggle Sidebar"
            width={20}
            height={20}
            style={{ objectFit: "contain" }}
          />
        </button>
      )}

      <div style={styles.sidebar}>
        <div style={styles.logoContainer}>
          <h1 style={styles.logo}>oliveclear</h1>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <nav style={styles.nav}>
            <div 
              style={styles.navItem} 
              onClick={() => handleNavigationWithReload("/Landing/DashboardLog")}
            >
              <Image
                src="/icons kit/home.png"
                alt="Home Icon"
                width={13}
                height={15}
              />
              <span style={styles.navText}>Home</span>
            </div>

            <div 
              style={styles.navItem} 
              onClick={() => handleNavigationWithReload("/ChatBot")}
            >
              <Image
                src="/icons kit/ai chat.png"
                alt="Chat Icon"
                width={13}
                height={15}
              />
              <span style={styles.navText}>AI Chat</span>
            </div>

            <div 
              style={styles.navItem} 
              onClick={() => handleNavigationWithReload("/BookSession")}
            >
              <Image
                src="/icons kit/book session.png"
                alt="Book Session Icon"
                width={13}
                height={15}
              />
              <span style={styles.navText}>Book Session</span>
            </div>

            <div 
              style={styles.navItem} 
              onClick={() => handleNavigationWithReload("/Ecommmerce/BuyProduct")}
            >
              <Image
                src="/icons kit/shop now.png"
                alt="Shop Icon"
                width={13}
                height={15}
              />
              <span style={styles.navText}>Shop Now!</span>
            </div>

            <div 
              style={styles.navItem} 
              onClick={() => handleNavigationWithReload("/GetDoctors")}
            >
              <Image
                src="/icons kit/shop now.png"
                alt="Chat Doc Icon"
                width={13}
                height={15}
              />
              <span style={styles.navText}>Chat with Doc</span>
            </div>

            <div 
              style={styles.navItem} 
              onClick={() => handleNavigationWithReload("#")}
            >
              <Image
                src="/icons kit/settings.png"
                alt="Settings Icon"
                width={13}
                height={15}
              />
              <span style={styles.navText}>Settings</span>
            </div>
          </nav>

          <div style={styles.logoutContainer}>
            <div
              style={styles.logoutLink}
              onClick={handleLogout}
            >
              → Log Out
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default dynamic (() => Promise.resolve(Sidebar), { ssr: false });