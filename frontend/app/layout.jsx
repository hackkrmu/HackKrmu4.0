"use client"; // This directive ensures the component runs on the client side

import { useEffect, useState } from "react";
import { Inter } from "next/font/google";
import Header from "./Layout/Header";
import Sidebar from "./Layout/Sidebar";
import Cookies from "js-cookie"; // Import js-cookie
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const token = Cookies.get("token");
export default function RootLayout({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(null); // Initial state is null for loading

  useEffect(() => {
    // Simulate fetching login status
    const checkLoginStatus = async () => {
      if(token){
        setIsLoggedIn(true)
      }
      else
      {
        setIsLoggedIn(false);
      }
    };

    checkLoginStatus();
  }, []); // Empty dependency array means this runs once on client mount


  return (
    <html lang="en">
      <body className={styles.cont}>
        {isLoggedIn ? (
          <div style={styles.layout}>
            <div style={styles.sidebarHeaderContainer}>
              <div style={styles.sidebar}>
                <Sidebar />
              </div>
              <div style={styles.header}>
                <Header />
                <div style={styles.content}>{children}</div>
              </div>
            </div>
          </div>
        ) : (
          <div style={styles.main}>{children}</div>
        )}
      </body>
    </html>
  );
}

const styles = {
  main: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#1C1C1C",
  },
  cont: {
    margin: "0",
    padding: "0",
  },
  layout: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
  },
  // sidebarHeaderContainer: {
  //   display: "flex",
  // },
  sidebar: {
    position: "fixed",
  },
  header: {
    // width: "100%",
    // left: "250px",
  },
  content: {
    flexGrow: 1,
    left: "250px",
    overflow: "hidden",
  },
};
