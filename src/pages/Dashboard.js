import React, { useContext, useState } from "react";
import { AuthContext } from "../helper/AuthContex";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const { authState, setAuthState } = useContext(AuthContext);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Sidebar'ın açık/kapalı durumu
  const navigate = useNavigate();

  const handleLogout = () => {
    setAuthState({ username: "", id: 0, status: false }); // Kullanıcıyı sıfırla
    navigate("/login"); // Login sayfasına yönlendir
  };

  const chats = [
    { id: 1, name: "John Doe", lastMessage: "Hey, how are you?" },
    { id: 2, name: "Jane Smith", lastMessage: "Let's catch up tomorrow." },
    { id: 3, name: "Mike Brown", lastMessage: "Did you see the news?" },
  ]; // Örnek chat listesi

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? "w-64" : "w-16"
        } bg-gray-800 text-white flex flex-col transition-all duration-300`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-gray-900">
          <h2 className={`${isSidebarOpen ? "block" : "hidden"} text-xl font-bold`}>
            Chats
          </h2>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-gray-400 hover:text-white"
          >
            {isSidebarOpen ? "<" : ">"}
          </button>
        </div>

        {/* Chat List */}
        <ul className="flex-1 overflow-y-auto">
          {chats.map((chat) => (
            <li
              key={chat.id}
              className="px-4 py-2 hover:bg-gray-700 cursor-pointer"
            >
              <h3 className="font-semibold">{chat.name}</h3>
              <p className="text-sm text-gray-400 truncate">
                {chat.lastMessage}
              </p>
            </li>
          ))}
        </ul>

        {/* Footer */}
        <div className="px-4 py-3 bg-gray-900 flex items-center justify-between">
          <button
            onClick={handleLogout}
            className="text-red-500 hover:text-red-700"
          >
            Logout
          </button>
          <button
            className="text-green-500 hover:text-green-700"
            title="New Chat"
          >
            +
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray-100 flex items-center justify-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-700">
            Welcome, {authState.username}!
          </h2>
          <p className="text-gray-600 mt-4">
            This is your dashboard. Start a chat by selecting a contact from the
            sidebar.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
