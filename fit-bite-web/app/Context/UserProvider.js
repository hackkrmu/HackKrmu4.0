"use client";
import React, { useCallback, useEffect, useState } from "react";
var jwt = require("jsonwebtoken");
const UserContext = React.createContext({
  loggedIn: true,
  setLoggedIn: ()=>{},
  adminloggedIn: true,
  setAdminLoggedIn: ()=>{},
  admin: null,
  user: null,
  contextLoading: true,
  userData: "",
  setCountAgain: () => {},
  cartData: 0,
  // cart: null,
  login: () => {},
  logout: () => {},
  adminlogin: () => {},
  adminlogout: () => {},
});
const UserProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(true);
  const [adminloggedIn, setAdminLoggedIn] = useState(false);
  const [contextLoading, setContextLoading] = useState(true);
  const [user, setUser] = useState({ value: null });
  const [admin, setAdmin] = useState({ value: null });
  const [userData, setUserData] = useState({});
  const [countAgain, setCountAgain] = useState(0);
  const [cartData, setcartData] = useState(0);




  const getUser = useCallback(async(token)=> {
    // if (loggedIn) {
    if (token) {
      setUser({ value: token });
      try {
        let decodedToken = jwt.decode(token);
        // console.log("decoded token", decodedToken);
        return decodedToken;
      } catch (e) {
        console.log("token verification failed");
        setContextLoading(false);
      }
    } else {
     
      console.log("token not found");
      logout()
      setContextLoading(false);
    }
  }, [])
  const loginUser = useCallback(async(decodedToken) =>  {
    try {
      if (decodedToken) {
        // console.log("token found", decodedToken.Email);
        const response = await fetch(
          `/api/login/?userEmail=${decodedToken.Email}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        let responseData = await response.json();
        // console.log("response data", responseData.result[0].Email);
        if (response.status === 200) {
          setUserData(responseData.result[0]);
          setLoggedIn(true);
          setContextLoading(false);
          // if (decodedToken.Email === responseData.result[0].Email) {
          //   console.log("User found with that token. Verified");
          //   setLoggedIn(true);
          //   // console.log("token found");
          //   setContextLoading(false);
          // }
        } else {
          console.log("User not found | Login Again");
          logout();
          
          setContextLoading(false);
        }
      }
    } catch (e) {
      console.log("Error", e.message);
    }
  },[])
  // async function verifyToken(decodedToken) {
  //   if (decodedToken) {
  //     if (decodedToken.Email) {
  //       console.log("Token seems to be correct");
  //       setLoggedIn(true);
  //       // console.log("token found");
  //       setContextLoading(false);
  //     } else {
  //       logout();
  //       setContextLoading(false);
  //     }
  //     if (decodedToken.Email === userEmail) {
  //       console.log("token verified successfully");
  //       setLoggedIn(true);
  //       // console.log("token found");
  //       setContextLoading(false);
  //     } else {
  //       // If no token in local storage, set loggedIn to false
  //       console.log("Will implement verification feature in the future");
  //       setLoggedIn(true);
  //       setContextLoading(false);
  //     }
  //   }
  // }
//   const stableLoginUser = useCallback(loginUser, []);
// const stableGetUser = useCallback(getUser, []);
  useEffect(() => {
    if (window !== undefined) {
      const token = localStorage.getItem("token");

      const adminToken = localStorage.getItem("adminToken") || null;

      // console.log({ adminToken });
      if (adminToken) {
        setAdmin({ value: adminToken });
        // console.log("admin logged in");
        setAdminLoggedIn(true);
        setContextLoading(false);
      } else {
        // console.log("No admin Token found");
        setAdminLoggedIn(false);
        setContextLoading(false);
      }
      getUser(token, adminToken).then((user) => {
        loginUser(user);
      });
    }
  }, [loggedIn, adminloggedIn, loginUser, getUser]);
  useEffect(() => {
    // console.log("cart")
    let keys = Object.keys(JSON.parse(localStorage.getItem("cart")) || {});
    if (keys.length > 0) {
      setcartData(
        Object.values(JSON.parse(localStorage.getItem("cart"))).reduce(
          (acc, item) => acc + item.qty,
          0
        )
      );
    }
    //  let cartDataLength = keys.length;
    //  console.log({cartDataLength});
    //  setcartData(cartDataLength);
  }, [countAgain]);

  const login = useCallback(() => {
    if (user.value) {
      setLoggedIn(true);
      // console.log("Token exists, user logged in");
    }
  },[user.value]);
  const adminlogin = () => {
    if (admin.value != null) {
      setAdminLoggedIn(true);
      // console.log("Admin Token exists, Admin logged in");
    } else {
      adminlogout();
    }
  };

  const adminlogout = () => {
    setAdminLoggedIn(false);
    localStorage.removeItem("adminToken");
  };
  const logout = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
  };

  return (
    <UserContext.Provider
      value={{
        loggedIn,
        setLoggedIn,
        login,
        logout,
        user,
        contextLoading,
        userData,
        adminloggedIn,
        setAdminLoggedIn,
        adminlogin,
        adminlogout,
        admin,
        setCountAgain,
        cartData,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
export { UserContext, UserProvider };
