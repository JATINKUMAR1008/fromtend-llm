import { deleteChat } from "@/utils/chats";
import { NextRequest, NextResponse } from "next/server";

export const GET = async(req:NextRequest) =>{
    const token = req.cookies.get("token")?.value || "";
    const chatId= req.nextUrl.searchParams.get("chatId") || "";
    if(chatId){
        const res = await deleteChat(chatId,token)
        return NextResponse.json(res);
    }
    else{
        return NextResponse.json({error:"Chat Id not provided"});
    }
}