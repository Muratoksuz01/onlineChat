import { createContext, useEffect, useRef, useState, useContext } from "react";

// Context oluşturma
export const WebSocketContext = createContext();

// Provider bileşeni
export const WebSocketProvider = ({ children }) => {
  const [message, setMessage] = useState(); // Gelen mesajları tutmak için
  const [isConnected, setIsConnected] = useState(false); // Bağlantı durumu
  const ws = useRef(null);

  // WebSocket bağlantısını başlatmak için yeni bir fonksiyon
  const connectWebSocket = (userId) => {
    if (ws.current) {
      ws.current.close();
    }

    const socket = new WebSocket(`ws://localhost:8000?ReceiverUserId=${userId}`);

    socket.onopen = () => setIsConnected(true);
    socket.onclose = () => setIsConnected(false);
    
   // ... existing code ...

socket.onmessage = (event) => {
  console.log("WebSocketContext onmessage event: ", event);
  try {
    const data = JSON.parse(event.data);

    switch(data.type) {
      case 'NEW_MESSAGE':
        console.log("Yeni mesaj alındı:", data.data);
        setMessage(data.data);
        break;
      
      case 'WELCOME':
        console.log("Hoşgeldin mesajı alındı:", data);
        // Hoşgeldin mesajı işlemleri
        break;
      
      case 'USER_LIST':
        console.log("Kullanıcı listesi güncellendi:", data);
        // Kullanıcı listesi işlemleri
        break;

      default:
        console.log("Bilinmeyen mesaj tipi:", data);
    }
  } catch (error) {
    console.error("WebSocket mesaj işleme hatası:", error);
    console.error("Ham veri:", event.data);
  }
};

// ... existing code ...
    socket.onerror = (error) => {
      console.error("WebSocket hatası:", error);
    };
    ws.current = socket;

    return () => {
      socket.close(); 
    };
  };

  // Mesaj gönderme fonksiyonu
  const sendMessage = (message) => {
    console.log("Mesaj gönderiliyor:", message);
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      try {
        ws.current.send(JSON.stringify(message));
      } catch (error) {
        console.error("Mesaj gönderme hatası:", error);
      }
    } else {
      console.error("WebSocket bağlantısı açık değil");
    }
  };

  const disconnect = () => {
    if (ws.current) {
      ws.current.close();
      ws.current = null;
    }
  };

  return (
    <WebSocketContext.Provider 
      value={{ 
        message, 
        sendMessage, 
        isConnected, 
        connectWebSocket,
        disconnect 
      }}
    >
      {children}
    </WebSocketContext.Provider>
  );
};

// WebSocket kullanımı için bir hook
export const useWebSocket = () => useContext(WebSocketContext);
