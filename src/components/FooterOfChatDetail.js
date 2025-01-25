import React, { useState, useContext } from "react";
import { AuthContext } from "../helper/AuthContex";
import { LuSendHorizontal } from "react-icons/lu";
import { BsEmojiExpressionless } from "react-icons/bs";
import { MdOutlineAttachFile } from "react-icons/md";
import EmojiPicker from "emoji-picker-react";
import { useWebSocket } from '../helper/WebsocketContext';

function FooterOfChatDetail({ chat }) {
  const [YourMessage, setYourMessage] = useState("");
  const [emojiPickerVisible, setEmojiPickerVisible] = useState(false);
  const { authState } = useContext(AuthContext);
  const { sendMessage } = useWebSocket();

  const handleOnSubmit = (e) => {
    console.log("FooterOfChatDetail handleOnSubmit giriş")
    e.preventDefault();
    if (!YourMessage.trim()) {
      console.error("Boş mesaj gönderilemez!");
      return;
    }

    const messageData = {
      SenderId: authState.id,
      ReceiverId: chat.id,
      message: YourMessage,
      timestamp: new Date().toISOString(),
    };
    console.log("FooterOfChatDetail handleOnSubmit giden mesaj",messageData)
    sendMessage({ type: "NEW_MESSAGE", data: messageData }); // Mesajı gönder
    setYourMessage(""); // Mesaj kutusunu temizle
  };

  const handleEmojiClick = (emojiObject) => {
    setYourMessage((prev) => prev + emojiObject.emoji);
  };

  return (
    <div className="flex items-center max-w-screen-xl">
      <div className="relative w-full">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <MdOutlineAttachFile style={{ color: "#db4f10" }} size={25} />
        </div>
        <input
          type="text"
          value={YourMessage}
          onChange={(e) => setYourMessage(e.target.value)}
          placeholder="Type your messages..."
          className="bg-gray-50 border text-gray-900 text-sm rounded-lg w-full ps-10 p-2.5"
        />
        <button type="button" className="absolute inset-y-0 end-0 flex items-center pe-3">
          <BsEmojiExpressionless
            onClick={() => setEmojiPickerVisible(!emojiPickerVisible)}
            style={{ color: "#db4f10" }}
            size={25}
          />
          {emojiPickerVisible && (
            <div className="absolute bg-white rounded-lg shadow-md">
              <EmojiPicker onEmojiClick={handleEmojiClick} />
            </div>
          )}
        </button>
      </div>
      <div className="ms-1 rounded-full bg-gray-700 flex items-center justify-center" style={{ width: "40px", height: "40px" }}>
        <LuSendHorizontal onClick={handleOnSubmit} style={{ color: "#db4f10" }} size={25} />
      </div>
    </div>
  );
}

export default FooterOfChatDetail;
