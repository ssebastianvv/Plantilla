import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { IUser } from "../interfaces/User"; 
import { cookies } from "next/headers";

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "example@gmail.com" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials): Promise<IUser | null> {
                const { email, password } = credentials || {};
                if (!email || !password) {
                    console.error("Email and password are required.");
                    return null;
                }

                const userLogin = await login(email, password);
                if (!userLogin) return null;

                const { user, token } = userLogin;
                return { ...user, token } as IUser;
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            const cookieStore = cookies();
            if (user) {
                const typedUser = user as IUser; // Aserción de tipo
                token.name = typedUser.name || "";
                token.email = typedUser.email || "";
                token.tokenBack = typedUser.token || "";
                token.tokenFrontend = cookieStore.get("next-auth.session-token")?.value || ""; 
            }
            return token;
        
        },
        async session({ session, token }) {
            const tokens = {
                tokenBack: token.tokenBack,
                tokenFrontend: token.tokenFrontend
            };
            return {
                ...session,
                user: {
                    ...session.user,
                    tokens
                }
            };
        }
    },
    secret: process.env.NEXTAUTH_SECRET
});

async function login(email: string, password: string): Promise<{ user: IUser; token: string } | null> {
    try {
        const response = await fetch("http://192.168.88.39:7000/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });

        if (!response.ok) throw new Error("Error with the response");

        return await response.json();
    } catch (error) {
        console.error("Error with the login", error);
        return null;
    }
}

export { handler as GET, handler as POST };
