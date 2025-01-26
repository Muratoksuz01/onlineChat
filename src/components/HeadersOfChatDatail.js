import React, {  } from 'react'
import { LuPhone } from "react-icons/lu";
import { PiVideoCameraBold } from "react-icons/pi";
import { FaCircleInfo } from "react-icons/fa6";


function HeadersOfChatDatail({chat}) {

    return (
        <>
      
        <div className="flex justify-between items-center gap-4">
            <div 
                className='flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity'
                onClick={() => console.log('Profil detayına tıklandı')}
            >
                <img
                    className="w-10 h-10 rounded-full"
                    src={`http://localhost:8000${chat.avatar}`}
                    alt=""
                />
                <div className="font-medium dark:text-white">
                    <div>{chat.username}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                        Kişi bilgisi için tıklayın
                    </div>
                </div>
            </div>
            <div className='flex gap-5'>
                <LuPhone   
                    style={{color:"#db4f10"}} 
                    size={25} 
                    className="cursor-pointer hover:scale-110 transition-transform"
                    onClick={() => console.log('Sesli arama başlatıldı')}
                />
                <PiVideoCameraBold 
                    style={{color:"#db4f10"}} 
                    size={25} 
                    className="cursor-pointer hover:scale-110 transition-transform"
                    onClick={() => console.log('Görüntülü arama başlatıldı')}
                />
                <FaCircleInfo 
                    style={{color:"#db4f10"}} 
                    size={25}
                    className="cursor-pointer hover:scale-110 transition-transform"
                    onClick={() => console.log('Bilgi paneli açıldı')}
                />
            </div>
        
        </div>
        <hr className="my-3" />
        </>


    )
}

export default HeadersOfChatDatail