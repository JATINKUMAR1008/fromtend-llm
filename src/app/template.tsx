"use client"
import Sidebar from "@/components/sidebar/sidebar"
import { ReduxProvider } from "./provider/redux.provider"
import { usePathname } from "next/navigation"
export default function Template({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()

    return pathname !== "/auth/login" ? (
        <ReduxProvider>
            <main className="flex min-h-screen w-full">
                <div className="h-full max-w-[300px] md:w-full w-0">
                    <Sidebar />
                </div>
                <div className="h-full w-full">
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