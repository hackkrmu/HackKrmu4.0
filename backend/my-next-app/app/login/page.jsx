import React from "react";
// import Link from "next/link";

const LoginPage = () => {
  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.logo}>skincare</h1>
      </header>
      <h2 style={styles.loginTitle}>login</h2>
      <div style={styles.loginBox}>
        <form style={styles.contain}>{/*//hbibikjb */}
          <div style={styles.inputContainer}>
            <label style={styles.label} htmlFor="username">
              username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="enter your username"
              style={styles.input}
            />
          </div>
          <div style={styles.inputContainer}>
            <label style={styles.label} htmlFor="password">
              password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="enter your password"
              style={styles.input}
            />
            <a href="#" style={styles.forgotLink}>
              forgot?
            </a>
          </div>
          <div style={styles.loginButtonDiv}>
            <button type="submit" style={styles.loginButton}>
                login
            </button>
          </div>
        </form>
        <p style={styles.signupText}>
          If you are not registered{" "}
          <a href="/register" style={styles.signupLink}>
            Register
          </a>
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#222222", // Dark background color
    color: "#ffffff",
  },
  header: {
    position: "absolute",
    top: "20px",
    left: "20px",
  },
  logo: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#ffffff",
  },
  loginBox: {
    width: "672px",
    height: "669px",
    flexshrink: "0",
    borderRadius: "85px",
    border: "12px solid rgba(227, 227, 227, 0.40)",
    background: "rgba(255, 255, 255, 0.20)",
    backdropFilter: "blur(5.85px)", // Rounded to 2 decimal places for consistency
  },
  loginTitle: {
    color: "#FFF",
    fontFamily: "Outfit",
    fontSize: "96px",
    fontStyle: "normal",
    fontWeight: 900,
    lineHeight: "normal",
    letterSpacing: "-5.76px",
  },
  inputContainer: {
    marginBottom: "20px",
    position: "relative",
  },
  label: {
    display: "flex",
    flexDirection: "column",
    marginLeft: "30px",
    marginTop: "40px",
    color: "#FFF",
    fontFamily: "Outfit",
    fontSize: "36px",
    fontStyle: "normal",
    fontWeight: 600,
    lineHeight: "normal",
    letterSpacing: "-1.44px",
  },
  input: {
    display: "flex",
    flexDirection: "column",
    marginLeft: "30px",
    marginTop: "10px",
    padding: "10px",
    borderRadius: "5px",
    borderRadius: "23px",
    border: "3px solid rgba(255, 255, 255, 0.40)",
    background: "rgba(255, 255, 255, 0.20)",
    backdropFilter: "blur(5.85px)", // Rounded to 2 decimal places for consistency
    width: "450px",
    height: "66px",
    flexShrink: 0,
  },
  forgotLink: {
    position: "absolute",
    right: "0",
    top: "45%",
    fontSize: "12px",
    color: "#C3C4A9", // Light yellowish color for links
    textDecoration: "none",
  },
  loginButtonDiv:{
    marginTop:"100px",
    display: 'flex',
    justifyContent: 'center',
  },
  loginButton: {
    padding: "10px 0",
    borderRadius: "56px",
    border: "3px solid #CEDF9F",
    background: "#181818",
    backdropFilter: "blur(5.85px)", // Rounded to 2 decimal places for consistency
    width: "226px",
    height: "74px",

  },
  signupText: {
    marginTop: "20px",
    fontSize: "14px",
  },
  signupLink: {
    color: "#C3C4A9",
    textDecoration: "none",
  },
};

export default LoginPage;
