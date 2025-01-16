import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"; // Navigate importu
import Navbar from "./components/navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PageNotFound from "./pages/PageNotFound";
import { AuthContext } from "./helper/AuthContex";
import axios from "axios";

import Dashboard from "./pages/Dashboard"; // Giriş yapılmış kullanıcı için bileşen

function App() {
  const webSocket = new WebSocket('ws://localhost:443/');
  const [authState, setAuthState] = useState({
    username: "",
    avatar:"",
    phone:"",
    id: null,
    status: false,
  }); // Kullanıcının oturum durumunu kontrol et

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

          console.log("app.js post cevap :", response.data);
          if (response.data.error) {
            setAuthState({ username: "",
               id: null,
               avatar:null,
               phone:null, 
               status: false

              });
          } else {
            setAuthState({
              username: response.data.username,
              id: response.data.id,
              avatar:response.data.avatar,
              phone:response.data.phone,
              status: true,
            });
          }
        } catch (error) {
          console.error("Error verifying token:", error);
          setAuthState({ username: "", id: null, status: false });
        }
      } else {
        console.log(" app js Token yok");
        setAuthState({
          username: "",
          id: null,
          status: false,
        });
      }
    };

    // Async fonksiyonu çalıştırıyoruz
    checkAuth();
  }, []); // `setAuthState`'i bağımlılıklar listesine eklemedik çünkü fonksiyon sürekli olarak güncelleniyor

  return (
    <AuthContext.Provider value={{ authState, setAuthState }}>
      <Router>
        {/* Navbar yalnızca giriş yapılmamışsa görünür */}
        {!authState.status && <Navbar />}
          <Routes>
            {/* Giriş yapmış kullanıcıyı Dashboard sayfasına yönlendir */}
            <Route
              path="/"
              element={authState.status ? <Navigate to="/dashboard"/> : <Navigate to="/login"/>}
            />
            <Route
              path="/dashboard"
              element={authState.status ? <Dashboard/> : <Navigate to="/login"/>}            />

            {/* Eğer kullanıcı giriş yapmışsa Login ve Register sayfalarına gitmesi engellenmeli */}
            <Route
              path="/login"
              element={authState.status ? <Navigate to="/" /> : <Login />}
            />
            <Route
              path="/register"
              element={authState.status ? <Navigate to="/" /> : <Register />}
            />

            {/* 404 Sayfası */}
            <Route path="*" element={<PageNotFound />} />
          </Routes>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
