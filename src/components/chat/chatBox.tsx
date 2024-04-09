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
import user_img from "../../../public/profile.png"
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
export const ChatBox = ({ message }: Message) => {

    return message.sent_from === 'ai' ? (
        <div className="w-full xl:px-56 px-10 py-2 scrollbar-hidden">
            <div className="flex gap-2 items-start">
                <Image src={ai_img} alt="ai" width={30} height={30} />
                <div className=" p-2 rounded-md markdown_comp">
                    <Markdown remarkPlugins={[remarkGfm]} >{message.content}</Markdown>
                </div>
            </div>
        </div>
    ) : (
        <div className="w-full xl:px-56 py-2 px-10 scrollbar-hidden">
            <div className="flex gap-2 items-start">
                <Image src={user_img} alt="user" width={30} height={30} />
                <div className="p-2 rounded-md">
                    <Markdown remarkPlugins={[remarkGfm]}>{message.content}</Markdown>
                </div>
            </div>
        </div>
    )
}