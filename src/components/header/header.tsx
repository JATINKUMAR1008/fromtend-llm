"use client"
import { RiMenu2Fill } from "react-icons/ri";
import { IoCreateOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { changeSidebarState } from "@/app/reducers/slice/global/global.slice";
import { useAppDispatch, useAppSelector } from "@/app/reducers/store";
import { toast } from "../ui/use-toast";
import { useEffect } from 'react';
import { fetchHistory, logOut, removeChat, resetChat } from "@/app/reducers/slice/global/global.action";
import ShareDialog from "./share-link-dialog";


interface HeaderProps {
    chatId: string;
}

export default function Header() {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const currentChat = useAppSelector(state => state.global.currentChat)
    return (
        <div className="w-full sticky z-10 h-14 flex py-4 items-center justify-between px-10 border-b-[1px] border-neutral-700 bg-[#202026]">
            <div className="flex items-center cursor-pointer md:hidden" onClick={() => dispatch(changeSidebarState())}><RiMenu2Fill size={20} /></div>
            <h1 className="text-lg font-semibold font-sans">GAIA<span className="italic font-sans">(testing)</span></h1>
            {currentChat && currentChat.id?.length > 0 && <div className="flex gap-2  ">
                <ShareDialog>
                    <div>
                        <svg className="cursor-pointer" width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="0.5" y="0.5" width="39" height="39" rx="19.5" stroke="#373740" />
                            <path d="M27.2724 20.7274C27.0795 20.7274 26.8945 20.8041 26.7581 20.9405C26.6217 21.0768 26.5451 21.2618 26.5451 21.4547V24.5186C26.5445 25.056 26.3308 25.5712 25.9508 25.9512C25.5708 26.3312 25.0556 26.5449 24.5182 26.5455H15.4814C14.944 26.5449 14.4288 26.3312 14.0488 25.9512C13.6688 25.5712 13.4551 25.056 13.4545 24.5186V21.4547C13.4545 21.2618 13.3779 21.0768 13.2415 20.9405C13.1051 20.8041 12.9201 20.7274 12.7273 20.7274C12.5344 20.7274 12.3494 20.8041 12.213 20.9405C12.0766 21.0768 12 21.2618 12 21.4547V24.5186C12.001 25.4417 12.3681 26.3266 13.0207 26.9793C13.6734 27.6319 14.5583 27.999 15.4814 28H24.5182C25.4413 27.999 26.3262 27.6319 26.9789 26.9793C27.6316 26.3266 27.9987 25.4417 27.9996 24.5186V21.4547C27.9996 21.2618 27.923 21.0768 27.7866 20.9405C27.6502 20.8041 27.4652 20.7274 27.2724 20.7274Z" fill="#CCC9C8" />
                            <path d="M17.0385 16.7159L19.2717 14.4827V22.747C19.2717 22.9399 19.3484 23.1249 19.4848 23.2613C19.6211 23.3977 19.8061 23.4743 19.999 23.4743C20.1919 23.4743 20.3769 23.3977 20.5133 23.2613C20.6496 23.1249 20.7263 22.9399 20.7263 22.747V14.4827L22.9595 16.7159C23.0966 16.8484 23.2803 16.9217 23.471 16.92C23.6617 16.9184 23.8441 16.8419 23.979 16.7071C24.1138 16.5722 24.1903 16.3898 24.1919 16.1991C24.1936 16.0084 24.1203 15.8247 23.9878 15.6876L20.5132 12.2129C20.3768 12.0766 20.1918 12 19.999 12C19.8062 12 19.6212 12.0766 19.4848 12.2129L16.0102 15.6876C15.8777 15.8247 15.8044 16.0084 15.8061 16.1991C15.8077 16.3898 15.8842 16.5722 16.0191 16.7071C16.1539 16.8419 16.3363 16.9184 16.527 16.92C16.7177 16.9217 16.9014 16.8484 17.0385 16.7159Z" fill="#CCC9C8" />
                        </svg>
                    </div>
                </ShareDialog>
                <div onClick={() => dispatch(resetChat(currentChat.id))}>
                    <svg className=" cursor-pointer" width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="0.5" y="0.5" width="39" height="39" rx="19.5" stroke="#373740" />
                        <g clip-path="url(#clip0_1582_1537)">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M25.1947 12.7273C25.1947 12.3256 25.5186 12 25.9183 12C26.3179 12 26.6418 12.3256 26.6418 12.7273V16.3229C26.6418 16.7245 26.3179 17.0501 25.9183 17.0501H22.3409C21.9413 17.0501 21.6173 16.7245 21.6173 16.3229C21.6173 15.9212 21.9413 15.5956 22.3409 15.5956H24.3897C23.2062 14.4505 21.6456 13.8198 19.9999 13.8198C16.5035 13.8198 13.6693 16.6684 13.6693 20.1826C13.6693 23.6968 16.5035 26.5455 19.9999 26.5455C23.4964 26.5455 26.3306 23.6969 26.3306 20.1826C26.3306 19.7809 26.6545 19.4553 27.0541 19.4553C27.4538 19.4553 27.7777 19.781 27.7777 20.1826C27.7777 24.4999 24.2953 28 19.9999 28C15.7046 28 12.2222 24.4999 12.2222 20.1826C12.2222 15.8653 15.7046 12.3652 19.9999 12.3652C21.9242 12.3652 23.7658 13.0772 25.1947 14.3668V12.7273Z" fill="#CCC9C8" />
                        </g>
                        <defs>
                            <clipPath id="clip0_1582_1537">
                                <rect width="16" height="16" fill="white" transform="translate(12 12)" />
                            </clipPath>
                        </defs>
                    </svg>
                </div>
            </div>}
            <div className="cursor-pointer md:hidden" onClick={() => router.push('/')}><IoCreateOutline size={25} /></div>
        </div>
    )
}