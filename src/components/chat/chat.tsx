"use client"
import { useRef, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { FaArrowUpLong } from "react-icons/fa6";
import { ChatBox } from "./chatBox";
import { useRouter } from "next/navigation";
import "./Components.css"
import { updateChatLabel } from "@/utils/chats";
import { RiLoader2Line } from "react-icons/ri";
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
export default function Chat() {
    const [input, setInput] = useState("")
    const router = useRouter()
    const [messages, setMessages] = useState<IMessage[]>([])

    const containerRef = useRef(null)
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const createNewChatPayload = await fetch('/api/chat/new', {
            method: 'GET'
        }).then(res => res.json()).then(data => {
            console.log(data)
            updateChatLabel(data.chat_id, input)
            return data
        });

        const chatId = createNewChatPayload.chat_id;

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
                //@ts-ignore
                setMessages([...messages, {
                    sent_from: 'user',
                    content: input
                }, {
                    sent_from: 'ai',
                    content: result
                }] as IMessage[]);
                chunk = await reader.read();
            }
        }
        setInput("")

        router.replace(`/chat/${chatId}`)
    };
    useEffect(() => {
        if (containerRef.current) {
            (containerRef.current as HTMLDivElement).scrollTop = (containerRef.current as HTMLDivElement).scrollHeight;
        }
    }, [messages])

    return (
        <div className="w-full h-screen relative flex justify-center">
            <div className=" max-h-[83%] mt-10 min-w-[100%]  py-3 flex flex-col gap-1 overflow-y-auto" ref={containerRef}>
                {messages.length > 0 ? messages?.map((message, index) => (
                    //@ts-ignore
                    <ChatBox key={index} message={message} />
                )) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-center">
                        <h1 className="text-4xl text-muted font-sans font-semibold">GAIA</h1>
                        <p className="mt-2 text-2xl">Ask your questions from me 😊.</p>
                    </div>
                )}
            </div>
            <div className="absolute max-h-[10%] h-full bottom-3 xl:px-56 px-10  z-10 gap-3 w-full m-auto flex items-center justify-between ">
                <div className="border w-full px-2 py-4 flex h-full items-center rounded-xl">
                    <input placeholder="enter message" className="bg-transparent md:px-3 relative w-full h-full outline-none" value={input} onChange={e => setInput(e.target.value)} />
                    <Button className="relative p-4 bg-white hover:bg-white w-10 h-10 text-lg" onClick={handleSubmit}>
                        <FaArrowUpLong size={40} className="text-neutral-900" />
                    </Button>
                </div>
            </div>
        </div>
    )
}

