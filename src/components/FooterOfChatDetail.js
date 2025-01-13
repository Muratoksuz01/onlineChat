import React from 'react'
import { LuSendHorizontal } from "react-icons/lu";
import { BsEmojiExpressionless } from "react-icons/bs";
import { MdOutlineAttachFile } from "react-icons/md";



function FooterOfChatDetail() {
    return (

        <div class="flex items-center max-w-screen-xl  ">

            <div class="relative w-full">
                <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                   <MdOutlineAttachFile style={{color:"#db4f10"}} size={25}/>
                </div>
                <input type="text" id="voice-search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                placeholder="Type Your Messages ..." required />
                <button type="button" class="absolute inset-y-0 end-0 flex items-center pe-3">
                    <BsEmojiExpressionless style={{color:"#db4f10"}} size={25}/>
                </button>
            </div>
            <div
                className="ms-1 rounded-full bg-gray-700 flex items-center justify-center"
                style={{
                    width: "40px",
                    height: "40px",
                }}
            >
                <LuSendHorizontal style={{color:"#db4f10"}} size={25} />
            </div>
        </div>

    )
}

export default FooterOfChatDetail