import { createNewChat } from "@/utils/chats";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    const token = req.cookies.get("token")?.value || "";
    const body = await req.json();
    console.log(body)
    const chatId = await createNewChat(token, body.label || "")
    return NextResponse.json(chatId)
}