import { Button } from "../ui/button";

export default function Sidebar() {
    return (
        <div className="max-w-[350px] w-full h-screen flex flex-col py-3 px-4 bg-neutral-800">
            <Button className="w-full  p-6 mt-5">
                Create New Chat
            </Button>
            <div className="flex flex-col overflow-y-scroll">
                <h3 className="my-3 text-lg font-medium px-2 ">Chat History</h3>
            </div>
        </div>
    )
}