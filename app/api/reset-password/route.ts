import { NextResponse } from "next/server";
import { resetPassword } from "@/lib/auth-client";

export async function POST(req: Request) {
  try {
    const { newPassword, token } = await req.json();

    if (!newPassword || !token) {
      return NextResponse.json(
        { error: "Missing newPassword or token" },
        { status: 400 },
      );
    }

    const result = await resetPassword({ newPassword, token });

    return NextResponse.json(result || { success: true });
  } catch (error) {
   
    return NextResponse.json(
      { error: "Failed to reset password" },
      { status: 500 },
    );
  }
}
