import React, { useState, useContext, useRef, useEffect } from "react"; // useRef ve useEffect ekledik
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
  const emojiPickerRef = useRef(null);
  const [attachmentDropdown, setAttachmentDropdown] = useState(false);
  const attachmentRef = useRef(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Burada dosya işleme mantığı eklenecek
      console.log('Selected file:', file);
    }
    setAttachmentDropdown(false);
  };

  const handleFileSelect = (type) => {
    fileInputRef.current.accept = type === 'document'
      ? '.pdf,.doc,.docx,.txt'
      : type === 'media'
        ? 'image/*,video/*'
        : 'audio/*';
    fileInputRef.current.click();
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target)) {
        setEmojiPickerVisible(false);
      }
      if (attachmentRef.current && !attachmentRef.current.contains(event.target)) {
        setAttachmentDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
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
    console.log("FooterOfChatDetail handleOnSubmit giden mesaj", messageData)
    sendMessage({ type: "NEW_MESSAGE", data: messageData }); // Mesajı gönder
    setYourMessage(""); // Mesaj kutusunu temizle
  };
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (e.shiftKey) {
        e.preventDefault();
        setYourMessage(prev => prev + '\n');
      } else {

        e.preventDefault();
        handleOnSubmit(e);
      }
    }
  };
  const handleEmojiClick = (emojiObject) => {
    setYourMessage((prev) => prev + emojiObject.emoji);
  };

  return (
    <div className="flex items-center max-w-screen-xl">
      <div className="relative w-full">
       
        <div ref={attachmentRef} className="absolute inset-y-0 start-0 flex items-center ps-3">
          <div className="relative">
            <MdOutlineAttachFile
              onClick={() => setAttachmentDropdown(!attachmentDropdown)}
              style={{ color: "#db4f10" }}
              size={25}
              className="cursor-pointer hover:scale-110 transition-transform duration-200"
            />
            {attachmentDropdown && (
              <div className="absolute bottom-[100%] left-0 mb-2 w-48 bg-gray-800 rounded-lg shadow-lg border border-gray-700">
                <ul className="py-2 text-white">
                  <li
                    onClick={() => handleFileSelect('media')}
                    className="px-4 py-2 hover:bg-gray-700 cursor-pointer flex items-center gap-2"
                  >
                    <span>📷 Photo & Video</span>
                  </li>
                  <li
                    onClick={() => handleFileSelect('document')}
                    className="px-4 py-2 hover:bg-gray-700 cursor-pointer flex items-center gap-2"
                  >
                    <span>📄 Document</span>
                  </li>
                  <li
                    onClick={() => handleFileSelect('audio')}
                    className="px-4 py-2 hover:bg-gray-700 cursor-pointer flex items-center gap-2"
                  >
                    <span>🎵 Audio</span>
                  </li>
                </ul>
              </div>
            )}
          </div>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileChange}
          />
        </div>



        <textarea // input yerine textarea kullanıyoruz
          value={YourMessage}
          onChange={(e) => setYourMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your messages..."
          className="bg-gray-800 border border-gray-700 text-gray-100 text-sm rounded-lg w-full ps-10 p-2.5 focus:ring-blue-500 focus:border-blue-500 resize-none"
          rows={1}
          style={{ minHeight: '41px', maxHeight: '120px' }}
        />
        <button type="button" className="absolute inset-y-0 end-0 flex items-center pe-3">
          <BsEmojiExpressionless
            onClick={() => setEmojiPickerVisible(!emojiPickerVisible)}
            style={{ color: "#db4f10" }}
            size={25}
          />
          {emojiPickerVisible && (
            <div ref={emojiPickerRef} className="absolute bottom-[100%] right-[10px] bg-gray-800 rounded-lg shadow-lg border border-gray-700">
              <EmojiPicker
                theme="dark"
                onEmojiClick={handleEmojiClick}
              />
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
