import { userLogOut } from "@/services/auth";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const response = await userLogOut();
    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json({ success: false, error: "Server error. Please try again." });
  }
}
