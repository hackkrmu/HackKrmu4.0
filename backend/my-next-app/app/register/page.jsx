import React from "react";

const RegisterPage = () => {
  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.logo}>skincare</h1>
      </header>
      <h2 style={styles.registerTitle}>register</h2>
      <div style={styles.registerBox}>
        <div style={styles.contain}>
          <form style={styles.form}>
            <div style={styles.inputContainer}>
              <label style={styles.label} htmlFor="name">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your name"
                style={styles.input}
              />
            </div>
            <div style={styles.inputContainer}>
              <label style={styles.label} htmlFor="username">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Enter your username"
                style={styles.input}
              />
            </div>
            <div style={styles.inputContainer}>
              <label style={styles.label} htmlFor="phoneNumber">
                Phone Number
              </label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                placeholder="Enter your phone number"
                style={styles.input}
              />
            </div>
            <div style={styles.inputContainer}>
              <label style={styles.label} htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                style={styles.input}
              />
            </div>
            <div style={styles.inputContainer}>
              <label style={styles.label} htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                style={styles.input}
              />
            </div>
            <div style={styles.inputContainer}>
              <label style={styles.label} htmlFor="confirmPassword">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm your password"
                style={styles.input}
              />
            </div>
          </form>
          <div style={styles.registerButtonBox}>
              <button type="submit" style={styles.registerButton}>
                Register
              </button>
          </div>
        </div>
        <p style={styles.loginText}>
          already a user?{" "}
          <a href="/login" style={styles.loginLink}>
            login
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
    backgroundColor: "#222222", // Dark background
    color: "#ffffff",
  },
  form: {
    marginTop: "30px",
    display: 'grid',
    gap: '20px', // Adjust gap between grid items as needed
    gridTemplateColumns: '1fr 1fr', // Two columns
    maxWidth: '600px', // Adjust width as needed
    margin: '0 auto',
    padding:"20px",
  },
  inputContainer: {
    display: 'grid',
    gap: '8px', // Adjust gap within each input container
    marginBottom: "20px",
    position: "relative",
  },
  label: {
    display: "block",
    fontSize: "18px",
    marginBottom: "8px",
    color: '#FFF',
    fontfamily: 'Outfit',
    fontsize: '36px',
    fontstyle: 'normal',
    fontweight: '600',
    lineheight: 'normal',
    letterspacing: '-1.44px',
  },
  registerButton: {
    padding: "10px 0",
    borderRadius: "56px",
    border: "3px solid #CEDF9F",
    background: "#181818",
    backdropFilter: "blur(5.85px)", // Rounded to 2 decimal places for consistency
    width: "226px",
    height: "74px",
  },
  registerButtonBox:{
    display: 'flex',
    justifyContent: 'center',
    
  },
  contain: {
    display: "flex",
    flexDirection:'column',
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
  registerBox: {
    width: "672px",
    height: "669px",
    flexshrink: "0",
    borderRadius: "85px",
    border: "12px solid rgba(227, 227, 227, 0.40)",
    background: "rgba(255, 255, 255, 0.20)",
    backdropFilter: "blur(5.85px)", // Rounded to 2 decimal places for consistency
  },
  registerTitle: {
    color: "#FFF",
    fontFamily: "Outfit",
    fontSize: "96px",
    fontStyle: "normal",
    fontWeight: 900,
    lineHeight: "normal",
    letterSpacing: "-5.76px",
  },
 
  input: {
    border: '1px solid #ccc',
    borderRadius: '23px',
    width: "100%",
    padding: "10px",
    border: "3px solid #666666",
    backgroundColor: "#444444", // Lighter gray for the input fields
    color: "#ffffff",
  },
  loginText: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: "20px",
    fontSize: "14px",
  },
  loginLink: {
    color: "#C3C4A9",
    textDecoration: "none",
  },
};

export default RegisterPage;
