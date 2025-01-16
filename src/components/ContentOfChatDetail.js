import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from "../helper/AuthContex";

function ContentOfChatDetail({ chat }) {
  const { authState } = useContext(AuthContext);

  // Mesajları saklamak için state
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Veritabanındaki mesajları almak için axios isteği
    const fetchMessages = () => {
      // Burada endpoint'inizi yazmanız gerekecek
      axios
        .get(`http://localhost:8000/api/users/GetAllMessages?receiverId=${chat.id}`, {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        })
        .then(response => {
          if (response.data.success) {
            setMessages(response.data.message);
            console.log("getallmessages başarılı", response.data.message);
          } else {
            console.log("Mesaj yok.");
          }
        })
        .catch(error => {
          console.error("Mesajlar alınırken bir hata oluştu: ", error);
        });
    };

    fetchMessages();
  }, [chat.id]); // component mount olduğunda bir kez çalışacak

  return (
    <>
      <div style={{ height: "500px" }} className=' flex flex-col overflow-y-auto custom-scrollbar'>
        {/* Mesajları render et */}
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex items-start gap-3 p-2 rounded-lg max-w-sm ${message.ReceiverId === chat.id ? 'flex-row-reverse ms-auto' : ''
              }`} // Göndericiye göre konumlandırma
          >
            <img
              src={`http://localhost:8000${message.ReceiverId === chat.id ? authState.avatar : chat.avatar}`}
              alt="User Avatar"
              className={`w-10 h-10 rounded-full ${message.SenderId === chat.id ? '' : 'order-first'
                }`} // Avatar sağda ya da solda
            />
            <div className="flex flex-col">
              <div
                className={`px-4 py-2  rounded-2xl ${message.SenderId === chat.id ? 'bg-red-500 text-white' : 'bg-gray-700 text-white'
                  }`}
              >
                {message.message}
              </div>
              <span className="text-gray-400 text-xs mt-1">{message.timestamp}</span>
            </div>
          </div>
        ))}



      </div>
      <hr className="my-3" />
    </>
  );
}

export default ContentOfChatDetail;
