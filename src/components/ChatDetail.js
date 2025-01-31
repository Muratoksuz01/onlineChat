import React, {useEffect,useContext,useState } from "react";
import HeadersOfChatDatail from "./HeadersOfChatDatail"
import FooterOfChatDetail from "./FooterOfChatDetail"
import ContentOfChatDetail from "./ContentOfChatDetail"
import { useWebSocket } from '../helper/WebsocketContext';
import { AuthContext } from "../helper/AuthContex";
import axios from "axios";

const ChatDetail = ({ chat }) => {
  const { authState } = useContext(AuthContext);

  const { connectWebSocket, disconnect,message } = useWebSocket();
  const [messages, setMessages] = useState([]);

   useEffect(() => { // tıklanan chatin tum mesajları
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
          console.log("response.data", response.data)
          setMessages(response.data);
        } catch (error) {
          console.error("Mesajları getirirken hata:", error);
        }
      };
  
      if (chat?.id) {
        fetchMessages();
      }
    }, [chat]);




  useEffect(() => {
    console.log("Gelen Mesaj:", message);  // Mesajı kontrol et
    console.log("Açık Sohbet ID'si:", chat?.id);  // Chat ID'sini kontrol et
  
    // Eğer gelen mesaj varsa ve alıcı ID'si ile chat.id eşleşiyorsa
    if (message && chat?.id && message.SenderId === chat.id) {
      console.log("if ici")
      console.log("WebSocket'ten gelen mesaj:", message);
  
      setMessages(prevMessages => [...prevMessages, message]);
    }
  }, [message, chat?.id]); // `message` ve `chat.id` değiştiğinde tetiklenir
  

  return (
    <div className="flex flex-col " style={{ padding: "20px" }}>
      <HeadersOfChatDatail  chat={chat} />
      <ContentOfChatDetail className={"grow"} messages={messages} setMessages={setMessages} chat={chat} />
      <FooterOfChatDetail className={"flex-none"} messages={messages} setMessages={setMessages} chat={chat}/>
    </div>
  );
};

export default ChatDetail;
