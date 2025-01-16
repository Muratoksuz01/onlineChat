import React, { useContext, useState } from 'react'
import { LuSendHorizontal } from "react-icons/lu";
import { BsEmojiExpressionless } from "react-icons/bs";
import { MdOutlineAttachFile } from "react-icons/md";
import { AuthContext } from "../helper/AuthContex";
import axios from 'axios';
import EmojiPicker from 'emoji-picker-react'; // Emoji-picker-react kütüphanesi



function FooterOfChatDetail({ chat }) {
    const [emojiPickerVisible, setEmojiPickerVisible] = useState(false);
    const { authState } = useContext(AuthContext);
    const [YourMessage, setYourMessage] = useState("")
    const handleOnSubmit = (e) => {
        e.preventDefault(); // Formun varsayılan davranışını engeller
        console.log("Gönderilen Mesaj:", YourMessage);

        axios
            .post("http://localhost:8000/api/users/SendMessage", {
                SenderId: authState.id,
                ReceiverId: chat.id,
                message: YourMessage,
            }, {
                headers: {
                    accessToken: localStorage.getItem("accessToken"),
                },
            })
            .then((response) => {
                console.log(response)
                if (response.data.success) {
                    console.log("Mesaj gönderildi:", response.data.data);
                } else {
                    console.log("Mesaj gönderilemedi:", response.data.message);
                }
            })
            .catch((error) => {
                console.error("Mesaj gönderilirken bir hata oluştu:", error);
            });
        setYourMessage("")
    }
    const handleEmojiClick = (emojiObject) => {
        setYourMessage((prevInput) => prevInput + emojiObject.emoji);
    };
    return (

        <div className="flex   items-center max-w-screen-xl ">
            <div className="relative w-full">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <MdOutlineAttachFile style={{ color: "#db4f10" }} size={25} />
                </div>
                <input
                    type="text"
                    id="voice-search"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={(e) => setYourMessage(e.target.value)}
                    value={YourMessage}
                    placeholder="Type Your Messages ..."
                    required
                />
                <button
                    type="button"
                    className="absolute inset-y-0 end-0 flex items-center pe-3"
                >
                    <BsEmojiExpressionless
                        onClick={() => setEmojiPickerVisible(!emojiPickerVisible)}
                        style={{ color: "#db4f10" }}
                        size={25}
                    />
                    {emojiPickerVisible && (
                        <div
                            className="emoji-picker bg-white p-2 rounded-lg shadow-md absolute z-50"
                            style={{
                                top: "auto", // Yatay pozisyonu yukarıdan hesaplamayı iptal et
                                bottom: "50px", // Butonun üstüne biraz yukarıda durması için
                                right: "-100px", // Sağ tarafa hizala
                                transform: "translateX(-50%)", // Ortalamak için
                                left: "", // Sol kenarı düğme ile hizalamak için
                            }}
                        >
                            <EmojiPicker
                                width={300}
                                height={350}
                                searchPlaceholder={"ne moddasın bugun bebek"}
                                Theme={"dark"}
                               // categories={["Animals & Nature","Smileys & People"]}
                               // searchDisabled={true}
                                onEmojiClick={handleEmojiClick}
                            />
                        </div>
                    )}
                </button>
            </div>
            <div
                className="ms-1 rounded-full bg-gray-700 flex items-center justify-center"
                style={{
                    width: "40px",
                    height: "40px",
                }}
            >
                <LuSendHorizontal
                    onClick={(e) => handleOnSubmit(e)}
                    style={{ color: "#db4f10" }}
                    size={25}
                />
            </div>
        </div>


    )
}

export default FooterOfChatDetail