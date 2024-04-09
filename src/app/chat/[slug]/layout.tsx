import Header from "@/components/header/header"
export default function ChatLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Header />
            {children}
        </>
    )
}