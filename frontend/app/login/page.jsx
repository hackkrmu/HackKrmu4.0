// "use client";

// import React, { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import Cookies from "js-cookie";

// const LoginPage = () => {
//   const [loginField, setLoginField] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const router = useRouter();

//   const [isScreen, setIsScreen] = useState(false);
//   const [isMobile, setIsMobile] = useState(false);

//   useEffect(() => {
//     const handleResize = () => {
//       setIsScreen(window.innerWidth <= 768); // Adjust for Screen screen width
//       setIsMobile(window.innerWidth <= 430);
//     };

//     // Initial check and adding a resize listener
//     handleResize();
//     window.addEventListener("resize", handleResize);

//     // Cleanup listener on component unmount
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError("");

//     try {
//       const response = await fetch(
//         `${process.env.NEXT_PUBLIC_URL_HOST}/login`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ loginField, password }),
//         }
//       );

//       const result = await response.json();

//       if (response.ok) {
//         // Store token in cookies using js-cookie
//         Cookies.set("token", result.token, { expires: 7 }); // 7 days expiration
//         console.log;

//         // Redirect to the dashboard or desired page
//         router.push("/");
//         window.location.href = "/";
//         router.refresh();
//       } else {
//         // Handle error response
//         setError(result.message || "Login failed, please try again.");
//       }
//     } catch (error) {
//       // Catch and handle any other errors
//       setError("An unexpected error occurred. Please try again.");
//       console.error("Error during login:", error);
//     }
//   };

//   const styles = {
//     contain: {
//       display: "flex",
//       position: "relative",
//       top: "70px",
//       flexDirection: "column",
//     },
//     container: {
//       display: "flex",
//       flexDirection: "column",
//       alignItems: "center",
//       justifyContent: "center",
//       height: "100vh",
//       backgroundColor: "#222222",
//       color: "#ffffff",
//     },
//     header: {
//       position: "absolute",
//       top: "20px",
//       left: "20px",
//     },
//     logo: {
//       fontSize: "24px",
//       fontWeight: "bold",
//       color: "#ffffff",
//     },
//     loginBox: {
//       // width: isMobile ? "300px": "672px",
//       height: "669px",
//       // height: "669px",
//       borderRadius: "85px",
//       border: "12px solid rgba(227, 227, 227, 0.40)",
//       background: "rgba(255, 255, 255, 0.20)",
//       backdropFilter: "blur(5.85px)",
//       border: isScreen ? "" : "12px solid rgba(227, 227, 227, 0.40)",
//       background: isScreen ? "" : "rgba(255, 255, 255, 0.20)",
//       backdropFilter: isScreen ? "" : "blur(5.85px)",
//     },
//     loginTitle: {
//       color: "#FFF",
//       fontSize: "96px",
//       fontWeight: 900,
//       letterSpacing: "-5.76px",
//     },
//     inputContainer: {
//       marginBottom: "20px",
//       position: "relative",
//     },
//     label: {
//       marginLeft: "30px",
//       marginTop: "40px",
//       color: "#FFF",
//       fontSize: "36px",
//       fontWeight: 600,
//       letterSpacing: "-1.44px",
//     },
//     input: {
//       marginLeft: "30px",
//       marginTop: "5px",
//       padding: "10px",
//       borderRadius: "23px",
//       border: "3px solid rgba(255, 255, 255, 0.40)",
//       background: "rgba(255, 255, 255, 0.20)",
//       backdropFilter: "blur(5.85px)",
//       width: isMobile ?  "570px" :"446px",
//       height: "66px",
//     },
//     forgotLink: {
//       position: "relative",
//       left: "250px",
//       // top: "45%",
//       fontSize: "20px",
//       color: "#C3C4A9",
//       textDecoration: "none",
//     },
//     loginButtonDiv: {
//       marginTop: "100px",
//       display: "flex",
//       flexDirection: "column",
//       justifyContent: "center",
//       alignItems: "center",
//     },
//     loginButton: {
//       padding: "10px 0",
//       borderRadius: "56px",
//       border: "3px solid #CEDF9F",
//       background: "#181818",
//       width: "226px",
//       height: "74px",
//     },
//     error: {
//       color: "red",
//       textAlign: "center",
//       marginBottom: "10px",
//     },
//     signupText: {
//       marginTop: "20px",
//       display: "flex",
//       // flexDirection: "column",
//       fontSize: "14px",
//     },
//     signupLink: {
//       color: "#C3C4A9",
//       textDecoration: "none",
//     },
//   };

