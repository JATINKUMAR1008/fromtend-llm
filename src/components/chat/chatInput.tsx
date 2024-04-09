import { FormEvent, useState } from "react";
import { Button } from "../ui/button";
import { FaArrowUpLong } from "react-icons/fa6";
import { useAppSelector } from "@/app/reducers/store";
import { useDispatch } from "react-redux";
import { changeFetchState } from "@/app/reducers/slice/global/global.slice";

interface IProps {
    onSubmit: (input: string) => void
}

export default function ChatInput({ onSubmit }: IProps) {
    const [input, setInput] = useState("")
    const dispatch = useDispatch()
    const isFetching = useAppSelector(state => state.global.isFetching)
    const handleSubmit = () => {
        dispatch(changeFetchState())
        console.log(input)
        onSubmit(input)
    }
    const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        // console.log("why not working");
        if (e.key === "Enter") {
            handleSubmit();
        }
    };
    const handleClick = () => {
        handleSubmit();
    }

    return (
        <div className="absolute max-h-[10%] h-full bottom-3 xl:px-56 px-10  z-10 gap-3 w-full m-auto flex items-center justify-between ">
            <div className="border w-full px-2 py-4 flex h-full items-center rounded-xl">
                <input placeholder="enter message" className="bg-transparent md:px-3 relative w-full h-full outline-none"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyUp={handleKeyDown}
                    disabled={isFetching}
                />
                <Button
                    className="relative p-4 bg-white hover:bg-white w-10 h-10 text-lg disabled:bg-muted"
                    onClick={handleClick}
                    disabled={isFetching}
                >
                    <FaArrowUpLong size={40} className="text-neutral-900" />
                </Button>
            </div>
        </div>
    )
}