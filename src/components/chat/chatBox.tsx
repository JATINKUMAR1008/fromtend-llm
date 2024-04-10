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
import Image from "next/image"
import ai_img from "../../../public/ai.png"
import Markdown from 'react-markdown'
import { CiUser } from "react-icons/ci";
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import 'katex/dist/katex.min.css'
export const ChatBox = ({ message }: Message) => {

    return message.sent_from === 'ai' ? (
        <div className="w-full py-2 scrollbar-hidden ">
            <div className="flex gap-2 items-start">
                <Image src={ai_img} alt="ai" width={40} height={40} />
                <div className=" p-2 rounded-md markdown_comp overflow-auto scrollbar-custom">
                    <Markdown remarkPlugins={[remarkGfm, remarkMath]} rehypePlugins={[rehypeKatex]}>{message.content}</Markdown>
                </div>
            </div>
        </div>
    ) : (
        <div className="w-full scrollbar-hidden">
            <div className="flex gap-2 items-start">
                <div className="size-10 p-1">
                    <div className="size-9 bg-neutral-700 rounded-full flex items-center justify-center">
                        <CiUser size={20} className="text-muted" />
                    </div>
                </div>
                <div className="p-2 rounded-md">
                    <Markdown remarkPlugins={[remarkGfm]}>{message.content}</Markdown>
                </div>
            </div>
        </div>
    )
}