import { NextResponse } from "next/server";
import { IUser } from "@/@types/IUser";
import axios from "axios";

export async function POST(request: Request) {
  try {
    const formData: IUser = await request.json();
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/register`, formData);

    if (response.data.success) {
      return NextResponse.json({ success: true, data: response.data });
    } else {
      return NextResponse.json({ success: false, error: "Registration failed." });
    }
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json({ success: false, error: "Server error. Please try again." });
  }
}
