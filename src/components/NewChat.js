import axios from 'axios';
import React, { useState } from 'react';
import { FiSearch, FiMessageCircle, FiPlusCircle, FiInfo } from "react-icons/fi";

function NewChat({ AllChatList, setAllChatList, onSelectChat }) {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [countryCode, setCountryCode] = useState('+90');
    const [searchResults, setSearchResults] = useState(null); // Başlangıçta null olarak ayarlandı
    const [notFound, setNotFound] = useState(false); // Kullanıcı bulunamazsa true olacak

    // Arama işlemi
    const handleSearch = async () => {
        console.log(`Country Code: ${countryCode}, Phone Number: ${phoneNumber}`);
        const fullPhone = countryCode + phoneNumber;

        try {
            const res = await axios.post(
                "http://localhost:8000/api/users/GetUser",
                { phone: fullPhone },
                { headers: { 'accessToken': `${localStorage.getItem('accessToken')}` } }
            );

            console.log(res.data);

            if (res.data.success) {
                setSearchResults({
                    id: res.data.user.id,
                    username: res.data.user.username,
                    phone: res.data.user.phone,
                    avatar: res.data.user.avatar
                });
                setNotFound(false); // Kullanıcı bulundu
            } else {
                setSearchResults(null);
                setNotFound(true); // Kullanıcı bulunamadı
            }
        } catch (error) {
            console.error("Error searching user:", error);
            setSearchResults(null);
            setNotFound(true);
        }
    };

    // Yeni arkadaş ekleme
    const addNewFriend = async (friend_id) => {
        try {
            const response = await axios.post(
                "http://localhost:8000/api/users/AddFriend",
                { friend_id },
                { headers: { 'accessToken': `${localStorage.getItem('accessToken')}` } }
            );
            console.log("Friend added successfully", response.data);
            alert("Friend added successfully!");
        } catch (error) {
            console.error("Error adding friend", error);
            alert("There was an error adding the friend.");
        }
    };

    // Aranan kullanıcının zaten arkadaş olup olmadığını kontrol et
    const isAlreadyFriend = () => {
        return searchResults && AllChatList.some(chat => chat.id === searchResults.id);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-4">
            <div className="flex items-center bg-gray-800 rounded-xl p-4 w-full max-w-md mb-4">
                {/* Country Code Dropdown */}
                <select
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
                    className="bg-gray-700 text-white p-2 rounded-l-xl focus:outline-none"
                >
                    <option value="+90">+90</option>
                    <option value="+1">+1</option>
                    <option value="+44">+44</option>
                    <option value="+33">+33</option>
                </select>

                {/* Phone Number Input */}
                <input
                    type="text"
                    placeholder="Enter phone number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="flex-1 bg-gray-700 text-white p-2 focus:outline-none"
                />

                {/* Search Icon */}
                <button
                    onClick={handleSearch}
                    className="bg-gray-700 p-2 rounded-r-xl hover:bg-blue-700 focus:outline-none"
                >
                    <FiSearch color="white" size={20} />
                </button>
            </div>

            {/* Search Results */}
            <div className="w-full max-w-md space-y-4">
                {searchResults ? (
                    <div key={searchResults.id} className="flex items-center bg-gray-800 p-4 rounded-xl">
                        {/* Profile Picture */}
                        <img
                            src={"http://localhost:8000" + searchResults.avatar}
                            alt={searchResults.username}
                            className="w-10 h-10 rounded-full mr-4"
                        />
                        {/* User Info */}
                        <div className="flex-1">
                            <p className="text-white font-semibold">{searchResults.username}</p>
                            <p className="text-gray-400 text-sm">{searchResults.phone}</p>
                        </div>
                        {/* Icons */}
                        <div className="flex space-x-3 text-white">
                            <FiInfo size={20} />
                            <FiMessageCircle size={20} onClick={() => {
                                console.log("tıklanan searching", searchResults)
                                onSelectChat(searchResults)
                            }
                            } />
                            {/* Eğer kullanıcı zaten arkadaşsa + ikonunu gizle */}
                            {!isAlreadyFriend() && (
                                <FiPlusCircle onClick={() => {
                                    addNewFriend(searchResults.id)
                                }

                                } size={20} />
                            )}
                        </div>
                    </div>
                ) : notFound ? (
                    <div className="text-white text-center bg-red-500 p-3 rounded-lg">
                        Aradığınız telefon numarası bulunamadı.
                    </div>
                ) : null}
            </div>
        </div>
    );
}

export default NewChat;
