import React, { useContext } from 'react'
import { AuthContext } from "../helper/AuthContex";
import { LuPhone } from "react-icons/lu";
import { PiVideoCameraBold } from "react-icons/pi";
import { FaCircleInfo } from "react-icons/fa6";


function HeadersOfChatDatail() {
    const { authState, setAuthState } = useContext(AuthContext);

    return (
        <>
      
        <div className="flex  justify-between items-center gap-4">
            <div className=' flex gap-3'>

                <img
                    className="w-10 h-10 rounded-full"
                    src="./Screenshot 2025-01-11 200637.png"
                    alt=""
                />
                <div className="font-medium dark:text-white">
                    <div>{authState.username}</div>
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