import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
export const GET = async (req: NextRequest) => {
    cookies().delete("token");
    return new NextResponse(JSON.stringify({
        status: true,
    }),);
};