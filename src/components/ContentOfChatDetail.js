import React, { useEffect, useState,useContext} from "react";
import { useWebSocket } from "../helper/WebsocketContext";
import { AuthContext } from "../helper/AuthContex";
import axios from 'axios';

function ContentOfChatDetail({ chat }) {
  const [messages, setMessages] = useState([]);
  const { message } = useWebSocket(); // ws yerine message kullanıyoruz
const {authState} = useContext(AuthContext)
  // Mevcut mesajları getir
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/users/GetAllMessages`, {
          params: {
            receiverId: chat.id
          },
          headers: {
            'accessToken': `${localStorage.getItem('accessToken')}`
          }
        });
        console.log("response.data",response.data)
        setMessages(response.data);
      } catch (error) {
        console.error("Mesajları getirirken hata:", error);
      }
    };

    if (chat?.id) {
      fetchMessages();
    }
  }, [chat]);

  
  
  //ket mesajlarını dinle
  useEffect(() => {
    console.log(" ws gelen message",message)
    if (!message) return;
    setMessages(prevMessages => [...prevMessages,message]);
    
  }, [message]); // dependency'i message olarak güncelliyoruz


  return (
    <div style={{ height: "500px" }} className="flex flex-col overflow-y-auto custom-scrollbar">
      {messages.map((message, index) => (
        <div
          key={index}
          className={`flex items-start gap-3 p-2 rounded-lg max-w-sm ${message.ReceiverId === chat.id ? 'flex-row-reverse ms-auto' : ''}`}
        >
          <img
            src={`http://localhost:8000${message.ReceiverId === chat.id ? authState.avatar : chat.avatar}`}
            alt="User Avatar"
            className="w-10 h-10 rounded-full"
          />
          <div className="flex flex-col">
            <div
              className={`px-4 py-2 rounded-2xl ${message.SenderId === chat.id ? 'bg-red-500 text-white' : 'bg-gray-700 text-white'}`}
            >
              {message.message}
            </div>
            <span className="text-gray-400 text-xs mt-1">{message.timestamp}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ContentOfChatDetail;
