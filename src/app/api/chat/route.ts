import { deleteChat, getHistory } from "@/utils/chats";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
    const token = req.cookies.get("token")?.value || "";
    const chatHistory = await getHistory(token);
    // Convert token to string
    return NextResponse.json(chatHistory);
}
export const DELETE = async (req: NextRequest) => {
    const token = req.cookies.get("token")?.value || "";
    const chatId = req.nextUrl.searchParams.get("chatId") || "";
    console.log(chatId)
    if (chatId) {
        const res = await deleteChat(chatId, token)
        return NextResponse.json(res);
    }
    else {
        return NextResponse.json({ error: "Chat Id not provided" });
    }
}