// "use client";
// import React, { useState } from "react";

// const RegisterPage = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     username: "",
//     phone: "",
//     email: "",
//     password: "",
//     cnfrm_password: "",
//   });

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     // Basic validation
//     if (formData.password !== formData.cnfrm_password) {
//       alert("Passwords do not match.");
//       return;
//     }

//     try {
//       const response = await fetch(`${process.env.NEXT_PUBLIC_URL_HOST}/register`, { // Make sure the port is correct
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });

//       if (response.ok) {
//         const result = await response.json();
//         console.log("Registration successful:", result);
//         // Handle success (e.g., navigate to login page, show success message, etc.)
//       } else {
//         console.error("Error:", response.statusText);
//         // Handle error (e.g., show error message)
//       }
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <header style={styles.header}>
//         <h1 style={styles.logo}>skincare</h1>
//       </header>
//       <h2 style={styles.registerTitle}>register</h2>
//       <div style={styles.registerBox}>
//         <div style={styles.contain}>
//           <form style={styles.form} onSubmit={handleSubmit}>
//             <div style={styles.inputContainer}>
//               <label style={styles.label} htmlFor="name">Name</label>
//               <input
//                 type="text"
//                 id="name"
//                 name="name"
//                 placeholder="Enter your name"
//                 style={styles.input}
//                 value={formData.name}
//                 onChange={handleChange}
//               />
//             </div>
//             <div style={styles.inputContainer}>
//               <label style={styles.label} htmlFor="username">Username</label>
//               <input
//                 type="text"
//                 id="username"
//                 name="username"
//                 placeholder="Enter your username"
//                 style={styles.input}
//                 value={formData.username}
//                 onChange={handleChange}
//               />
//             </div>
//             <div style={styles.inputContainer}>
//               <label style={styles.label} htmlFor="phone">Phone Number</label>
//               <input
//                 type="tel"
//                 id="phone"
//                 name="phone"
//                 placeholder="Enter your phone number"
//                 style={styles.input}
//                 value={formData.phone}
//                 onChange={handleChange}
//               />
//             </div>
//             <div style={styles.inputContainer}>
//               <label style={styles.label} htmlFor="email">Email</label>
//               <input
//                 type="email"
//                 id="email"
//                 name="email"
//                 placeholder="Enter your email"
//                 style={styles.input}
//                 value={formData.email}
//                 onChange={handleChange}
//               />
//             </div>
//             <div style={styles.inputContainer}>
//               <label style={styles.label} htmlFor="password">Password</label>
//               <input
//                 type="password"
//                 id="password"
//                 name="password"
//                 placeholder="Enter your password"
//                 style={styles.input}
//                 value={formData.password}
//                 onChange={handleChange}
//               />
//             </div>
//             <div style={styles.inputContainer}>
//               <label style={styles.label} htmlFor="cnfrm_password">Confirm Password</label>
//               <input
//                 type="password"
//                 id="cnfrm_password"
//                 name="cnfrm_password"
//                 placeholder="Confirm your password"
//                 style={styles.input}
//                 value={formData.cnfrm_password}
//                 onChange={handleChange}
//               />
//             </div>
//             <div style={styles.registerButtonBox}>
//               <button type="submit" style={styles.registerButton}>
//                 Register
//               </button>
//             </div>
//           </form>
//           <p style={styles.loginText}>
//             already a user?{" "}
//             <a href="/login" style={styles.loginLink}>
//               login
//             </a>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// const styles = {
//   container: {
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     justifyContent: "center",
//     height: "100vh",
//     backgroundColor: "#222222",
//     color: "#ffffff",
//   },
//   form: {
//     position: "relative",
//     top: "20px",
//     marginTop: "30px",
//     display: "grid",
//     fontWeight: "600",
//     fontStyle: 'normal',
//     gap: "20px",
//     gridTemplateColumns: "1fr 1fr",
//     maxWidth: "600px",
//     margin: "25px",
//     padding: "20px",
//   },
//   inputContainer: {
//     display: "grid",
//     gap: "8px",
//     marginBottom: "20px",
//     position: "relative",
//   },
//   label: {
//     display: "block",
//     fontSize: "30px",
//     marginBottom: "8px",
//     color: "#FFF",
//     fontFamily: "Outfit",
//     fontSize: "36px",
//     fontStyle: "normal",
//     fontWeight: "600",
//     lineHeight: "normal",
//     letterSpacing: "-1.44px",
//   },
//   registerButton: {
//     padding: "10px 0",
//     borderRadius: "56px",
//     border: "3px solid #CEDF9F",
//     background: "#181818",
//     backdropFilter: "blur(5.85px)",
//     width: "226px",
//     height: "74px",
//     color: "#CEDF9F",
//     fontSize: "18px",
//     fontWeight: "600",
//   },
//   registerButtonBox: {
//     display: "flex",
//     justifyContent: "center",
//   },
//   contain: {
//     display: "flex",
//     flexDirection: "column",
//   },
//   header: {
//     position: "absolute",
//     top: "20px",
//     left: "20px",
//   },
//   logo: {
//     fontSize: "24px",
//     fontWeight: "bold",
//     color: "#ffffff",
//   },
//   registerBox: {
//     width: "672px",
//     height: "669px",
//     flexShrink: "0",
//     borderRadius: "85px",
//     border: "12px solid rgba(227, 227, 227, 0.40)",
//     background: "rgba(255, 255, 255, 0.20)",
//     backdropFilter: "blur(5.85px)",
//   },
//   registerTitle: {
//     color: "#FFF",
//     fontFamily: "Outfit",
//     fontSize: "96px",
//     fontStyle: "normal",
//     fontWeight: 900,
//     lineHeight: "normal",
//     letterSpacing: "-5.76px",
//   },
//   input: {
//     border: "1px solid #ccc",
//     borderRadius: "23px",
//     width: "100%",
//     padding: "10px",
//     border: "3px solid #666666",
//     backgroundColor: "#444444",
//     color: "#ffffff",
//   },
//   loginText: {
//     display: "flex",
//     justifyContent: "center",
//     marginTop: "20px",
//     fontSize: "14px",
//   },
//   loginLink: {
//     color: "#C3C4A9",
//     textDecoration: "none",
//   },
// };

