"use client"
import { useRef, useEffect, useState } from "react";
import { ChatBox } from "./chatBox";
import { useRouter } from "next/navigation";
import Image from "next/image";
import "@/app/components.css"
import { updateChatLabel } from "@/utils/chats";
import ChatInput from "./chatInput";
import { fetchHistory } from "@/app/reducers/slice/global/global.action";
import { useAppDispatch } from "@/app/reducers/store";
import { changeFetchState } from "@/app/reducers/slice/global/global.slice";
import ai_img from "../../../public/ai.png"
import SuggestedQuestions from "./suggestions";
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
    const router = useRouter()
    const dispatch = useAppDispatch()
    const [question, setQuestion] = useState<string>('')
    const [messages, setMessages] = useState<IMessage[]>([])

    const containerRef = useRef(null)

    const createAndUpdateChat = async (input: string) => {
        const createNewChatPayload = await fetch('/api/chat/new', {
            method: 'POST',
            body: JSON.stringify({ label: input }),
        }).then(res => res.json()).then(async (data) => {
            dispatch(fetchHistory())
            return data
        });
        const chatId = createNewChatPayload.chat_id;
        return chatId
    }

    const handleSubmit = async (input: string) => {

        //@ts-ignore
        setMessages([...messages, {
            sent_from: 'user',
            content: input
        }, {
            sent_from: 'ai',
            content: 'thinking...'
        }] as IMessage[]);

        const chatId = await createAndUpdateChat(input)
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
                    content: result
                }] as IMessage[]);
                chunk = await reader.read();
            }
        }
        dispatch(changeFetchState())
        router.replace(`/chat/${chatId}`)
    };



    useEffect(() => {
        if (containerRef.current) {
            (containerRef.current as HTMLDivElement).scrollTop = (containerRef.current as HTMLDivElement).scrollHeight;
        }
    }, [messages])

    return (
        <div className="xl:w-[60%] md:w-[80%] w-[90%] m-auto h-screen relative flex justify-center scrollbar-hidden">
            <div className="h-[calc(100%-3.5rem-110px)] min-w-full   mt-14 pt-5 pb-2 flex flex-col gap-1 overflow-y-auto scrollbar-hidden" ref={containerRef}>
                {messages.length > 0 ? messages?.map((message, index) => (
                    //@ts-ignore
                    <ChatBox key={index} message={message} />
                )) : (
                    <div className="w-full h-full flex flex-col items-center justify-center md:mt-[30%] mt-[10%]">
                        <div className="flex flex-col items-center">
                            <Image src={ai_img} alt="ai" width={100} height={100} />
                            <h1 className="mt-1 text-2xl font-sans">Hello, I{"'"}m GAIA</h1>
                            <p className="text-md mt-1 text-neutral-400 text-center">Ask me anything or pick a suggestion to get started</p>
                        </div>
                        <div className="md:mb-5 mb-10 ">
                            <SuggestedQuestions onClick={(e) => setQuestion(e)} />
                        </div>
                    </div>
                )}
            </div>
            <ChatInput onSubmit={(e) => handleSubmit(e)} suggestions={question} />
        </div>
    )
}