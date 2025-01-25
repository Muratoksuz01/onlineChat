// src/helper/AuthContex.js
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

// AuthContext oluşturuyoruz
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    username: "",
    avatar: "",
    phone: "",
    id: null,
    status: false,
  });

  useEffect(() => {
    const Token = localStorage.getItem("accessToken");

    if (Token) {
      axios
        .get("http://localhost:8000/api/users/auth", {
          headers: {
            accessToken: Token,
          },
        })
        .then((response) => {
          if (response.data.error) {
            setAuthState({
              username: "",
              id: null,
              avatar: null,
              phone: null,
              status: false,
            });
          } else {
            setAuthState({
              username: response.data.username,
              id: response.data.id,
              avatar: response.data.avatar,
              phone: response.data.phone,
              status: true,
            });
          }
        })
        .catch((error) => {
          console.error("Error verifying token:", error);
          setAuthState({ username: "", id: null, status: false });
        });
    } else {
      setAuthState({
        username: "",
        id: null,
        status: false,
      });
    }
  }, []); // Boş bağımlılıklar listesi ile sadece ilk renderda çalışır

  return (
    <AuthContext.Provider value={{ authState, setAuthState }}>
      {children}
    </AuthContext.Provider>
  );
};
