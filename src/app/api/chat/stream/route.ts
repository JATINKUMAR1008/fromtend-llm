import { NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
export const POST = async (req: NextRequest,res:NextApiResponse) => {
    const body = await req.json()
    const response = await fetch(`${process.env.NEXT_PUBLIC_API}/ai_response/${body.chatId}`, {
        method: 'POST',
        body: JSON.stringify({ input_str: body.input }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const reader = response.body ? response.body.getReader() : null;
    const decoder = new TextDecoder();
    if (reader) {
            let chunk = await reader.read();
            let result = '';
            while (!chunk.done) {
                let resChunk = decoder.decode(chunk.value, { stream: true });
                //@ts-ignore
                res.write(resChunk)
                chunk = await reader.read();
            }
            res.end()
        }
    else{
        return new NextResponse("error", {status: 500})
    }
}