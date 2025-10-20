"use client"

import Image from 'next/image'
import React, { useState } from 'react'

const ChatWindow = () => {
    const [selectedAI, setSelectedAI] = useState(["CHATGPT"])
    const [inputText, setInputText] = useState("")

    return (
        <div className="flex flex-col justify-between items-center">
            <div className="flex flex-1 w-full space-x-4">
                {selectedAI.map((ai) => (
                    <div key={ai} className="flex flex-1">

                    </div>
                ))}
            </div>

            <div className="flex justify-between items-center h-12 w-1/2 bg-white border-1 border-gray-500 shadow-inner rounded-full pl-4 pr-2 py-2 space-x-2">
                <input type="text" value={inputText} placeholder='Ask anything' className='w-full ring-0 outline-none text-gray-600' onChange={(event) => setInputText(event.target.value)} />

                <button type="button" className='flex justify-center items-center h-full aspect-square rounded-full bg-black cursor-pointer' onClick={() => { }} >
                    <Image src="/up-arrow.svg" alt='send-icon' width={20} height={20} />
                </button>
            </div>
        </div>
    )
}

export default ChatWindow