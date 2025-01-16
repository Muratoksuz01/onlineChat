import React, {  } from 'react'
import { LuPhone } from "react-icons/lu";
import { PiVideoCameraBold } from "react-icons/pi";
import { FaCircleInfo } from "react-icons/fa6";


function HeadersOfChatDatail({chat}) {

    return (
        <>
      
        <div className="flex  justify-between items-center gap-4">
            <div className=' flex gap-3'>

                <img
                    className="w-10 h-10 rounded-full"
                    src={`http://localhost:8000${chat.avatar}`}
                    alt=""
                />
                <div className="font-medium dark:text-white">
                    <div>{chat.username}</div>
                </div>
            </div>
            <div className='flex gap-5'>
                <LuPhone   style={{color:"#db4f10"}} size={25} />
                <PiVideoCameraBold style={{color:"#db4f10"}} size={25} />
                <FaCircleInfo style={{color:"#db4f10"}} size={25}/>
            </div>
        
        </div>
        <hr className="my-3" />
        </>


    )
}

export default HeadersOfChatDatail