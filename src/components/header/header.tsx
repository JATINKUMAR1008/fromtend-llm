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
        <div className="w-full fixed bg-neutral-800 z-10 flex py-2 items-center justify-between shadow-sm shadow-white  px-10">
            <div className="cursor-pointer lg:hidden" onClick={() => dispatch(changeSidebarState())}><RiMenu2Fill size={20} /></div>
            <h1 className="text-lg font-semibold font-sans">GAIA(Testing)</h1>
            <div className="cursor-pointer" onClick={() => router.push('/')}><IoCreateOutline size={25} /></div>
        </div>
    )
}