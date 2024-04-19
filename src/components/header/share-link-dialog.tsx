import { useAppDispatch, useAppSelector } from "@/app/reducers/store"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import React, { useEffect } from "react"
import { RiLoader2Line } from "react-icons/ri"
import { ChatBox } from "../chat/chatBox"
import { getCurrentDate } from "@/utils/auth"
import { createShareLink } from "@/app/reducers/slice/global/global.action"
interface IPageProps {
    children: React.ReactNode
}

export default function ShareDialog({ children }: IPageProps) {
    const dispatch = useAppDispatch()
    const { messages, isLoading, currentChat, shareLink, buttonLoader } = useAppSelector(state => state.global)
    useEffect(() => {
        if (shareLink.length > 0) {
            navigator.clipboard.writeText(shareLink);
        }
    }, [shareLink])
    return (
        <Dialog>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="md:max-w-fit max-w-[300px]  bg-[#1B1B20] outline-none border-[#29292e]">
                <DialogHeader>
                    <DialogTitle>Share link to Chat</DialogTitle>
                    <DialogDescription>
                        Messages you send after creating your link won{"'"}t be shared. Anyone with the URL will be able to view the shared chat.
                    </DialogDescription>
                </DialogHeader>
                <div className="md:w-full w-[250px] md:h-[450px] h-[300px] py-1 border rounded-xl bg-[#202026]">
                    <div className="md:w-full w-[248px] md:h-[350px] h-[200px] overflow-auto chats px-3 py-2 bg-[#1B1B20] rounded-md">
                        {isLoading ? (
                            <div className="flex justify-center items-center h-full">
                                <RiLoader2Line className="animate-spin text-2xl" />
                            </div>
                        ) : (
                            <>
                                {messages.map((message, index) => (
                                    <ChatBox key={index} message={message} last_user_message={""} handleInputChange={function (): void {
                                        throw new Error("Function not implemented.")
                                    }} setMessagesState={function (messages: any): void {
                                        throw new Error("Function not implemented.")
                                    }} />
                                ))}
                            </>
                        )}
                    </div>
                    <div className="w-full  p-3 h-[100px] border-t-[1px] ">
                        <p className=" mt-1 md:text-md text-sm font-medium">{currentChat.label}</p>
                        <p className="mt-1 md:text-sm text-xs font-light text-neutral-400">
                            Sharing on : {getCurrentDate()}
                        </p>
                    </div>
                </div>
                <DialogFooter>
                    <Button className="bg-[#C05037] w-full" onClick={() => dispatch(createShareLink(currentChat.id))}>
                        {buttonLoader ? <RiLoader2Line className="animate-spin" /> : "Create Share Link"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}