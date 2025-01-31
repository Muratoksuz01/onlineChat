import React, { useContext, useState, useEffect, useRef } from 'react';
import { AuthContext } from "../helper/AuthContex";
import { useNavigate } from "react-router-dom";
import { LuBellRing } from "react-icons/lu";
import { MdGroup } from "react-icons/md";
import { IoChatboxOutline } from "react-icons/io5";
import { FaCircleCheck } from "react-icons/fa6";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { FiSearch } from "react-icons/fi";
import { WebSocketContext } from '../helper/WebsocketContext';
import { IoSettingsOutline } from "react-icons/io5"; // Import ekleyin
import { IoCloseCircle } from "react-icons/io5"; // X ikonu için import ekleyin
import axios from 'axios';

function Sidebar({ onSelectChat, onOpenSettings,onOpenNewPanel,AllChatList,setAllChatList }) {

    const navigate = useNavigate();
    const [activeChat, setActiveChat] = useState(null);  // Store active chat id
    const {disconnect}=useContext(WebSocketContext)
    const { authState, setAuthState } = useContext(AuthContext);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0, chatId: null });

    const handleLogout = () => {
        setAuthState({ username: "", id: 0, status: false });
        localStorage.removeItem("accessToken");
        disconnect()
        navigate("/login");
    };

    const handleSelectChat = (chat) => {
        setActiveChat(chat.id); // Set active chat id when a chat is selected
        onSelectChat(chat); // Parent informs about the selected chat
       
    };

   useEffect(()=>{
    console.log(AllChatList)
   })
      

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Filtrelenmiş sohbetleri hesapla
    const filteredChats = (AllChatList && Array.isArray(AllChatList) ? AllChatList.filter(chat => 
        chat.username.toLowerCase().includes(searchTerm.toLowerCase())
    ) : []) || [];

    // Highlight fonksiyonu
    const highlightText = (text, highlight) => {
        if (!highlight.trim()) {
            return <span>{text}</span>;
        }
        
        const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
        
        return (
            <span>
                {parts.map((part, index) => 
                    part.toLowerCase() === highlight.toLowerCase() ? (
                        <span key={index} className="text-green-600">
                            {part}
                        </span>
                    ) : (
                        <span key={index}>{part}</span>
                    )
                )}
            </span>
        );
    };

    // Context menu'yü kapatmak için click-outside handler
    useEffect(() => {
        const handleClick = () => setContextMenu({ visible: false, x: 0, y: 0, chatId: null });
        document.addEventListener('click', handleClick);
        return () => document.removeEventListener('click', handleClick);
    }, []);

    // Sağ tık menüsünü göster
    const handleContextMenu = (e, chatId) => {
        e.preventDefault();
        setContextMenu({
            visible: true,
            x: e.pageX,
            y: e.pageY,
            chatId
        });
    };

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
                        <div ref={dropdownRef} className="relative">
                            <div
                                className="rounded-full bg-gray-700 flex items-center justify-center cursor-pointer hover:bg-gray-600 transition-colors"
                                style={{
                                    width: "40px",
                                    height: "40px",
                                }}
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                            >
                                <HiOutlineDotsVertical size={25} />
                            </div>
                            {dropdownOpen && (
                                <div className="absolute right-0 z-50 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg border border-gray-700">
                                    <ul className="py-2">
                                        <li
                                            className="px-4 py-2 hover:bg-gray-700 cursor-pointer flex items-center gap-2"
                                            onClick={() => {
                                                console.log('Yeni grup oluştur tıklandı');
                                                onOpenNewPanel("NewGroup")
                                                setDropdownOpen(false);
                                            }}
                                        >
                                            <span>🔰 Yeni Grup</span>
                                        </li>
                                        <li
                                            className="px-4 py-2 hover:bg-gray-700 cursor-pointer flex items-center gap-2"
                                            onClick={() => {
                                                console.log('Arkadaş ekle tıklandı');
                                                onOpenNewPanel("NewChat")
                                                setDropdownOpen(false);
                                            }}
                                        >
                                            <span>👥 Arkadaş Ekle</span>
                                        </li>
                                    </ul>
                                </div>
                            )}
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
                                className="block w-full p-2 ps-10 pe-10 text-sm rounded-lg 
                                    dark:bg-gray-900 outline-none"
                                placeholder="Search by name"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            {searchTerm && (
                                <button
                                    className="absolute inset-y-0 end-0 flex items-center pe-3 cursor-pointer hover:opacity-80 transition-opacity"
                                    onClick={() => setSearchTerm("")}
                                >
                                    <IoCloseCircle 
                                        size={20} 
                                        className="text-gray-400 hover:text-gray-300"
                                    />
                                </button>
                            )}
                        </div>
                    </div>
                </div>
                <div className="mt-3 flex justify-between">
                    <div 
                        className="cursor-pointer group flex flex-col items-center"
                        style={{ color: "#696463" }}
                    >
                        <IoChatboxOutline 
                            className="mx-auto transform transition-all duration-200 group-hover:scale-110 group-hover:text-[#db4f10]" 
                            size={25} 
                        />
                        <p className="transition-colors duration-200 group-hover:text-[#db4f10]">Chats</p>
                    </div>
                    <div 
                        className="cursor-pointer group flex flex-col items-center"
                        style={{ color: "#696463" }}
                    >
                        <MdGroup 
                            className="mx-auto transform transition-all duration-200 group-hover:scale-110 group-hover:text-[#db4f10]" 
                            size={25} 
                        />
                        <p className="transition-colors duration-200 group-hover:text-[#db4f10]">Groups</p>
                    </div>
                    <div 
                        className="cursor-pointer group flex flex-col items-center"
                        style={{ color: "#696463" }}
                    >
                        <LuBellRing 
                            className="mx-auto transform transition-all duration-200 group-hover:scale-110 group-hover:text-[#db4f10]" 
                            size={25} 
                        />
                        <p className="transition-colors duration-200 group-hover:text-[#db4f10]">Notification</p>
                    </div>
                </div>
                <hr className="mt-3" />
            </div>

            {/* Chat List */}
            <ul className="flex-1 overflow-y-auto custom-scrollbar">
                {filteredChats.map((chat) => (
                    <li
                        key={chat.id}
                        onClick={() => handleSelectChat(chat)}
                        onContextMenu={(e) => handleContextMenu(e, chat.id)}
                        className={`flex px-4 py-2 cursor-pointer hover:bg-gray-700 ${activeChat === chat.id ? 'bg-gray-600 border-l-4 border-blue-500' : ''}`}
                    >
                        <img
                            className="w-10 h-10 rounded-full"
                            src={`http://localhost:8000${chat.avatar}`}
                            alt=""
                        />
                        <div className="ms-3 flex flex-col">
                            <h3 className="font-semibold">
                                {highlightText(chat.username, searchTerm)}
                            </h3>
                            <p className='text-gray-400'>last message</p>
                        </div>
                        <div className="flex ms-auto flex-col text-gray-400">
                            <h3 className="font-semibold">10 AM</h3>
                            <FaCircleCheck className="ms-auto" size={15} />
                        </div>
                    </li>
                ))}
            </ul>

            {/* Context Menu */}
            {contextMenu.visible && (
                <div 
                    className="fixed bg-gray-800 border border-gray-700 rounded-lg shadow-lg py-2 w-48 z-50"
                    style={{ 
                        top: `${contextMenu.y}px`, 
                        left: `${contextMenu.x}px` 
                    }}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div 
                        className="px-4 py-2 hover:bg-gray-700 cursor-pointer flex items-center gap-2"
                        onClick={() => {
                            console.log(`Kullanıcı silindi: ${contextMenu.chatId}`);
                            setContextMenu({ visible: false, x: 0, y: 0, chatId: null });
                        }}
                    >
                        <span>🗑️ Kullanıcıyı Sil</span>
                    </div>
                    <div 
                        className="px-4 py-2 hover:bg-gray-700 cursor-pointer flex items-center gap-2"
                        onClick={() => {
                            console.log(`Sohbet arşivlendi: ${contextMenu.chatId}`);
                            setContextMenu({ visible: false, x: 0, y: 0, chatId: null });
                        }}
                    >
                        <span>📦 Arşive Al</span>
                    </div>
                    <div 
                        className="px-4 py-2 hover:bg-gray-700 cursor-pointer flex items-center gap-2"
                        onClick={() => {
                            console.log(`Sohbet sessize alındı: ${contextMenu.chatId}`);
                            setContextMenu({ visible: false, x: 0, y: 0, chatId: null });
                        }}
                    >
                        <span>🔕 Sessize Al</span>
                    </div>
                    <div 
                        className="px-4 py-2 hover:bg-gray-700 cursor-pointer flex items-center gap-2"
                        onClick={() => {
                            console.log(`Mesajlar temizlendi: ${contextMenu.chatId}`);
                            setContextMenu({ visible: false, x: 0, y: 0, chatId: null });
                        }}
                    >
                        <span>🧹 Clear Messages</span>
                    </div>
                </div>
            )}

            {/* Footer */}
            <div className="px-4 py-3 bg-gray-950 flex items-center justify-between">
                <button
                    onClick={handleLogout}
                    className="text-red-500 hover:text-red-700"
                >
                    Logout
                </button>
                <button
                    onClick={onOpenSettings}
                    className="text-green-500 hover:text-green-700"
                    title="Settings"
                >
                    <IoSettingsOutline size={20} />
                </button>
            </div>
        </div>
    );
}

export default Sidebar;