// export default RegisterPage;

"use client";
import React, { useState } from "react";
import Link from "next/link";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    phone: "",
    email: "",
    password: "",
    cnfrm_password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.cnfrm_password) {
      alert("Passwords do not match.");
      return;
    }
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_HOST}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        console.log("Registration successful");
      } else {
        console.error("Error:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <header className="absolute top-6 left-6">
        <h1 className="text-xl font-bold">skincare</h1>
      </header>
      <h2 className="text-6xl font-extrabold tracking-tight">Register</h2>
      <div className="w-[672px] h-[669px] rounded-3xl border-[12px] border-gray-400/40 bg-white/20 backdrop-blur-md p-8 mt-6">
        <form className="grid gap-6 grid-cols-2" onSubmit={handleSubmit}>
          {[
            { label: "Name", name: "name", type: "text" },
            { label: "Username", name: "username", type: "text" },
            { label: "Phone Number", name: "phone", type: "tel" },
            { label: "Email", name: "email", type: "email" },
            { label: "Password", name: "password", type: "password" },
            { label: "Confirm Password", name: "cnfrm_password", type: "password" },
          ].map(({ label, name, type }) => (
            <div key={name} className="flex flex-col">
              <label className="text-lg font-semibold" htmlFor={name}>{label}</label>
              <input
                type={type}
                id={name}
                name={name}
                placeholder={`Enter your ${label.toLowerCase()}`}
                className="w-full p-3 mt-2 rounded-xl bg-gray-800 border border-gray-600 text-white"
                value={formData[name]}
                onChange={handleChange}
              />
            </div>
          ))}
          <div className="col-span-2 flex justify-center">
            <button type="submit" className="px-6 py-3 bg-gray-800 text-green-300 font-semibold rounded-2xl border-2 border-green-300">
              Register
            </button>
          </div>
        </form>
        <p className="mt-4 text-center">
          Already a user? <Link href="/login" className="text-green-300">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
