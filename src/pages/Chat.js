import React, { useContext } from "react";
import { AuthContext } from "../helper/AuthContex";
import Dashboard from "./Dashboard"; // Giriş yapılmış kullanıcı için bileşen
import Welcome from "./Welcome"; // Giriş yapılmamış kullanıcı için bileşen

function Chat() {
  const { authState } = useContext(AuthContext); // Kullanıcının oturum durumunu kontrol et

  // Giriş durumu kontrolü
  if (authState.status) {
    return <Dashboard />; // Giriş yapılmışsa Dashboard bileşenini render et
  } else {
    return <Welcome />; // Giriş yapılmamışsa Welcome bileşenini render et
  }
}

export default Chat;
