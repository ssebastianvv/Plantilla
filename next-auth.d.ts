import NextAuth from "next-auth";

declare module "next-auth" {
    interface User {
        token: string; 
        username: string; 
        accessToken?: string; 
    }
    
    interface Session {
        user: {
            _id: string;
            username: string;
            name: string;
            email: string;
            tokenBack: string;
            tokenFrontend: string;
            accessToken: string; 
        }
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        tokenBack: string;
        tokenFrontend: string;
        name: string;
        email: string;
        username: string;
        accessToken: string; 
    }
}
