"use client";
import React, { useState } from "react";
import Cookies from "js-cookie"; // Import js-cookie
import { useRouter } from "next/navigation"; // Import useRouter for navigation

const Page = () => {
  const [message, setMessage] = useState("");
  const router = useRouter(); // Initialize router

  // Handle input change
  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Retrieve token from Cookies
    const token = Cookies.get("token");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL_HOST}/discuss/send-message`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json", // Set the content type to JSON
          },
          body: JSON.stringify({ message }), // Send the message as JSON
        }
      );

      if (!response.ok) {
        const errorData = await response.json(); // Get error details from response
        throw new Error(errorData.message || "Network response was not ok");
      }

      // Handle response (e.g., clear input field or display a message)
      setMessage("");
      alert("Message sent successfully!");

      // Redirect to /Discussion after successful submission
      router.push("/Discussion");
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Error sending message: " + error.message); // Show error to user
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          value={message}
          onChange={handleChange}
          placeholder="Enter your message"
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          Send
        </button>
      </form>
      <p style={styles.disclaimer}>
        Disclaimer: You are anonymous, and no foul language will be tolerated.
      </p>
    </div>
  );
};

const styles = {
  container: {
    marginLeft: "250px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#1c1c1c", // Background for the page
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#fff", // White background for form
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
  },
  input: {
    marginBottom: "15px",
    padding: "10px",
    width: "300px",
    fontSize: "16px",
    border: "1px solid #CEDF9F", // Border color matches the color scheme
    borderRadius: "5px",
  },
  button: {
    backgroundColor: "#CEDF9F", // Same color scheme for button
    color: "#1a1a1a",
    border: "none",
    borderRadius: "5px",
    padding: "10px 20px",
    fontSize: "16px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  disclaimer: {
    marginTop: "20px",
    color: "#fff",
    fontSize: "14px",
    textAlign: "center",
  },
};

export default Page;
