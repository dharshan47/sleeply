import { NextResponse } from "next/server";
import { resetPassword } from "@/lib/auth-client";

export async function POST(req: Request) {
  try {
    const { newPassword, token } = await req.json();

    const result = await resetPassword({ newPassword, token });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Reset password API error:", error);
    return NextResponse.json(
      { error: "Failed to reset password" },
      { status: 500 }
    );
  }
}