//   return (
//     <div style={styles.container}>
//       <header style={styles.header}>
//         <h1 style={styles.logo}>OliveClear</h1>
//       </header>
//       <h2 style={styles.loginTitle}>Login</h2>
//       <div
//         style={{
//           ...styles.loginBox,
//           width: isMobile ? "300px" : "672px",
//         }}
//       >
//         <form style={styles.contain} onSubmit={handleLogin}>
//           <div style={styles.inputContainer}>
//             <label style={styles.label} htmlFor="username">
//               Username / Email / Phone
//             </label>
//             <input
//               type="text"
//               id="username"
//               name="loginField"
//               placeholder="Enter your username / email / phone"
//               style={styles.input}
//               value={loginField}
//               onChange={(e) => setLoginField(e.target.value)}
//             />
//           </div>
//           <div style={styles.inputContainer}>
//             <label style={styles.label} htmlFor="password">
//               Password
//             </label>
//             <a href="#" style={styles.forgotLink}>
//               Forgot?
//             </a>
//             <input
//               type="password"
//               id="password"
//               name="password"
//               placeholder="Enter your password"
//               style={styles.input}
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//           </div>
//           {error && <p style={styles.error}>{error}</p>}
//           <div style={styles.loginButtonDiv}>
//             <button type="submit" style={styles.loginButton}>
//               Login
//             </button>
//             <p style={styles.signupText}>
//               If you are not registered{""}
//               <a href="/register" style={styles.signupLink}>
//                 Register
//               </a>
//             </p>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;


// import React from "react";

// const styles = {
//   container: {
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     minHeight: "100vh",
//     backgroundColor: "#000",
//   },
//   formBox: {
//     width: "400px",
//     backgroundColor: "#1a1a1a",
//     color: "white",
//     padding: "24px",
//     borderRadius: "10px",
//     boxShadow: "0px 4px 10px rgba(0,0,0,0.3)",
//   },
//   title: {
//     textAlign: "center",
//     fontSize: "24px",
//     fontWeight: "bold",
//     marginBottom: "10px",
//   },
//   subtitle: {
//     textAlign: "center",
//     fontSize: "14px",
//     color: "#aaa",
//     marginBottom: "16px",
//   },
//   input: {
//     width: "100%",
//     padding: "12px",
//     marginBottom: "10px",
//     borderRadius: "5px",
//     border: "1px solid #333",
//     backgroundColor: "#2a2a2a",
//     color: "white",
//     fontSize: "14px",
//     outline: "none",
//   },
//   button: {
//     width: "100%",
//     padding: "12px",
//     backgroundColor: "#fff",
//     color: "#000",
//     fontWeight: "bold",
//     borderRadius: "5px",
//     border: "none",
//     cursor: "pointer",
//     marginTop: "10px",
//   },
//   googleButton: {
//     width: "100%",
//     padding: "12px",
//     backgroundColor: "#d4e157",
//     color: "#000",
//     fontWeight: "bold",
//     borderRadius: "5px",
//     border: "none",
//     cursor: "pointer",
//     marginTop: "10px",
//   },
//   link: {
//     color: "#4a90e2",
//     textDecoration: "none",
//     fontSize: "14px",
//   },
//   footerText: {
//     textAlign: "center",
//     fontSize: "14px",
//     marginTop: "14px",
//   },
// };

// const LoginPage = () => {
//   return (
//     <div style={styles.container}>
//       <div style={styles.formBox}>
//         <div style={{ textAlign: "center", marginBottom: "10px" }}>
//           <h1 style={styles.title}>declutr</h1>
//         </div>
//         <h2 style={styles.title}>Create account</h2>
//         <p style={styles.subtitle}>Email / phone</p>

//         <form>
//           <input type="email" placeholder="Enter your email" style={styles.input} />
//           <input type="password" placeholder="Create password" style={styles.input} />
//           <input type="password" placeholder="Confirm password" style={styles.input} />
//           <button type="submit" style={styles.button}>Continue</button>
//         </form>

//         <div style={{ textAlign: "center", margin: "10px 0", color: "#777" }}>
//           <hr style={{ border: "1px solid #444" }} />
//         </div>

//         <button style={styles.googleButton}>Continue with Google</button>

//         <p style={{ textAlign: "center", fontSize: "12px", marginTop: "10px", color: "#888" }}>
//           By signing up, I have read and agree to{" "}
//           <a href="#" style={styles.link}>Terms</a> and{" "}
//           <a href="#" style={styles.link}>Privacy Policy</a>.
//         </p>

//         <p style={styles.footerText}>
//           Already a user? <a href="#" style={styles.link}>Sign in</a>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;


// "use client";

// import React, { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import Cookies from "js-cookie";

// const LoginPage = () => {
//   const [loginField, setLoginField] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const router = useRouter();

//   const [isScreen, setIsScreen] = useState(false);
//   const [isMobile, setIsMobile] = useState(false);

//   useEffect(() => {
//     const handleResize = () => {
//       setIsScreen(window.innerWidth <= 768);
//       setIsMobile(window.innerWidth <= 430);
//     };

//     handleResize();
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError("");

//     try {
//       const response = await fetch(
//         `${process.env.NEXT_PUBLIC_URL_HOST}/login`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ loginField, password }),
//         }
//       );

//       const result = await response.json();

