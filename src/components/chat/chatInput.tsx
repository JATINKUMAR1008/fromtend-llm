import { FormEvent, useEffect, useRef, useState } from "react";
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
    const [input, setInput] = useState("");
    const [inputHeight, setInputHeight] = useState(60); // Default height
    const inputRef = useRef<HTMLTextAreaElement>(null);
    const dispatch = useDispatch();
    const isFetching = useAppSelector(state => state.global.isFetching);

    const handleSubmit = () => {
        if (input.trim() !== "") { // Check if input is not empty or contains only spaces
            dispatch(changeFetchState());
            onSubmit(input.trim());
            setInput("");
            setInputHeight(60); // Reset height
        }
    };

    const handleChange = () => {
        if (inputRef.current) {
            setInput(inputRef.current.value);
            setInputHeight(inputRef.current.scrollHeight); // Adjust height based on content
        }
    };

    const handleKeyDown = async (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey && input.trim() !== "") {
            e.preventDefault();
            handleSubmit();
        }
    };

    const handleClick = () => {
        if (input.trim() !== "") {
            handleSubmit();
        }
    };

    useEffect(() => {
        setInput(suggestions || "");
        setInputHeight(30); // Reset height when suggestions change
    }, [suggestions]);

    useEffect(() => {
        if (!input.trim()) {
            setInputHeight(30); // Reset height when input is empty
        }
    }, [input]);

    return (
        <div className="absolute bottom-16 lg:px-0 z-10 gap-3 xl:w-[60%] md:w-[90%] w-[100%] m-auto flex flex-col items-center justify-start ">
            <div className="w-full max-h-[120px] min-h-[20px] h-full px-3 py-2 gap-2 flex items-center rounded-2xl bg-[#28282E] overflow-auto m-auto justify-center scrollbar-custom">
                <textarea
                    ref={inputRef}
                    placeholder="Message GAIA..."
                    className="bg-transparent md:px-3 py-1 text-sm relative w-full h-full outline-none resize-none"
                    style={{ height: inputHeight }}
                    value={input}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    disabled={isFetching}
                />
                <Button
                    className="relative p-2.5 rounded-xl bg-[#C05037] text-lg disabled:bg-[#807D7D]"
                    onClick={handleClick}
                    disabled={isFetching || input.trim() === ""}
                    variant="ghost"
                >
                    <FaArrowUpLong size={20} className="text-white-950 disabled:text-black" />
                </Button>
            </div>
            <p className="text-xs text-muted-foreground w-full text-center hidden md:block">This is only the testing phase of the product and doesn{"'"}t represent the final product.</p>
            <p className="text-xs text-muted-foreground w-full text-center ">Please frame your Questions/Prompt properly to accept relevant responses.</p>
        </div>
    );
}
