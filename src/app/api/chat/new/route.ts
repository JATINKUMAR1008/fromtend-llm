import { createNewChat } from "@/utils/chats";
import { NextRequest, NextResponse } from "next/server";

export const GET = async(req:NextRequest)=>{
    const token = req.cookies.get("token")?.value || "";
    const chatId  = await createNewChat(token)
    return NextResponse.json(chatId)
}