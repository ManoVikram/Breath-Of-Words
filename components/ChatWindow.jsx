"use client"

import Image from 'next/image'
import React, { useState } from 'react'
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from './ui/dropdown-menu'

const ChatWindow = () => {
    const AI_OPTIONS = ["ChatGPT", "Claude", "Llama"]

    const [selectedAI, setSelectedAI] = useState([AI_OPTIONS[0]])
    const [inputText, setInputText] = useState("")

    return (
        <section className="flex flex-col justify-between items-center h-full my-4 space-y-6">
            <div className="flex flex-1 justify-center items-center h-full min-w-0 max-w-1/2 space-x-4">
                {selectedAI.map((ai) => (
                    <div key={ai} className="flex flex-col flex-1 justify-start items-center size-full rounded-4xl p-5 bg-gray-50 border-4 border-gray-200 space-y-6">
                        <div className="flex justify-between items-center w-full">
                            <div className="flex justify-center items-center bg-white px-4 py-2 rounded-full drop-shadow-md">
                                <p className='text-sm'>{ai}</p>
                            </div>

                            <div className="flex justify-center items-center bg-white p-2 aspect-square rounded-full drop-shadow-md active:drop-shadow-none active:shadow-inner cursor-pointer">
                                <Image src="/copy-icon.svg" alt='copy-icon' height={18} width={18} />
                            </div>
                        </div>

                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sed dolor non nisl tincidunt porta. Donec luctus non sem quis rhoncus. Vestibulum ac dui non orci accumsan pulvinar. Integer tincidunt vulputate sodales. Sed at magna tincidunt, congue ante quis, luctus dui. Aliquam luctus pharetra vestibulum. Proin imperdiet tempus imperdiet. Ut sit amet nibh et quam ornare efficitur. Sed suscipit elementum convallis.</p>
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
        </section>
    )
}

export default ChatWindow