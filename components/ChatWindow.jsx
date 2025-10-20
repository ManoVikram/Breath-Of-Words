"use client"

import Image from 'next/image'
import React, { useState } from 'react'
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from './ui/dropdown-menu'

const ChatWindow = () => {
    const AI_OPTIONS = ["CHATGPT", "CLAUDE", "LLAMA"]

    const [selectedAI, setSelectedAI] = useState([AI_OPTIONS[0]])
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

                <DropdownMenu className='bg-blue-400'>
                    <DropdownMenuTrigger asChild>
                        <button type='button' className='flex justify-between items-center min-w-max space-x-0.5 ring-0 outline-none cursor-pointer'>
                            <p className='text-sm'>{selectedAI.length > 1 ? `${selectedAI.length} selected` : `${selectedAI[0]}`}</p>

                            <Image src="/down-arrow.svg" alt='down-arrow' width={20} height={20} />
                        </button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent>
                        {AI_OPTIONS.map((ai) => (
                            <DropdownMenuCheckboxItem key={ai} checked={selectedAI.includes(ai)} onCheckedChange={() => setSelectedAI((prev) => prev.includes(ai) ? (prev.length == 1 ? [...prev] : prev.filter((item) => item !== ai)) : [...prev, ai])}>
                                {ai}
                            </DropdownMenuCheckboxItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>

                <button type="button" className='flex justify-center items-center h-full aspect-square rounded-full bg-black cursor-pointer' onClick={() => { }} >
                    <Image src="/up-arrow.svg" alt='send-icon' width={20} height={20} />
                </button>
            </div>
        </div >
    )
}

export default ChatWindow