import { NextResponse } from "next/server";
import { IUser } from "@/@types/IUser";
import { userRegister } from "@/services/auth";

export async function POST(request: Request) {
  try {
    const formData: IUser = await request.json();
    const response = await userRegister(formData);
    return NextResponse.json({ success: true, data: response.data });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json({ success: false, error: "Server error. Please try again." });
  }
}
