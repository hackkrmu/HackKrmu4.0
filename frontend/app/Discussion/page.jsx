"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Istok_Web } from "next/font/google";
import Cookies from "js-cookie";

const istokweb = Istok_Web({
  weight: ["400", "700"],
  subsets: ["latin"],
});

const DiscussionRoom = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isScreen, setIsScreen] = useState(false);
  const [posts, setPosts] = useState([]);
  const token = Cookies.get("token");

  // Handle screen resizing for mobile responsiveness
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize); // Add event listener

    return () => {
      window.removeEventListener("resize", handleResize); // Cleanup listener
    };
  }, []);

  // Fetch posts from the backend
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_URL_HOST}/discuss/get-message`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        setPosts(data.messages || []);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, [token]);

  return (
    <div>
      <div
        style={{
          ...styles.container,
          // position: "relative",
          // zIndex: isScreen ? "0" : "-1",
          // zIndex: isMobile ? "-2" : "-1",
          marginLeft: isMobile ? "0px" : "250px",
        }}
      >
        {/* Header Section */}
        <div style={styles.header}>
          <h1 style={styles.title}>Discussion</h1>
          <Link href="/DiscussionPost" passHref>
            <button style={styles.newPostButton}>+</button>
          </Link>
        </div>

        <div style={styles.line}></div>

        {/* Posts Section */}
        <div style={styles.postsContainer}>
          {posts.map((post, index) => (
            <div key={index}>
              <div style={styles.post}>
                <img
                  src="/assets/user.png" // Reference the image path relative to the public folder
                  alt="User Avatar"
                  style={styles.avatar}
                />
                <div style={styles.postContent}>
                  <p style={styles.username}>@anonymous {index + 1}</p>
                  <p style={styles.content}>{post.content}</p>
                </div>
                <div style={styles.voteSection}>
                  <button style={styles.voteButton}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 32 32"
                      fill="none"
                    >
                      <path
                        d="M16 31C24.2843 31 31 24.2843 31 16C31 7.71573 24.2843 1 16 1C7.71573 1 1 7.71573 1 16C1 24.2843 7.71573 31 16 31Z"
                        stroke="#EBEBEB"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M22.0059 16.0004L16.0059 10.0004L10.0059 16.0004"
                        stroke="#EBEBEB"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M16 22.0003V10.0003"
                        stroke="#EBEBEB"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </button>

                  <button style={styles.voteButton}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 32 32"
                      fill="none"
                    >
                      <path
                        d="M16 1C7.71573 1 1 7.71573 1 16C1 24.2843 7.71573 31 16 31C24.2843 31 31 24.2843 31 16C31 7.71573 24.2843 1 16 1Z"
                        stroke="#EBEBEB"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M9.99414 15.9996L15.9941 21.9996L21.9941 15.9996"
                        stroke="#EBEBEB"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M16 9.99967V21.9997"
                        stroke="#EBEBEB"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              <div style={styles.line}></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    // position: "relative",
    backgroundColor: "#171717",
    color: "#ffffff",
    padding: "10px",
    fontFamily: "Outfit",
    display: "flex",
    flexDirection: "column",
    marginTop: "84px",
    // marginLeft: "250px",
    // zIndex: "-2",
    borderRadius: "28px",
    // boxShadow: "rgb(16 16 16) 0px 0px 12.7px 0px inset",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },
  title: {
    fontSize: "36px",
    fontWeight: "600",
    margin: "0",
    fontFamily: istokweb.style.fontFamily,
    letterSpacing: "-1.9px",
    color: "#CEDF9F",
    letterSpacing: "-2.4px",
  },
  newPostButton: {
    backgroundColor: "#CEDF9F",
    color: "#171717",
    border: "none",
    borderRadius: "50%",
    width: "40px",
    height: "40px",
    fontSize: "24px",
    cursor: "pointer",
  },
  postsContainer: {
    flex: 1,
    fontFamily: istokweb.style.fontFamily,
    paddingTop: "3px",
  },
  post: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#171717",
    padding: "10px",
    borderRadius: "8px",
    marginBottom: "10px",
    height: "100px",
  },
  avatar: {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    marginRight: "15px",
  },
  postContent: {
    flex: 1,
  },
  username: {
    margin: "0 0 5px 0",
    fontWeight: "bold",
    fontSize: "16px",
    color: "#CEDF9F",
    fontFamily: istokweb.style.fontFamily,
  },
  content: {
    margin: 0,
    fontSize: "13px",
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: "normal",
    fontFamily: istokweb.style.fontFamily,
  },
  voteSection: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginLeft: "20px",
  },
  voteCount: {
    margin: "5px 0",
    fontSize: "16px",
  },
  voteButton: {
    backgroundColor: "transparent",
    color: "#fff",
    fontSize: "14px",
    cursor: "pointer",
    marginRight: "5px",
    marginLeft: "5px",
  },
  line: {
    backgroundColor: "#FFFFFF1A",
    height: "1px",
    marginBottom: "2px",
  },
};

export default DiscussionRoom;
