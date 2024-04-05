import { getHistory } from "@/utils/chats";
import { NextRequest, NextResponse } from "next/server";

export const GET = async(req: NextRequest) =>{
    const token = req.cookies.get("token")?.value || "";
    console.log(token)
    const chatHistory = await getHistory(token);
     // Convert token to string
    return NextResponse.json(chatHistory);
}