"use client"
// import { fetchChat } from "@/utils/auth"
import { useEffect, useRef, useState } from "react"
import { ChatBox } from "@/components/chat/chatBox"
import "@/app/components.css"
import { RiLoader2Line } from "react-icons/ri";
import { useAppDispatch, useAppSelector } from "@/app/reducers/store"
import { fetchHistory, fetchMessages } from "@/app/reducers/slice/global/global.action"
import '../../components.css'
import Image from "next/image"
import ai_img from "../../../../public/ai.png"
import SuggestedQuestions from "@/components/chat/suggestions"
import { getCurrentDate } from "@/utils/auth"
import { Button } from "@/components/ui/button";
import { setCurrentChat } from "@/app/reducers/slice/global/global.slice";

interface IPageProps {
    params: {
        slug: string
    }
}
interface IMessage {
    sent_from: string
    content: string
}
export default function SharePage({ params }: IPageProps) {
    const chatId = params.slug
    const dispatch = useAppDispatch()
    const { messages: fetchedMessages, isLoading, chatHistory } = useAppSelector(state => state.global)
    const [messages, setMessages] = useState<IMessage[]>([])
    const [question, setQuestion] = useState<string>('')
    const containerRef = useRef(null)
    const currentChat = useAppSelector(state => state.global.currentChat)

    useEffect(() => {
        dispatch(fetchMessages(chatId))
        dispatch(fetchHistory())
    }, [])
    useEffect(() => {
        setMessages(fetchedMessages)
    }, [fetchedMessages])
    useEffect(() => {
        if (chatHistory) {
            const chat = chatHistory.find(chat => chat.chat_id === chatId)
            dispatch(setCurrentChat(chat))
        }
    }, [chatHistory])


    return (
        <div className="xl:w-[100%] md:w-[70%] w-[90%] xl:px-10 md:px-2 px-1 m-auto h-screen relative flex flex-col justify-center items-center scrollbar-hidden">
            {
                !isLoading ?
                    (<div className="chats  h-[100%]  pt-5 pb-2 flex flex-col items-start w-full gap-1 overflow-y-auto overflow-x-hidden xl:px-[250px] sm:px-3" ref={containerRef}>
                        <div className="w-[100%] py-4 border-b-4 mb-3">
                            <h1 className="text-[40px] py-5">{currentChat?.label || "Label Not found"}</h1>
                            <h1 className="">{getCurrentDate()}</h1>
                        </div>
                        <p className="w-[100%]  bg-white"></p>
                        {
                            messages.length > 0 ?
                                messages?.map((message, index) => (
                                    //@ts-ignore
                                    <ChatBox key={index} message={message} />
                                )) :
                                (<div className="w-full h-full items-center justify-center flex">
                                    <RiLoader2Line size={50} className="animate-spin text-neutral-300" />
                                </div>)
                        }
                    </div>) :
                    (<div className="w-full h-full items-center justify-center flex">
                        <RiLoader2Line size={50} className="animate-spin text-neutral-300" />
                    </div>)
            }
            <div className="p-3">
                <a href="https://fromtend-llm.vercel.app/">
                    <Button variant="default" className="w-full p-3 sticky bg-[#313035] hover:bg-[#3d3c40]">
                        Get Started with GAIA
                    </Button>
                </a>
            </div>
        </div>
    )
}