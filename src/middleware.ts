import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Helper function to get cookies
function getCookie(request: NextRequest, cookieName: string): string | undefined {
    const cookies = request.cookies;

    if (cookies) {
        return cookies.get(cookieName)?.value;
    }
    return undefined;
}

export function middleware(request: NextRequest) {
    // Check for the presence of an access_token in the cookies
    
    console.log("Cookies:", request.cookies);    
    const accessToken = getCookie(request, "access_token");

    // If no access token and trying to visit /about, redirect to login
    if (!accessToken && request.nextUrl.pathname.startsWith("/about")) {
        return NextResponse.redirect(new URL("/auth/login", request.url));
    }

    // If the user is logged in or not visiting /about, allow the request to proceed
    return NextResponse.next();
}

export const config = {
    matcher: "/about", // Apply the middleware only to /product
};






// Helper function to retrieve a cookie by name
// function getCookie(request: NextRequest, cookieName: string): string | undefined {
//     const cookies = request.headers.get("cookie");
//     console.log("Cookies:", cookies);
    
//     if (cookies) {
//         const match = cookies.match(new RegExp(`(^| )${cookieName}=([^;]+)`));
//         if (match) {
//             return match[2];
//         }
//     }
//     return undefined;
// }

// export function middleware(request: NextRequest) {
//     // Check for the presence of an access_token in the cookies
//     const accessToken = getCookie(request, "access_token");
//     console.log(`access token: ${accessToken}`);

//     if (accessToken) {
//         // If access token exists, proceed to the requested page
//         return NextResponse.next();
//     } else {
//         // If no access token, redirect to login page
//         return NextResponse.redirect(new URL("/auth/login", request.url));
//     }
// }

// export function middleware(request: NextRequest) {
//     const isLogin = false;
//     if (isLogin) {
//         return NextResponse.next();
//     } else {
//         return NextResponse.redirect(new URL("/auth/login", request.url));
//     }
// }