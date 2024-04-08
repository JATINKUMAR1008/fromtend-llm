import type { NextApiRequest, NextApiResponse } from 'next'
import { NextRequest } from 'next/server';
import { Stream } from 'stream';
import { pipeline } from 'stream/promises';

// export const runtime = 'edge'
// export const maxDuration = 300

export default async function handler(req: NextRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const body = req.body;
    console.log(body);
    if (body) {
      //@
      const response = await fetch(`${process.env.NEXT_PUBLIC_API}/ai_response/${body.chatId}`, {
        method: 'POST',
        body: JSON.stringify({ input_str: body.input }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      await pipeline(response.body, res);
    } else {
      res.status(400).json({ error: "Invalid request body" });
    }

  } else {
    // Handle any other HTTP method
    res.status(405).json({ error: "Method not allowed" })
  }
}