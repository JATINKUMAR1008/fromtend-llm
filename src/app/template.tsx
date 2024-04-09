"use client"
import Sidebar from "@/components/sidebar/sidebar"
import { ReduxProvider } from "./provider/redux.provider"
import { usePathname } from "next/navigation"
export default function Template({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()

    return pathname !== "/auth/login" ? (
        <ReduxProvider>
            <main className="flex min-h-screen w-full items-center justify-between ">
                <div className="max-w-[15%] h-full lg:w-full w-0">
                    <Sidebar />
                </div>
                <div className="lg:max-w-[85%] h-full max-w-[100%] w-full">
                    {children}
                </div>
            </main>
        </ReduxProvider>
    ) : (
        <div>
            {children}
        </div>
    )
}