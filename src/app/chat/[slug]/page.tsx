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
    const [chatHistory, setChatHistory] = useState<IChat[]>([])

    const [open, setOpen] = useState(false)
    const fetchHistory = async () => {
        const res = await fetch('/api/chat', {
            method: 'GET'
        });
        const data = await res.json();
        setChatHistory(data)
    }
    useEffect(() => {
        fetchHistory()
    }, [])
    const refetchHistory = async () => {
        fetchHistory()
    }
    return (
        <main className="flex min-h-screen w-full items-center justify-between ">
            <div className="max-w-[15%] h-full lg:w-full w-0">
                <Sidebar chatId={params.slug} chatHistory={chatHistory} open={open} setOpen={setOpen} />
            </div>
            <div className="lg:max-w-[85%] h-full max-w-[100%] w-full">
                <Header setOpen={setOpen} />
                <Chat params={params} refetch={refetchHistory} />
            </div>
        </main>
    )
}
function Chat({ params, refetch }: IChatComponents) {
    const chatId = params.slug
    const [input, setInput] = useState("")
    const [messages, setMessages] = useState<IMessage[]>([])
    const [loading, setLoading] = useState(false)
    const [truthy, setTruthy] = useState(false)
    const containerRef = useRef(null)
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        //@ts-ignore
        setMessages([...messages, {
            sent_from: 'user',
            content: input
        }, {
            sent_from: 'ai',
            content: 'thinking...'
        }] as IMessage[]);

        // const res = await fetch(`${process.env.NEXT_PUBLIC_API}/ai_response/${chatId}`, {
        //     method: 'POST',
        //     body: JSON.stringify({ input_str: input }),
        //     headers: {
        //         'Content-Type': 'application/json'
        //     }
        // });
        const res = await fetch(`/api/stream`, {
            method: 'POST',
            body: JSON.stringify({ input, chatId }),
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
            }
        }
        setTruthy(!truthy)
        setInput("")
    };
    // useEffect(() => {
    //     fetchChat(chatId).then((data) => {
    //         setMessages(data)
    //     })
    //     console.log(messages)
    // }, [])

    const fetchChat = async (chatId: string) => {
        const res = await fetch(`/api/chat/fetch?chatId=${chatId}`, {
            method: 'GET'
        }).then(res => res.json()).then(data => { return data });
        return res;
    }
    useEffect(() => {
        fetchChat(chatId).then((data) => {
            setMessages(data);
        });
        refetch();
    }, [truthy]);
    useEffect(() => {
        if (containerRef.current) {
            (containerRef.current as HTMLDivElement).scrollTop = (containerRef.current as HTMLDivElement).scrollHeight;
        }
    }, [messages]);

    return (
        <div className="w-full h-screen relative flex justify-center">
            <div className=" max-h-[83%] mt-10  py-3 flex flex-col gap-1 overflow-y-auto" ref={containerRef}>
                {messages.length > 0 ? messages?.map((message, index) => (
                    //@ts-ignore
                    <ChatBox key={index} message={message} />
                )) : (
                    <div className="w-full h-full items-center justify-center flex">
                        <RiLoader2Line size={50} className="animate-spin text-neutral-300" />
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