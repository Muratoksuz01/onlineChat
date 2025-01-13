import React, { useState } from "react";

import Sidebar from "../components/Sidebar";
import ChatDetail from "../components/ChatDetail";
import Settings from "../components/Settings";
function Dashboard() {
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [activeComponent, setActiveComponent] = useState(null);

  const renderContent = () => {
    if (activeComponent === "chat" && selectedChatId) {
      return <ChatDetail chatId={selectedChatId} />;
    } else if (activeComponent === "settings") {
      return <Settings />;
    }
    return <p>Select a chat or open settings</p>;
  };


  return (
    <div className="flex h-screen p-4 bg-gray-950">
      {/* Sidebar */}
      <Sidebar
       onSelectChat={(id) => {
        setSelectedChatId(id)
        setActiveComponent("chat");
        }}
        onOpenSettings={() => setActiveComponent("settings")}
        />

      {/* Main Content */}
      <div className="flex-1 ms-3  bg-gray-800 rounded-xl ">
       
        {renderContent()}
       


        
      </div>
    </div>

  );
}

export default Dashboard;
