import React, { useState, useEffect } from "react";
import HeadersOfChatDatail from "./HeadersOfChatDatail"
import FooterOfChatDetail from "./FooterOfChatDetail"
import ContentOfChatDetail from "./ContentOfChatDetail"
const ChatDetail = ({ chatId }) => {
  //const [messages,setMessages] = useState([]);

  // useEffect(() => {
  //   // Veritabanından mesajları çekme (örnek API çağrısı)
  //   const fetchMessages = async () => {
  //     try {
  //       const response = await fetch(`/api/messages?chatId=${chatId}`);
  //       const data = await response.json();
  //       setMessages(data);
  //     } catch (error) {
  //       console.error("Error fetching messages:", error);
  //     }
  //   };

  //   fetchMessages();
  // }, [chatId]);

  return (
    <div className="flex flex-col min-h-full" style={{ padding: "20px" }}>
      <HeadersOfChatDatail />
      <ContentOfChatDetail />
      <FooterOfChatDetail />
    </div>
  );
};

export default ChatDetail;
