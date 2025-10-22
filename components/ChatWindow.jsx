"use client"

import Image from 'next/image'
import React, { useState } from 'react'
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from './ui/dropdown-menu'
import { AI_OPTIONS } from '@/lib/constants'
import { askAIHelper } from '@/lib/api/helpers'
import { Loader2 } from 'lucide-react'

const ChatWindow = () => {
    const [selectedAI, setSelectedAI] = useState([AI_OPTIONS[0].name])
    const [inputText, setInputText] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [responses, setResponses] = useState({
        "CHATGPT": "",
        "CLAUDE": "",
        "LLAMA": "",
    })

    const askAI = async () => {
        // Step 1 - Validate input text
        if (inputText.trim() === "") return

        // Step 2 - Set loading state to true
        setIsLoading(true)

        // Step 3 - Call the askAIHelper func to hit the API and get response for the selectd AIs
        const aiResponses = await askAIHelper(selectedAI.map(ai => ai.toUpperCase()), inputText)

        // Step 4 - Clear the input text
        setInputText("")

        // Step 5 - Update the responses state with the new responses
        const newResponses = { ...responses };
        aiResponses.responses.forEach((response) => {
            newResponses[(AI_OPTIONS.find((model) => model.id === response.model)).name.toUpperCase()] = response.response
        });

        setIsLoading(false)
        setResponses(newResponses);
    }

    return (
        <section className="flex flex-col justify-between items-center h-full min-h-0 my-4 space-y-6">
            <div className="flex flex-1 justify-center items-center h-full min-h-0 min-w-1/2 max-w-1/2 space-x-4">
                {selectedAI.map((ai) => (
                    <div key={ai} className="flex flex-col flex-1 justify-start items-start size-full rounded-4xl p-5 bg-gray-50 border-4 border-gray-200 space-y-6">
                        <div className="flex justify-between items-center w-full">
                            <div className="flex justify-center items-center bg-white px-4 py-2 rounded-full drop-shadow-md">
                                <p className='text-sm'>{ai}</p>
                            </div>

                            <div className="flex justify-center items-center bg-white p-2 aspect-square rounded-full drop-shadow-md active:drop-shadow-none active:shadow-inner transition-all duration-150 cursor-pointer">
                                <Image src="/copy-icon.svg" alt='copy-icon' height={18} width={18} />
                            </div>
                        </div>

                        <div className="min-h-0 pr-2 overflow-y-auto [&::-webkit-scrollbar]:bg-transparent [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full">
                            <p>{responses[ai.toUpperCase()]}</p>
                        </div>
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
                            <DropdownMenuCheckboxItem key={ai.id} checked={selectedAI.includes(ai.name)} onCheckedChange={() => setSelectedAI((prev) => prev.includes(ai.name) ? (prev.length == 1 ? [...prev] : prev.filter((item) => item !== ai.name)) : [...prev, ai.name])}>
                                {ai.name}
                            </DropdownMenuCheckboxItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>

                <button type="button" className='flex justify-center items-center h-full aspect-square rounded-full bg-black cursor-pointer' onClick={askAI} >
                    {isLoading ? <Loader2 className='animate-spin text-white w-5 h-5' /> : <Image src="/up-arrow.svg" alt='send-icon' width={20} height={20} />}
                </button>
            </div>
        </section>
    )
}

export default ChatWindow