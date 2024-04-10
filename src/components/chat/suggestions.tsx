const QUESTIONS_ARRAY = [
    {
        label: "Freeport Revenue 2004-2007",
        question: "Give me a table of Freeport revenue from 2004 to 2007."
    }, {
        label: "Freeport Debt to Equity Ratio",
        question: "Give debt to equity ratio of Freeport from 2004 onwards.",
    }, {
        label: "Freeport Revenue by Country",
        question: "Give me major countries where Freeport has most revenues from in percentage.",
    }, {
        label: "Freeport Directors Compensation",
        question: "List compensation for directors of Freeport for all years."
    }
]
interface IPageProps {
    onClick: (e: string) => void
}
export default function SuggestedQuestions({ onClick }: IPageProps) {
    const handleClick = (idx: number) => {
        const question = QUESTIONS_ARRAY[idx].question
        onClick(question)
    }
    return (
        <div className="w-full grid lg:grid-cols-2 mt-10 gap-4 ">
            {QUESTIONS_ARRAY.map((item, index) => (
                <div key={index} className={index < 2 ? "py-3 max-w-[300px] md:max-w-[100%] px-4 cursor-pointer hover:bg-neutral-600 border border-neutral-600 rounded-md flex flex-col items-start w-full" : "hidden py-3 max-w-[300px] md:max-w-[100%] px-4 cursor-pointer hover:bg-neutral-600 border border-neutral-600 rounded-md md:flex flex-col items-start w-full"} onClick={() => handleClick(index)}>
                    <h1 className="text-sm text-neutral-200">{item.label}</h1>
                    <p className="text-xs mt-1 text-neutral-500 overflow-hidden  whitespace-nowrap text-ellipsis w-full">{item.question}</p>
                </div>
            ))}
        </div>
    )
}