"use client"
import Sidebar from "@/components/sidebar/sidebar"
import { ReduxProvider } from "@/app/provider/redux.provider"
import { usePathname } from "next/navigation"

export default function Template({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()
    


    return pathname !== "/auth/login" && !pathname.startsWith("/share/") ? (
        <ReduxProvider>
            <main className="flex min-h-screen w-full">
                <div className="h-full max-w-[250px] md:w-full w-0">
                    <Sidebar />
                </div>
                <div className="h-full w-full overflow-hidden">
                    {children}
                </div>
            </main>
        </ReduxProvider>
    ) : (
        <div>
            <ReduxProvider>
            {children}
            </ReduxProvider>
        </div>
    )
}