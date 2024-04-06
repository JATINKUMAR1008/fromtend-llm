import type { NextApiRequest, NextApiResponse } from 'next'
import { NextRequest } from 'next/server';

export const runtime = 'edge'
export default async function handler(req: NextRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const body = await req.json()
    console.log(body)
    const response = await fetch(`${process.env.NEXT_PUBLIC_API}/ai_response/${body.chatId}`, {
      method: 'POST',
      body: JSON.stringify({ input_str: body.input }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const stream = new ReadableStream({
      async start(controller) {
        const reader = response.body ? response.body.getReader() : null;
        const decoder = new TextDecoder();

        if (reader) {
          let chunk = await reader.read();
          while (!chunk.done) {
            let resChunk = decoder.decode(chunk.value, { stream: true });
            //@ts-ignore
            controller.enqueue(resChunk)
            chunk = await reader.read();
          }
        }
        controller.close()

      }

    })
    return new Response(stream)

  } else {
    // Handle any other HTTP method
    res.status(405).json({ error: "Method not allowed" })
  }
}