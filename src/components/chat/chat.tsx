"use client"

interface IMESSAGE {
    messages: {
        ai_content: string
        user_content: string
    }[]

}

import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { BsFillSendFill } from "react-icons/bs";
import { setIn } from "formik";
import { fetchChat } from "@/utils/auth";
import Image from "next/image"
import ai_img from "../../../public/ai.png"
import user_img from "../../../public/profile.png"
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import "./Components.css"
interface Message {
    message: {
        sent_from: string
        content: string
    },
    last_user_message: string,
    handleInputChange: () => void
    setMessagesState: (messages: any) => void
}
export default function Chat() {
    const [input, setInput] = useState("")
    const [messages, setMessages] = useState([])
    const [response, setResponse] = useState('')
    const [truthy, setTruthy] = useState(false)
    const handleChange = (e: any) => {
        setInput(e.target.value)
    }
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        //@ts-ignore
        setMessages([...messages, {
            sent_from: 'user',
            content: input
        }])
        const res = await fetch(`${process.env.NEXT_PUBLIC_API}/ai_response/660eb0fd0d391d387a7040ce`, {
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
            setMessages([...messages, {
                sent_from: 'ai',
                content: response
            }])
            while (!chunk.done) {
                result += decoder.decode(chunk.value, { stream: true });
                setResponse(result);
                //@ts-ignore
                const updatedMessages = [...messages];
                const lastIndex = updatedMessages.length - 1;
                //@ts-ignore
                updatedMessages[lastIndex] = {
                    sent_from: 'ai',
                    content: result
                };

                setMessages(updatedMessages);
                console.log(response)
                chunk = await reader.read();
            }
        }
        setTruthy(!truthy)

    };
    //@ts-ignore

    const handleInputChange = () => {
        setInput('')
    }
    useEffect(() => {
        fetchChat().then((data) => {
            setMessages(data)
        })
        console.log(messages)
    }, [])
    useEffect(() => {
        fetchChat().then((data) => {
            setMessages(data)
        })
        console.log(messages)
    }, [truthy])


    return (
        <div className="w-3/4 h-screen relative">
            <div className="max-h-[85%] w-full flex flex-col gap-4 overflow-y-auto overflow-x-hidden">
                {messages.length > 0 && messages?.map((message, index) => (
                    //@ts-ignore
                    <ChatBox key={index} message={message} />
                ))}
            </div>
            <div className="absolute bottom-5 w-full px-10 max-h-[10%] gap-3 h-full flex items-center justify-between">
                <Textarea placeholder="enter message" className="bg-transparent relative w-full outline-none focus:border-none" value={input} onChange={handleChange} />
                <Button className="relative p-4" onClick={handleSubmit}>
                    <BsFillSendFill size={15} />
                </Button>
            </div>
        </div>
    )
}

const ChatBox = ({ message }: Message) => {

    return message.sent_from === 'ai' ? (
        <div className="w-50 px-10 ">
            <div className="flex gap-2 items-start">
                <Image src={ai_img} alt="ai" width={50} height={50} />
                <div className=" p-2 rounded-md markdown_comp">
                    <Markdown remarkPlugins={[remarkGfm]} >{message.content}</Markdown>
                </div>
            </div>
        </div>
    ) : (
        <div className="w-full px-10 py-5">
            <div className="flex gap-2 px-54 items-start">
                <Image src={user_img} alt="user" width={50} height={50} />
                <div className="p-2 rounded-md">
                    <Markdown remarkPlugins={[remarkGfm]}>{message.content}</Markdown>
                </div>
            </div>
        </div>
    )
}