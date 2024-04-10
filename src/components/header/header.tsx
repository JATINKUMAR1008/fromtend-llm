"use client"
import { RiMenu2Fill } from "react-icons/ri";
import { IoCreateOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/app/reducers/store";
import { useDispatch } from "react-redux";
import { changeSidebarState } from "@/app/reducers/slice/global/global.slice";

export default function Header() {
    const router = useRouter()
    const dispatch = useDispatch()
    return (
        <div className="w-full fixed z-10 flex py-4 items-center justify-between border-b-[1px] border-neutral-700   px-10">
            <div className="cursor-pointer md:hidden" onClick={() => dispatch(changeSidebarState())}><RiMenu2Fill size={20} /></div>
            <h1 className="text-lg font-semibold font-sans">GAIA<span className="ml-1 italic font-sans">(testing)</span></h1>
            <div className="cursor-pointer" onClick={() => router.push('/')}><IoCreateOutline size={25} /></div>
        </div>
    )
}