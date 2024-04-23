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
import '../../components.css'
import Image from "next/image"
import ai_img from "../../../../public/ai.png"
import SuggestedQuestions from "@/components/chat/suggestions"
interface IPageProps {
    params: {
        slug: string
    }
}
interface IMessage {
    sent_from: string
    content: string | ReactNode
}
export default function ChatPage({ params }: IPageProps) {
    const chatId = params.slug
    const dispatch = useAppDispatch()
    const { messages: fetchedMessages, isLoading } = useAppSelector(state => state.global)
    const [messages, setMessages] = useState<IMessage[]>([])
    const [question, setQuestion] = useState<string>('')
    const containerRef = useRef(null)
    const handleSubmit = async (input: string) => {
        //@ts-ignore
        setMessages([
            ...messages,
            { sent_from: 'user', content: input },
            { sent_from: 'ai', content: <span className="thinking">Thinking...</span> }
          ] as IMessage[]);
        
          const question_classification = await fetch(`${process.env.NEXT_PUBLIC_API}/question_classification`, {
            method: "POST",
            body: JSON.stringify({ question: input }),
            headers: { 'Content-Type': 'application/json' }
          }).then((res) => res.json()).then((data) => data.response);
        
          let isAiResponseStarted = false;
          const toggleInterval = setInterval(() => {
            if (isAiResponseStarted) {
              clearInterval(toggleInterval);
            } else {
              setMessages([
                ...messages,
                { sent_from: 'user', content: input },
                { sent_from: 'ai', content: <span className="thinking">{question_classification}</span> }
              ] as IMessage[]);
        
              setTimeout(() => {
                setMessages([
                  ...messages,
                  { sent_from: 'user', content: input },
                  { sent_from: 'ai', content: <span className="thinking">Thinking...</span> }
                ] as IMessage[]);
              }, 3000);
            }
          }, 7000);

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
                isAiResponseStarted = true;
                clearInterval(toggleInterval);
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
        dispatch(fetchHistory())
        dispatch(changeFetchState())
    };

    useEffect(() => {
        dispatch(fetchMessages(chatId))
    }, [])
    useEffect(() => {
        setMessages(fetchedMessages)
    }, [fetchedMessages])

    useEffect(() => {
        // dispatch(fetchHistory())
        if (containerRef.current) {
            (containerRef.current as HTMLDivElement).scrollTop = (containerRef.current as HTMLDivElement).scrollHeight;
        }
    }, [messages]);

    return (
        <div className="xl:w-[100%] md:w-[70%] w-[90%] xl:px-10 md:px-2 px-1 m-auto h-screen relative flex justify-center scrollbar-hidden">
            {
                !isLoading ?
                    (<div className="chats  h-[calc(100%-3.5rem-110px)]  pt-5 pb-2 flex flex-col items-start w-full gap-1 overflow-y-auto overflow-x-hidden xl:px-[250px] sm:px-3" ref={containerRef}>
                        {
                            messages.length > 0 ?
                                messages?.map((message, index) => (
                                    //@ts-ignore
                                    <ChatBox key={index} message={message} />
                                )) :
                                (
                                    <div className="w-full h-full flex flex-col items-center justify-center md:mt-[20%]">
                                        <div className="flex flex-col items-center">
                                            <Image src={ai_img} alt="ai" width={100} height={100} />
                                            <h1 className="mt-1 text-2xl font-sans">Hello, I{"'"}m GAIA</h1>
                                            <p className="text-md mt-1 text-neutral-400 text-center">Ask me anything or pick a suggestion to get started</p>
                                        </div>
                                        <div className="md:mb-5 mb-10 ">
                                            <SuggestedQuestions onClick={(e) => setQuestion(e)} />
                                        </div>
                                    </div>
                                )
                        }
                    </div>) :
                    (<div className="w-full h-full items-center justify-center flex">
                        <RiLoader2Line size={50} className="animate-spin text-neutral-300" />
                    </div>)
            }
            <ChatInput onSubmit={(e) => handleSubmit(e)} suggestions={question} />
        </div>
    )
}