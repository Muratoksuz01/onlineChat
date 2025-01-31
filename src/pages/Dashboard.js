import React, { useState ,useEffect} from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import ChatDetail from "../components/ChatDetail";
import Settings from "../components/Settings";
import NewChat from "../components/NewChat";
import NewGroup from "../components/NewGroup";
function Dashboard() {
  const [selectedChat, setSelectedChat] = useState(null);
  const [activeComponent, setActiveComponent] = useState(null);
  const [AllChatList, setAllChatList] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/api/users/GetFriendships", {
      headers: {
        'accessToken': `${localStorage.getItem('accessToken')}`
      }
    })
      .then(res => {
        console.log("dashboard useEffect allChats:", res.data);
        setAllChatList(res.data);
      })
      .catch(err => {
        console.error("Axios Error:", err.message);
      });
  }, []);



  const renderContent = () => {
    if (activeComponent === "chat" && selectedChat) {
      return <ChatDetail chat={selectedChat} />;
    } else if (activeComponent === "settings") {
      return <Settings />;
    }
    else if (activeComponent === "NewChat") {
      return <NewChat
      AllChatList={AllChatList}
      setAllChatList={setAllChatList}
      onSelectChat={(chat) => {
        setSelectedChat(chat)
        setActiveComponent("chat");
      }}
      />
    }
    else if (activeComponent === "NewGroup") {
      return <NewGroup />
    }
    return <p>Select a chat or open settings</p>;
  };


  return (
    <div className="flex h-screen p-4 bg-gray-900">
      {/* Sidebar */}
      <Sidebar
        AllChatList={AllChatList}
        setAllChatList={setAllChatList}
        onSelectChat={(chat) => {
          setSelectedChat(chat)
          setActiveComponent("chat");
        }}
        onOpenSettings={() => setActiveComponent("settings")}
        onOpenNewPanel={(field) => {
          console.log(field)
          field === "NewChat" ? setActiveComponent("NewChat") : setActiveComponent("NewGroup")
        }}
      />

      {/* Main Content */}
      <div className="flex-1 ms-3  bg-gray-800 rounded-xl ">

        {renderContent()}




      </div>
    </div>

  );
}

export default Dashboard;
