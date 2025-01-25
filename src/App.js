// src/App.js
import React, { useContext } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/navbar";
import { AuthProvider, AuthContext } from "./helper/AuthContex"; // AuthContext'i burada import et
import { WebSocketProvider } from "./helper/WebsocketContext";
import RoutesComponent from "./components/RoutesComponent"; // Yeni bileşeni import et

function App() {
  return (
    <AuthProvider> {/* AuthContext.Provider'ı buraya taşıdık */}
      <WebSocketProvider>
        <Router>
          <AuthContent /> {/* AuthContent içinde authState'e erişiyoruz */}
        </Router>
      </WebSocketProvider>
    </AuthProvider>
  );
}

function AuthContent() {
  const { authState } = useContext(AuthContext); // AuthContext burada kullanılabilir

  return (
    <>
      {!authState.username && <Navbar />}
      <RoutesComponent />
    </>
  );
}

export default App;