//       if (response.ok) {
//         Cookies.set("token", result.token, { expires: 7 });
//         router.push("/");
//         window.location.href = "/";
//         router.refresh();
//       } else {
//         setError(result.message || "Login failed, please try again.");
//       }
//     } catch (error) {
//       setError("An unexpected error occurred. Please try again.");
//       console.error("Error during login:", error);
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
//       <header className="absolute top-5 left-5 text-2xl font-bold">OliveClear</header>
//       <h2 className="text-6xl font-extrabold mb-8">Login</h2>
//       <div className={`rounded-3xl p-10 ${isMobile ? "w-80" : "w-96"} bg-opacity-20 backdrop-blur-md border border-gray-300` }>
//         <form onSubmit={handleLogin} className="flex flex-col space-y-6">
//           <div className="flex flex-col">
//             <label className="text-xl mb-2">Username / Email / Phone</label>
//             <input
//               type="text"
//               name="loginField"
//               placeholder="Enter your username / email / phone"
//               className="p-3 rounded-lg border border-gray-400 bg-opacity-20 backdrop-blur-md text-black"
//               value={loginField}
//               onChange={(e) => setLoginField(e.target.value)}
//             />
//           </div>
//           <div className="flex flex-col">
//             <label className="text-xl mb-2">Password</label>
//             <input
//               type="password"
//               name="password"
//               placeholder="Enter your password"
//               className="p-3 rounded-lg border border-gray-400 bg-opacity-20 backdrop-blur-md text-black"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//             <a href="#" className="text-sm text-gray-300 mt-2">Forgot?</a>
//           </div>
//           {error && <p className="text-red-500 text-center">{error}</p>}
//           <button type="submit" className="bg-gray-800 border border-green-300 px-6 py-3 rounded-xl">Login</button>
//           <p className="text-sm">
//             If you are not registered, <a href="/register" className="text-green-300">Register</a>
//           </p>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;


"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const LoginPage = () => {
  const [loginField, setLoginField] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const [isScreen, setIsScreen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsScreen(window.innerWidth <= 768);
      setIsMobile(window.innerWidth <= 430);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL_HOST}/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ loginField, password }),
        }
      );

      const result = await response.json();

      if (response.ok) {
        Cookies.set("token", result.token, { expires: 7 });
        router.push("/");
        window.location.href = "/";
        router.refresh();
      } else {
        setError(result.message || "Login failed, please try again.");
      }
    } catch (error) {
      setError("An unexpected error occurred. Please try again.");
      console.error("Error during login:", error);
    }
  };

  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      backgroundColor: "#1a1a1a",
      color: "white",
    },
    header: {
      position: "absolute",
      top: "20px",
      left: "20px",
      fontSize: "2rem",
      fontWeight: "bold",
    },
    title: {
      fontSize: "3rem",
      fontWeight: "bold",
      marginBottom: "30px",
    },
    formContainer: {
      width: isMobile ? "320px" : "384px",
      padding: "40px",
      borderRadius: "20px",
      background: "rgba(255, 255, 255, 0.1)",
      backdropFilter: "blur(10px)",
      textAlign: "center",
      border: "1px solid rgba(255, 255, 255, 0.3)",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      gap: "15px",
    },
    inputGroup: {
      display: "flex",
      flexDirection: "column",
      textAlign: "left",
    },
    label: {
      fontSize: "1.2rem",
      fontWeight: "bold",
      marginBottom: "5px",
    },
    input: {
      padding: "12px",
      borderRadius: "8px",
      border: "1px solid gray",
      background: "rgba(255, 255, 255, 0.2)",
      backdropFilter: "blur(8px)",
      color: "black",
    },
    forgotLink: {
      fontSize: "0.9rem",
      color: "lightgray",
      marginTop: "5px",
      textDecoration: "none",
    },
    errorText: {
      color: "red",
      textAlign: "center",
    },
    button: {
      padding: "12px",
      background: "#333",
      color: "#00ff99",
      fontWeight: "bold",
      border: "2px solid #00ff99",
      borderRadius: "10px",
      cursor: "pointer",
    },
    registerText: {
      fontSize: "0.9rem",
      marginTop: "10px",
    },
    registerLink: {
      color: "#00ff99",
      textDecoration: "none",
    },
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>OliveClear</header>
      <h2 style={styles.title}>Login</h2>
      <div style={styles.formContainer}>
        <form style={styles.form} onSubmit={handleLogin}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Username / Email / Phone</label>
            <input
              type="text"
              name="loginField"
              placeholder="Enter your username / email / phone"
              style={styles.input}
              value={loginField}
              onChange={(e) => setLoginField(e.target.value)}
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              style={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <a href="#" style={styles.forgotLink}>Forgot?</a>
          </div>
          {error && <p style={styles.errorText}>{error}</p>}
          <button type="submit" style={styles.button}>Login</button>
          <p style={styles.registerText}>
            If you are not registered, <a href="/register" style={styles.registerLink}>Register</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
