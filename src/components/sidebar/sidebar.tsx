"use client"
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { RiLoader2Line } from "react-icons/ri";
interface Iprops {
    chatId?: string
    chatHistory?: IChat[]
    open: boolean
    setOpen: (open: boolean) => void
}
interface IChat {
    chat_id: string
    label: string

}
export default function Sidebar({ chatId, chatHistory, open, setOpen }: Iprops) {
    const router = useRouter()
    return (
        <>
            <div className="w-full h-screen hidden px-4 py-4 lg:flex flex-col  bg-neutral-900 overflow-auto">
                <Button variant="outline" className="w-full sticky bg-transparent" onClick={() => router.push("/")}>
                    Create New Chat
                </Button>
                {chatHistory && <div className="mt-5 flex flex-col items-center text-muted max-h-[90%] h-full px-2  overflow-auto scrollbar-custom gap-1">
                    <h1 className="w-full text-left text-xs text-muted mb-5">History</h1>
                    {
                        chatHistory.length > 0 ? chatHistory.map((item, index) => (
                            <div key={index} className={item?.chat_id === chatId ? "w-full px-4 py-2 rounded-md cursor-pointer bg-neutral-800 text-sm min-h-10 overflow-hidden text-ellipsis whitespace-nowrap" : "w-full px-4 py-2 rounded-md cursor-pointer hover:bg-neutral-800 text-sm min-h-10 overflow-hidden text-ellipsis whitespace-nowrap"} onClick={() => router.push(`/chat/${item.chat_id}`)}>
                                {item.label}
                            </div>
                        )) : (
                            <div className="w-full h-full flex items-center justify-center">
                                <RiLoader2Line size={20} className="animate-spin text-neutral-300" />
                            </div>

                        )
                    }
                </div>}
            </div>
            <div className={open ? "flex relative lg:hidden left-0 min-w-[300px] items-center gap-2   z-20 h-screen duration-100 ease-in-out" : "flex lg:hidden relative left-[-310px] w-0 items-center gap-2  z-20 h-screen duration-100 ease-in-out"}>
                <div className="px-4 py-4 flex-col bg-neutral-900 w-full h-screen ">
                    <Button variant="outline" className="w-full sticky  bg-transparent" onClick={() => router.push("/")}>
                        Create New Chat
                    </Button>
                    {chatHistory ? <div className="mt-5 flex flex-col items-center max-h-[90%] h-full  text-muted overflow-y-auto gap-1">
                        <h1 className="w-full text-left text-xs text-muted mb-5">History</h1>
                        {
                            chatHistory.length > 0 ? chatHistory.map((item, index) => (
                                <div key={index} className={item?.chat_id === chatId ? "w-full px-4 py-2 rounded-md cursor-pointer bg-neutral-800 text-sm min-h-10 overflow-hidden text-ellipsis whitespace-nowrap" : "w-full px-4 py-2 rounded-md cursor-pointer hover:bg-neutral-800 text-sm min-h-10 overflow-hidden text-ellipsis whitespace-nowrap"} onClick={() => router.push(`/chat/${item.chat_id}`)}>
                                    {item.label}
                                </div>
                            )) : (
                                <div className="w-full h-full flex items-center justify-center">
                                    <RiLoader2Line size={20} className="animate-spin text-neutral-300" />
                                </div>

                            )
                        }
                    </div> : (
                        <div className="w-full h-full flex items-center justify-center">
                            <RiLoader2Line size={20} className="animate-spin text-neutral-300" />
                        </div>

                    )}
                </div>
                <Button variant="outline" className="text-muted-foreground size-10 p-0" onClick={() => setOpen(false)}>
                    <MdKeyboardArrowLeft size={30} />
                </Button>
            </div>
        </>
    )
}