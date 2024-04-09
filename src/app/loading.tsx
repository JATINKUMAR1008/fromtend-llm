import { RiLoader2Line } from "react-icons/ri"
export default function Loading() {
    // You can add any UI inside Loading, including a Skeleton.
    return <div className="absolute inset-0 w-screen h-screen flex items-center justify-center bg-neutral-800">
        <RiLoader2Line size={50} className="animate-spin text-neutral-300" />
    </div>
}