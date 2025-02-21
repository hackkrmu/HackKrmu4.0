// "use client";

// import React, { useState, useEffect } from "react";
// import LandingPage from "./Landing/LandingPage/page";
// import Dashboard1 from "./Landing/Dashboard1/page";
// import DashboardLog from "./Landing/DashboardLog/page";
// import Dashboard2 from "./Landing/Dashboard2/page";
// import Dashboard3 from "./Landing/Dashboard3/page";
// import Dashboard4 from "./Landing/Dashboard4/page";
// import Dashboard5 from "./Landing/Dashboard5/page";
// import Layout from "./layout";
// import PreFooter from "./PreFooter/page"
// import Footer from "./Footer/page"
// import { useRouter } from "next/navigation";
// import Cookies from "js-cookie"; // Import js-cookie
// const token = Cookies.get("token");





// const Page = () => {
//   // const isLoggedIn = false
//   const router = useRouter();
//   const [isLoggedIn, setIsLoggedIn] = useState(null); // Initial state is null for loading

//   useEffect(() => {
//     // Simulate fetching login status
//     const checkLoginStatus = async () => {
//       if(token){
//         setIsLoggedIn(true)
//       }
//       else
//       {
//         setIsLoggedIn(false);
//       }
//     };

//     checkLoginStatus();
//   }, []);

//   return (
//     <>
//       {/* <AuthProvider> */}
//       {isLoggedIn ? (
//         <Layout>
//           <DashboardLog />
//         </Layout>
//       ) : (
//         <div style={styles.container}>
//           <LandingPage />
//           <Dashboard1 />
//           <Dashboard2 />
//           <Dashboard3 />
//           <Dashboard4 />
//           <Dashboard5 />
//           <PreFooter />
//           <Footer/>
//         </div>
//       )}
//       {/* </AuthProvider> */}
//     </>
//   );
// };

// const styles = {
//   container: {
//     height: "100vh", 
//     // overflowY: "hidden", 
//   },
// };

// export default Page;



// "use client";

// import React, { useState, useEffect } from "react";
// import LandingPage from "./Landing/LandingPage/page";
// import Dashboard1 from "./Landing/Dashboard1/page";
// import DashboardLog from "./Landing/DashboardLog/page";
// import Dashboard2 from "./Landing/Dashboard2/page";
// import Dashboard3 from "./Landing/Dashboard3/page";
// import Dashboard4 from "./Landing/Dashboard4/page";
// import Dashboard5 from "./Landing/Dashboard5/page";
// import Layout from "./layout";
// import PreFooter from "./PreFooter/page";
// import Footer from "./Footer/page";
// import { useRouter } from "next/navigation";
// import Cookies from "js-cookie"; // Import js-cookie

// const Page = () => {
//   const router = useRouter();
//   const [isLoggedIn, setIsLoggedIn] = useState(null); // Initial state is null to avoid flickering

//   useEffect(() => {
//     // Ensure token is checked only after mounting
//     const checkLoginStatus = () => {
//       const token = Cookies.get("token"); // Get token inside useEffect
//       if (token) {
//         setIsLoggedIn(true);
//         router.replace("/Landing/DashboardLog"); // Ensures a full re-render of the page
//       } else {
//         setIsLoggedIn(false);
//       }
//     };

//     checkLoginStatus();
//   }, [router]); // Runs only when the router changes

//   if (isLoggedIn === null) return null; // Prevent rendering until authentication is checked

//   return (
//     <>
    
//       {isLoggedIn ? (
//         <Layout>
//             <script>console.log("wdhcbwhjdec")</script>
//             <DashboardLog/>
//         </Layout>
//       ) : (
//         <div style={styles.container}>
//           <LandingPage />
//           <Dashboard1 />
//           <Dashboard2 />
//           <Dashboard3 />
//           <Dashboard4 />
//           <Dashboard5 />
//           <PreFooter />
//           <Footer />
//         </div>
//       )}
//     </>
//   );
// };

// const styles = {
//   container: {
//     height: "100vh",
//   },
// };

// export default Page;


"use client";

import React, { useState, useEffect } from "react";
import LandingPage from "./Landing/LandingPage/page";
import Dashboard1 from "./Landing/Dashboard1/page";
import DashboardLog from "./Landing/DashboardLog/page";
import Dashboard2 from "./Landing/Dashboard2/page";
import Dashboard3 from "./Landing/Dashboard3/page";
import Dashboard4 from "./Landing/Dashboard4/page";
import Dashboard5 from "./Landing/Dashboard5/page";
import Layout from "./layout";
import PreFooter from "./PreFooter/page";
import Footer from "./Footer/page";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie"; // Import js-cookie
import FaceScan from "./FaceScan/page";

const Page = () => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(null); // Initial state is null to avoid flickering

  useEffect(() => {
    // Ensure token is checked only after mounting
    const checkLoginStatus = () => {
      const token = Cookies.get("token"); // Get token inside useEffect
      if (token) {
        setIsLoggedIn(true);
        // router.replace("/Landing/DashboardLog"); // Ensures a full re-render of the page
        console.log("User is logged in, redirecting to DashboardLog");
      } else {
        setIsLoggedIn(false);
      }
    };

    checkLoginStatus();
  }, [router]); // Runs only when the router changes

  if (isLoggedIn === null) return null; // Prevent rendering until authentication is checked

  return (
    <>
      {isLoggedIn ? (
        <Layout>
          <DashboardLog />
          {/* <FaceScan /> */}
        </Layout>
      ) : (
        <div style={styles.container}>
          <LandingPage />
          <Dashboard1 />
          <Dashboard2 />
          <Dashboard3 />
          <Dashboard4 />
          <Dashboard5 />
          <PreFooter />
          <Footer />
        </div>
      )}
    </>
  );
};

const styles = {
  container: {
    height: "100vh",
  },
};

export default Page;
