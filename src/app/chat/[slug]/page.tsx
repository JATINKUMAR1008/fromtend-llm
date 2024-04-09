"use client"
import { Button } from "@/components/ui/button"
// import { fetchChat } from "@/utils/auth"
import { FC, ReactNode, useEffect, useRef, useState } from "react"
import { FaArrowUpLong } from "react-icons/fa6"
import { ChatBox } from "@/components/chat/chatBox"
import "@/app/components.css"
import { RiLoader2Line } from "react-icons/ri";
import Sidebar from "@/components/sidebar/sidebar"
import Header from "@/components/header/header"
import ChatInput from "@/components/chat/chatInput"
import { useAppDispatch, useAppSelector } from "@/app/reducers/store"
import { fetchHistory, fetchMessages } from "@/app/reducers/slice/global/global.action"
import { changeFetchState } from "@/app/reducers/slice/global/global.slice"
import Loading from "@/app/loading"
interface IPageProps {
    params: {
        slug: string
    }
}
interface IChatComponents {
    params: {
        slug: string
    }
    refetch: () => void
}
interface Message {
    message: IMessage,
    last_user_message: string,
    handleInputChange: () => void
    setMessagesState: (messages: any) => void
}
interface IMessage {
    sent_from: string
    content: string
}
interface IChat {
    chat_id: string
    label: string
}
export default function ChatPage({ params }: IPageProps) {
    const chatId = params.slug
    const dispatch = useAppDispatch()
    const { messages: fetchedMessages, isLoading } = useAppSelector(state => state.global)
    const [messages, setMessages] = useState<IMessage[]>([])

    const containerRef = useRef(null)
    const handleSubmit = async (input: string) => {
        //@ts-ignore
        setMessages([...messages, {
            sent_from: 'user',
            content: input
        }, {
            sent_from: 'ai',
            content: 'thinking...'
        }] as IMessage[]);

        const res = await fetch(`${process.env.NEXT_PUBLIC_API}/ai_response/${chatId}`, {
            method: 'POST',
            body: JSON.stringify({ input_str: input }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const reader = res.body ? res.body.getReader() : null;
        const decoder = new TextDecoder();
        if (reader) {
            let chunk = await reader.read();
            let result = '';
            //@ts-ignore
            while (!chunk.done) {
                result += decoder.decode(chunk.value, { stream: true });
                // console.log(result)
                //@ts-ignore
                setMessages([...messages, {
                    sent_from: 'user',
                    content: input
                }, {
                    sent_from: 'ai',
                    content: result.replace("stream start", "")
                }] as IMessage[]);

                chunk = await reader.read();
                // dispatch(fetchMessages(chatId))

            }
        }
        dispatch(changeFetchState())
    };

    useEffect(() => {
        dispatch(fetchMessages(chatId))
    }, [])
    useEffect(() => {
        setMessages(fetchedMessages)
    }, [fetchedMessages])

    useEffect(() => {
        if (containerRef.current) {
            (containerRef.current as HTMLDivElement).scrollTop = (containerRef.current as HTMLDivElement).scrollHeight;
        }
    }, [messages]);

    return (
        <div className="w-full h-screen relative flex justify-center scrollbar-hidden">
            {!isLoading ? <div className=" max-h-[83%] mt-10  py-3 flex flex-col gap-1 overflow-y-auto scrollbar-hidden" ref={containerRef}>
                {messages.length > 0 ? messages?.map((message, index) => (
                    //@ts-ignore
                    <ChatBox key={index} message={message} />
                )) : (
                    <div className="w-full h-full items-center justify-center flex">
                        <RiLoader2Line size={50} className="animate-spin text-neutral-300" />
                    </div>
                )}
            </div> : <div className="w-full h-full items-center justify-center flex">
                <RiLoader2Line size={50} className="animate-spin text-neutral-300" />
            </div>}
            <ChatInput onSubmit={(e) => handleSubmit(e)} />
        </div>
    )
}