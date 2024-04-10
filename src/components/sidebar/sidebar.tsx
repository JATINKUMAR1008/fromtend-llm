import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { usePathname, useRouter } from "next/navigation";
import { MdKeyboardArrowLeft, MdDelete, MdExitToApp } from "react-icons/md"; // Import MdExitToApp icon
import { RiLoader2Line } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { useAppDispatch, useAppSelector } from "@/app/reducers/store";
import { changeSidebarState } from "@/app/reducers/slice/global/global.slice";
import { fetchHistory } from "@/app/reducers/slice/global/global.action";
import { IoCreateOutline } from "react-icons/io5";

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
    const router = useRouter();
    const dispatch = useAppDispatch();
    const chatHistory = useAppSelector(state => state.global.chatHistory);
    const { sidebarOpen } = useAppSelector(state => state.global);
    const pathname = usePathname();
    const currentChat = pathname.split("/")[2];
    const [hoveredChat, setHoveredChat] = useState<string | null>(null);

    useEffect(() => {
        dispatch(fetchHistory());
    }, []);

    return (
        <>
            <div className="w-full h-screen hidden py-4 lg:flex flex-col  bg-[#1b1b20] overflow-auto">
                <div className="px-4">
                <Button className="w-full sticky bg-[#28282e] gap-1" onClick={() => router.push("/")}>
                    <IoCreateOutline />
                    Create New Chat
                </Button>
                </div>
                {chatHistory && (
                    <div className="mt-5 flex flex-col items-center text-muted max-h-[90%] h-full  overflow-auto scrollbar-custom gap-1">
                        <h1 className="w-full px-4 text-left text-xs text-muted mb-5">History</h1>
                        {chatHistory.length > 0 ? (
                            chatHistory.map((item, index) => (
                                <div
                                    key={index}
                                    className={`flex flex-row justify-between items-center w-full px-4 py-2 cursor-pointer bg-[#1b1b20] text-sm min-h-10 overflow-hidden text-ellipsis whitespace-nowrap ${
                                        item.chat_id === currentChat ? "bg-[#28282e]" : "bg-[#1b1b20] hover:bg-[#28282e]"
                                    }`}
                                    onClick={() => router.push(`/chat/${item.chat_id}`)}
                                    onMouseEnter={() => setHoveredChat(item.chat_id)}
                                    onMouseLeave={() => setHoveredChat(null)}
                                >
                                    <p className="flex-1 truncate">{item.label}</p>
                                    {hoveredChat === item.chat_id && (
                                        <MdDelete
                                            size={20}
                                            className="text-red-600 cursor-pointer"
                                            onClick={(e) => {
                                                e.stopPropagation(); // Prevent triggering parent click event
                                                // Your delete logic here
                                            }}
                                        />
                                    )}
                                </div>
                            ))
                        ) : (
                            <div className="w-full h-full flex items-center justify-center">
                                <RiLoader2Line size={20} className="animate-spin text-neutral-300" />
                            </div>
                        )}
                    </div>
                )}
                {/* Logout button with MdExitToApp icon */}
                <div className="mt-auto flex justify-center items-center">
                    <Button
                        variant="solid" // Use solid variant for a filled button
                        color="red-500" // Use a red color for the button
                        className="text-white hover:bg-red-600 mt-2" // Apply hover effect
                        onClick={() => {/* Your logout logic */}}
                    >
                        <MdExitToApp size={20} className="mr-2" />
                        Logout
                    </Button>
                </div>
            </div>
            <div
                className={`flex relative lg:hidden left-0 min-w-[300px] items-center gap-2 z-20 h-screen duration-200 ease-in-out ${
                    sidebarOpen ? "" : "left-[-310px] w-0"
                }`}
            >
                <div className="py-4 flex-col bg-[#1b1b20] w-full h-screen">
                    <div className="px-4">
                    <Button className="w-full sticky bg-[#28282e] gap-1" onClick={() => router.push("/")}>
                        <IoCreateOutline />
                        Create New Chat
                    </Button>
                    </div>
                    {chatHistory ? (
                        <div className="mt-5 flex flex-col items-center max-h-[90%] h-full scrollbar-custom px-2 text-muted overflow-y-auto gap-1">
                            <h1 className="w-full px-4 text-left text-xs text-muted mb-5">History</h1>
                            {chatHistory.length > 0 ? (
                                chatHistory.map((item, index) => (
                                    <div
                                        key={index}
                                        className={`flex flex-row justify-between items-center w-full px-4 py-2 rounded-md cursor-pointer bg-[#1b1b20] text-sm min-h-10 overflow-hidden text-ellipsis whitespace-nowrap ${
                                            item.chat_id === currentChat ? "bg-[#28282e]" : "bg-[#1b1b20] hover:bg-[#28282e]"
                                        }`}
                                        onClick={() => router.push(`/chat/${item.chat_id}`)}
                                        onMouseEnter={() => setHoveredChat(item.chat_id)}
                                        onMouseLeave={() => setHoveredChat(null)}
                                    >
                                        <p className="flex-1 truncate">{item.label}</p>
                                        {hoveredChat === item.chat_id && (
                                            <MdDelete
                                                size={20}
                                                className="text-red-600 cursor-pointer"
                                                onClick={(e) => {
                                                    e.stopPropagation(); // Prevent triggering parent click event
                                                    // Your delete logic here
                                                }}
                                            />
                                        )}
                                    </div>
                                ))
                            ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                    <RiLoader2Line size={20} className="animate-spin text-neutral-300" />
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="w-full h-full flex items-center justify-center">
                            <RiLoader2Line size={20} className="animate-spin text-neutral-300" />
                        </div>
                    )}
                    {/* Logout button with MdExitToApp icon */}
                    <div className="mt-auto flex justify-center items-center">
                        <Button
                            variant="solid"
                            color="red-500"
                            className="text-white hover:bg-red-600"
                            onClick={() => {/* Your logout logic */}}
                        >
                            <MdExitToApp size={20} className="mr-2" />
                            Logout
                        </Button>
                    </div>
                </div>
                <Button
                    variant="outline"
                    className="text-muted-foreground size-10 p-0"
                    onClick={() => {
                        dispatch(changeSidebarState());
                    }}
                >
                    <MdKeyboardArrowLeft size={30} />
                </Button>
            </div>
        </>
    );
}
