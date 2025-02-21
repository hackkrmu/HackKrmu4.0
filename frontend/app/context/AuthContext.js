// contexts/AuthContext.js
import { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

// Create the AuthContext
const AuthContext = createContext();

// AuthProvider component to wrap your app with authentication logic
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    const checkLoginStatus = () => {
      const token = Cookies.get("authToken");
      if (token) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    };
    checkLoginStatus();
  }, []);

  // Value to be passed to the context consumers
  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);
