import { resetChat } from "@/utils/chats";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (req: NextRequest) => {
    const token = req.cookies.get("token")?.value || "";
    const chatId = req.nextUrl.searchParams.get("chatId") || "";
    console.log(chatId)
    if (chatId) {
        const res = await resetChat(chatId, token)
        return NextResponse.json(res);
    }
    else {
        return NextResponse.json({ error: "Chat Id not provided" });
    }
}