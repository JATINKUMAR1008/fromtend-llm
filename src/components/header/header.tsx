"use client"
import { RiMenu2Fill } from "react-icons/ri";
import { IoCreateOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
interface IProps {
    setOpen: (open: boolean) => void
}
export default function Header({ setOpen }: IProps) {
    const router = useRouter()
    return (
        <div className="w-full fixed bg-neutral-800 z-10 flex py-2 items-center justify-between shadow-sm shadow-white  px-10">
            <div className="cursor-pointer lg:hidden" onClick={() => setOpen(true)}><RiMenu2Fill size={20} /></div>
            <h1 className="text-lg font-semibold font-sans">GAIA(Testing)</h1>
            <div className="cursor-pointer" onClick={() => router.push('/')}><IoCreateOutline size={25} /></div>
        </div>
    )
}