import { FormEvent, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { FaArrowUpLong } from "react-icons/fa6";
import { useAppSelector } from "@/app/reducers/store";
import { useDispatch } from "react-redux";
import { changeFetchState } from "@/app/reducers/slice/global/global.slice";

interface IProps {
    onSubmit: (input: string) => void
    suggestions?: string
}

export default function ChatInput({ onSubmit, suggestions }: IProps) {
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
        if (e.key === "Enter" && input.length > 0) {
            handleSubmit();
        }
    };
    const handleClick = () => {
        handleSubmit();
    }
    useEffect(() => {
        console.log("input", isFetching)
        setInput("")
    }, [isFetching])
    useEffect(() => {
        setInput(suggestions || "")
    }, [suggestions])

    return (
        <div className="absolute md:max-h-[10%] max-h-[15%] h-full bottom-3 lg:px-0  z-10 gap-3 w-full m-auto flex flex-col items-center justify-start ">
            <div className="border w-full max-h-[70px] h-full px-2 gap-2 flex items-center rounded-2xl">
                <input placeholder="Enter message" className="bg-transparent md:px-3 text-sm relative w-full h-full outline-none"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyUp={handleKeyDown}
                    disabled={isFetching}
                />
                <Button
                    className="relative p-4 bg-white  hover:bg-white text-lg disabled:bg-muted"
                    onClick={handleClick}
                    disabled={isFetching || input.length === 0}
                    variant="ghost"
                >
                    <FaArrowUpLong size={10} className="text-black" />
                </Button>
            </div>
            <p className="text-xs text-muted-foreground w-full text-center">This is only the testing phase of product doesn{"'"}t represent the final product.</p>
        </div>
    )
}