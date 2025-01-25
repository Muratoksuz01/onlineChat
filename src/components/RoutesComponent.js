// src/components/RoutesComponent.js
import React,{useContext} from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import Register from "../pages/Register";
import { AuthContext } from "../helper/AuthContex"; // AuthContext'i import et
import PageNotFound from "../pages/PageNotFound";

const RoutesComponent = () => {
    const { authState } = useContext(AuthContext);
  return (
    <Routes>
      {/* Giriş yapmış kullanıcıyı Dashboard sayfasına yönlendir */}
      <Route
        path="/"
        element={authState.status ? <Navigate to="/dashboard" /> : <Navigate to="/login" />}
      />
      <Route
        path="/dashboard"
        element={authState.status ? <Dashboard /> : <Navigate to="/login" />}
      />
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
  );
};

export default RoutesComponent;
