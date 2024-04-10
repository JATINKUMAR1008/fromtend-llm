import { loginUser } from "@/utils/auth";
import { serialize } from "cookie";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest, res: NextResponse) => {
  const body = await req.json();
  const data = await loginUser(body);
  if (data.response) {
    return new NextResponse(
      JSON.stringify({
        status: false,
        response: data.response,
      }),
    );
  } else {
    const serialized = serialize("token", data.access_token, {
      httpOnly: true,
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });
    return new NextResponse(
      JSON.stringify({
        status: true,
      }),
      {
        status: 200,
        headers: {
          "Set-Cookie": serialized,
        },
      }
    );
  }

};