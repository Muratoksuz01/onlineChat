import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Chat from "./pages/Chat";
import PageNotFound from "./pages/PageNotFound";
import {AuthContext} from "./helper/AuthContex"

function App() {
  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    status: false,
  });

  useEffect(() => {
    // Oturum kontrolü (örnek)
    const token = localStorage.getItem("accessToken");
    if (token) {
      // Backend'den kontrol yapılabilir
      setAuthState({ username: "User", id: 1, status: true });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ authState, setAuthState }}>
      <Router>
       {!authState.username &&<Navbar /> }  
        <div className="min-h-screen bg-gray-100 ">
          <Routes>
            <Route path="/" exect element={<Chat />} />
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
