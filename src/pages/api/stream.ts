import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const body = await req.body;
    console.log(body);

    let temp = true;

    const sendStreamStart = () => {
      res.write('stream start');
    };

    // Send "stream start" message initially
    sendStreamStart();

    try {
      let response;
      let streamStarted = false;

      while (temp) {
        response = await fetch(`${process.env.NEXT_PUBLIC_API}/ai_response/${body.chatId}`, {
          method: 'POST',
          body: JSON.stringify({ input_str: body.input }),
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (!streamStarted) {
          // Send "stream start" message if it's not sent before
          sendStreamStart();
          
        }

        const reader = response.body ? response.body.getReader() : null;
        const decoder = new TextDecoder();

        if (reader) {
          let chunk;
          while (!(chunk = await reader.read()).done) {
            streamStarted = true;
            let resChunk = decoder.decode(chunk.value, { stream: true });
            res.write(resChunk);
          }
          res.end();
          temp = false; // Set temp to false to exit the loop
        } else {
          res.end();
        }
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
    }
  } else {
    // Handle any other HTTP method
    res.status(405).json({ error: 'Method not allowed' });
  }
}
