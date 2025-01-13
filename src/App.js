import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ChatApp from "./pages/ChatApp";
import PageNotFound from "./pages/PageNotFound";
import { AuthContext } from "./helper/AuthContex";
import axios from "axios";

function App() {
  const [authState, setAuthState] = useState({
  
  });

  useEffect(() => {
    // Async function tanımlıyoruz
    const checkAuth = async () => {
      console.log("client side app.js file useEffect çalıştı!");
      const Token = localStorage.getItem("accessToken");

      if (Token) {
        try {
          const response = await axios.get("http://localhost:8000/api/users/auth", {
            headers: {
              accessToken: Token,
            },
          });

          console.log("app post cevap :", response.data);
          if (response.data.error) {
            setAuthState({ username: "", id: null, status: false });
          } else {
            setAuthState({
              username: response.data.username,
              id: response.data.id,
              status: true,
            });
          }
        } catch (error) {
          console.error("Error verifying token:", error);
          setAuthState({ username: "", id: null, status: false });
        }
      } else {
        console.log("Token yok");
        setAuthState({
          username: "",
          id: null,
          status: false,
        });
      }
    };

    // Async fonksiyonu çalıştırıyoruz
    checkAuth();
  }, []);  
  
  return (
    <AuthContext.Provider value={{ authState, setAuthState }}>
      <Router>
        {!authState.username && <Navbar />}
        <div className="min-h-screen bg-gray-100 ">
          <Routes>
            <Route path="/" exect element={<ChatApp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
