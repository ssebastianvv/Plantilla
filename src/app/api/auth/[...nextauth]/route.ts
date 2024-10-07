import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { IUser } from "../interfaces/User"; 
import { cookies } from "next/headers";
import { URL_BASE } from "@/endpoint";

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text", placeholder: "example" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials): Promise<IUser | null> {
                const { username, password } = credentials || {};
            
                if (!username || !password) {
                    console.error("Username and password are required.");
                    return null;
                }

                const userLogin = await login(username, password);
                if (!userLogin) {
                    console.error("Login failed, no user returned.");
                    return null;
                }

                const { user, access_token } = userLogin;
                if (!user || !access_token) {
                    console.error("Login failed, user or access_token is missing.");
                    return null;
                }

                return {
                    id: user._id,
                    username: user.username,
                    name: user.name,
                    email: user.email,
                    token: access_token 
                } as IUser;
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            const cookieStore = cookies();
            if (user) {
                token.name = user.name || "";
                token.username = user.username || "";
                token.tokenBack = user.token || ""; 
                token.tokenFrontend = cookieStore.get("next-auth.session-token")?.value || ""; 
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user._id = token.id as string; 
                session.user.name = token.name as string;
                session.user.email = token.email as string;
                session.user.username = token.username as string;
                session.user.accessToken = token.tokenBack || ""; 
            }
            return session; 
        }
    },
    secret: process.env.NEXTAUTH_SECRET
});

async function login(username: string, password: string): Promise<{ user: IUser; access_token: string } | null> {
    try {
        const response = await fetch(`${URL_BASE}auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password })
        });

        if (!response.ok) {
            const errorResponse = await response.json();
            console.error("Error with the login:", errorResponse);
            return null;
        }

        return await response.json(); 
    } catch (error) {
        console.error("Error with the login", error);
        return null;
    }
}

export { handler as GET, handler as POST };
