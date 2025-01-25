import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from "../helper/AuthContex";
import { useNavigate } from "react-router-dom";
import { LuBellRing } from "react-icons/lu";
import { MdGroup } from "react-icons/md";
import { IoChatboxOutline } from "react-icons/io5";
import { FaCircleCheck } from "react-icons/fa6";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { FiSearch } from "react-icons/fi";
import { useWebSocket } from '../helper/WebsocketContext';

import axios from 'axios';

function Sidebar({ onSelectChat, onOpenSettings }) {
    const { isConnected, disconnect, connectWebSocket } = useWebSocket();

    const navigate = useNavigate();
    const [activeChat, setActiveChat] = useState(null);  // Store active chat id

    const { authState, setAuthState } = useContext(AuthContext);
    const [AllChats, setAllChats] = useState([]);
    const handleLogout = () => {
        setAuthState({ username: "", id: 0, status: false });
        localStorage.removeItem("accessToken");
        navigate("/login");
    };

    const handleSelectChat = (chat) => {
        setActiveChat(chat.id); // Set active chat id when a chat is selected
        onSelectChat(chat); // Parent informs about the selected chat
        if (isConnected) {
            console.log("suanda bir websoket baglantısı var")
            disconnect()
            console.log("suanda var olan baglantı kapatıldı ")
            connectWebSocket(chat.id)
        } else {
            connectWebSocket(chat.id)
        }
    };

    useEffect(() => {
        axios.get("http://localhost:8000/api/users/GetAllChat")
            .then(res => {
                console.log("sidebar useeffect allData:", res.data.alluser);
                setAllChats(res.data.alluser);
            })
            .catch(err => {
                console.error("Axios Error:", err.message);
            });
    }, []);

    return (
        <div className="w-64 bg-gray-800 text-white flex flex-col overflow-hidden rounded-xl">
            {/* Header */}
            <div className="flex flex-col p-3">
                <div className="flex items-center gap-4">
                    <img
                        className="w-10 h-10 rounded-full"
                        src={`http://localhost:8000${authState.avatar}`}
                        alt=""
                    />
                    <div className="font-medium dark:text-white">
                        <div>{authState.username}</div>
                    </div>
                    <div className="ms-auto me-2">
                        <div
                            className="rounded-full bg-gray-700 flex items-center justify-center"
                            style={{
                                width: "40px",
                                height: "40px",
                            }}
                        >
                            <HiOutlineDotsVertical size={25} />
                        </div>
                    </div>
                </div>
                <div>
                    <div className="max-w-md mx-auto mt-3 ">

                        <div className="relative">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <FiSearch style={{ color: "#696463" }} />
                            </div>
                            <input
                                type="search"
                                id="default-search"
                                className="block w-full p-2 ps-10 text-sm rounded-lg 
                                   dark:bg-gray-900 dark:border-gray-600 dark:placeholder-gray-400
                                 "
                                placeholder="Search by name"
                                required
                            />
                        </div>
                    </div>
                </div>
                <div className="mt-3 flex justify-between">
                    <div style={{ color: "#696463" }}>
                        <IoChatboxOutline className="mx-auto" size={25} />
                        <p>Chats</p>
                    </div>
                    <div style={{ color: "#696463" }}>
                        <MdGroup className="mx-auto" size={25} />
                        <p>Groups</p>
                    </div>
                    <div style={{ color: "#696463" }}>
                        <LuBellRing className="mx-auto" size={25} />
                        <p>Notification</p>
                    </div>
                </div>
                <hr className="mt-3" />
            </div>

            {/* Chat List */}
            <ul className="flex-1 overflow-y-auto custom-scrollbar">
                {AllChats.map((chat) => (
                    <li
                        key={chat.id}
                        onClick={() => handleSelectChat(chat)}
                        className={`flex px-4 py-2 cursor-pointer hover:bg-gray-700 ${activeChat === chat.id ? 'bg-gray-600 border-l-4 border-blue-500' : ''}`}
                    >
                        <img
                            className="w-10 h-10 rounded-full"
                            src={`http://localhost:8000${chat.avatar}`}
                            alt=""
                        />
                        <div className="ms-3 flex flex-col">
                            <h3 className="font-semibold">{chat.username}</h3>
                            <p className='text-gray-400'>last message</p>
                        </div>
                        <div className="flex ms-auto flex-col text-gray-400">
                            <h3 className="font-semibold">10 AM</h3>
                            <FaCircleCheck className="ms-auto" size={15} />
                        </div>
                    </li>
                ))}
            </ul>

            {/* Footer */}
            <div className="px-4 py-3 bg-gray-950 flex items-center justify-between">
                <button
                    onClick={handleLogout}
                    className="text-red-500 hover:text-red-700"
                >
                    Logout
                </button>
                <button
                    className="text-green-500 hover:text-green-700"
                    title="Settings"
                >
                    <i
                        onClick={onOpenSettings}
                        className="fa-solid fa-gear cursor-pointer"
                    ></i>
                </button>
            </div>
        </div>
    );
}

export default Sidebar;
