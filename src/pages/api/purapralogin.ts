import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

// This is a simple mock function, you can replace this with your actual authentication logic.
async function authenticateUser(email: string, password: string | number) {
    if (email === "user@example.co" && password === "password") {
        return {
        access_token: "your_generated_access_token_here",  // Generate your actual token (e.g., JWT)
        refresh_token: "your_generated_refresh_token_here",
        };
    }
    return null;
}

export async function POST(request: NextRequest) {
    const body = await request.json();
    const { email, password } = body;

    const user = await authenticateUser(email, password);

    if (!user) {
        return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
        );
    }

    // Set the access_token and refresh_token in cookies
    const response = NextResponse.json({ message: "Login successful" });

    // Set cookies for the tokens
    response.cookies.set("access_token", user.access_token, {
        httpOnly: true,   // Make the cookie inaccessible to JavaScript
        secure: process.env.NODE_ENV === "production", // Secure cookies in production
        path: "/",        // Cookie is valid for the entire site
        maxAge: 60 * 60 * 24, // 1 day expiration time
    });

    response.cookies.set("refresh_token", user.refresh_token, {
        httpOnly: true,   // Make the cookie inaccessible to JavaScript
        secure: process.env.NODE_ENV === "production", // Secure cookies in production
        path: "/",        // Cookie is valid for the entire site
        maxAge: 60 * 60 * 24 * 7, // 7 days expiration time
    });

    return response;
}
