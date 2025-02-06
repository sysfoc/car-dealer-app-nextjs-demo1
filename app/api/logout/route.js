import { NextResponse } from "next/server";

export async function POST() {
  try {
    const response = NextResponse.json(
      { message: "Logged out successfully" },
      { status: 200 },
    );

    // Clear the token cookie
    response.cookies.set("token", "", {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      maxAge: -1, // Expire the cookie immediately
    });

    return response;
  } catch (error) {
    return NextResponse.json({ error: "Error during logout" }, { status: 500 });
  }
}
