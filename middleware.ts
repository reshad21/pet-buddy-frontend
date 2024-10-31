/* eslint-disable @typescript-eslint/no-explicit-any */
import { getCurrentUser } from "@/services/AuthService";
import { NextRequest, NextResponse } from "next/server";

const AuthRoutes = ["/login", "/register"] as const;

type Role = "USER" | "ADMIN";

const roleBasedRoutes: Record<Role, RegExp[]> = {
    USER: [/^\/profile/],
    ADMIN: [/^\/admin/],
};

// Type guard to check if the path is an allowed authentication route
function isAuthRoute(path: string): path is "/login" | "/register" {
    return AuthRoutes.includes(path as any);
}

export async function middleware(request: NextRequest) {
    const { pathname, searchParams } = request.nextUrl;
    const email = searchParams.get("email");
    const token = searchParams.get("token");

    // Handle reset password route with email and token parameters
    if (email && token) {
        const resetPasswordUrl = new URL("/reset-password", request.url);
        resetPasswordUrl.searchParams.set("email", email);
        resetPasswordUrl.searchParams.set("token", token);
        return NextResponse.rewrite(resetPasswordUrl);
    }

    const user = await getCurrentUser();

    // Redirect unauthenticated users to login if they are not on an auth route
    if (!user) {
        if (isAuthRoute(pathname)) {
            return NextResponse.next();
        } else {
            return NextResponse.redirect(
                new URL(`/login?redirect=${pathname}`, request.url)
            );
        }
    }

    const role = user.role as Role; // Ensure role is a valid key for role-based routes

    // Allow access if the user has the right role for the route
    if (role && roleBasedRoutes[role]) {
        const routes = roleBasedRoutes[role];
        if (routes.some((route) => pathname.match(route))) {
            return NextResponse.next();
        }
    }

    // Redirect to home if the user doesn't have access
    return NextResponse.redirect(new URL("/", request.url));
}

// Define the paths where the middleware should be applied
export const config = {
    matcher: [
        "/profile",
        "/profile/:page*",
        "/admin",
        "/login",
        "/register",
        "/reset-password"
    ],
};
