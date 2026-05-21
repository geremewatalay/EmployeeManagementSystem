import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

// Create Context
const UserContext = createContext();

// Provider Component
const AuthContext = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const token = localStorage.getItem("token");

        if (token) {
          const response = await axios.get(
            "http://localhost:5000/api/auth/verify",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (response.data.success) {
            setUser(response.data.user);
          } else {
            setUser(null);
            setLoading(false);
          }
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error(error);

        if (error.response && error.response.data.error) {
          setUser(null);
        }
      } finally {
        setLoading(false);
      }
    };

    verifyUser();
  }, []);

  // Login function
  const login = (userData) => {
    setUser(userData);
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    // navigate("/login");
  };

  return (
    <UserContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom Hook
export const useAuth = () => useContext(UserContext);

export default AuthContext;