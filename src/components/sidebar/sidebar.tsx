"use client"
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { usePathname, useRouter } from "next/navigation";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { RiLoader2Line } from "react-icons/ri";
import { PiPencilSimpleLineThin } from "react-icons/pi";
import { useAppDispatch, useAppSelector } from "@/app/reducers/store";
import { changeSidebarState } from "@/app/reducers/slice/global/global.slice";
import { fetchHistory } from "@/app/reducers/slice/global/global.action";
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
export default function Sidebar() {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const chatHistory = useAppSelector(state => state.global.chatHistory)
    const { sidebarOpen } = useAppSelector(state => state.global)
    const pathname = usePathname()
    const currentChat = pathname.split("/")[2]
    useEffect(() => {
        dispatch(fetchHistory())
    }, [])
    return (
        <>
            <div className="w-full h-screen hidden  py-4 md:flex flex-col max-w-[250px]  bg-[#1B1B20] overflow-auto border-r-[1px] border-neutral-600">
                <div className="px-4">
                    <Button variant="default" className="w-full sticky bg-[#313035] hover:bg-[#3d3c40]" onClick={() => router.push("/")}>
                        <PiPencilSimpleLineThin size={20} className="mr-2" />
                        Create new chat
                    </Button>
                </div>

                {chatHistory && <div className="mt-5 flex flex-col items-center text-muted max-h-[90%] h-full overflow-auto scrollbar-custom gap-1">
                    <h1 className="w-full text-left text-xs text-muted mb-5 px-3">History</h1>
                    {
                        chatHistory.length > 0 ? chatHistory.map((item, index) => (
                            <div key={index} className={item?.chat_id === currentChat ? "w-full p-3 px-4 min-h-11 cursor-pointer bg-[#313035] text-sm  overflow-hidden text-ellipsis whitespace-nowrap" : "w-full p-3 cursor-pointer min-h-11 hover:bg-[#313035] text-sm  overflow-hidden text-ellipsis whitespace-nowrap"} onClick={() => router.push(`/chat/${item.chat_id}`)}>
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
            <div className={sidebarOpen ? "flex relative lg:hidden left-0 min-w-[250px] items-center gap-2   z-20 h-screen duration-200 ease-in-out" : "flex lg:hidden relative left-[-310px] w-0 items-center gap-2  z-20 h-screen duration-200 ease-in-out"}>
                <div className="px-4 py-4 flex-col bg-[#1B1B20] w-full h-screen ">
                    <div className="px-4">
                        <Button variant="default" className="w-full sticky bg-[#313035] hover:bg-[#3d3c40]" onClick={() => router.push("/")}>
                            <PiPencilSimpleLineThin size={20} className="mr-2" />
                            Create new chat
                        </Button>
                    </div>
                    {chatHistory && <div className="mt-5 flex flex-col items-center text-muted max-h-[90%] h-full overflow-auto scrollbar-custom gap-1">
                        <h1 className="w-full text-left text-xs text-muted mb-5 px-3">History</h1>
                        {
                            chatHistory.length > 0 ? chatHistory.map((item, index) => (
                                <div key={index} className={item?.chat_id === currentChat ? "w-full p-3 px-4 min-h-11 rounded-md cursor-pointer bg-[#313035] text-sm  overflow-hidden text-ellipsis whitespace-nowrap" : "w-full p-3 rounded-md cursor-pointer min-h-11 hover:bg-[#313035] text-sm  overflow-hidden text-ellipsis whitespace-nowrap"} onClick={() => router.push(`/chat/${item.chat_id}`)}>
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
                <Button variant="outline" className="text-muted-foreground size-10 p-0" onClick={() => {
                    dispatch(changeSidebarState())
                }}>
                    <MdKeyboardArrowLeft size={30} />
                </Button>
            </div>
        </>
    )
}