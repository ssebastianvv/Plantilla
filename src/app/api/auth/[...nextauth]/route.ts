import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

declare module "next-auth" {
    interface Session {
        user: {
            id: string; 
            name?: string | null;
            email?: string | null;
            token?: any; 
        };
        accessToken?: any; // Se añade el token a la sesión
    }
}

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                try {
                    const response = await fetch(`PETICIÓN`, {
                        method: 'POST',
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            email: credentials?.email,
                            password: credentials?.password
                        })
                    });

                    const data = await response.json();

                    if (response.ok && data.user) {
                        return {
                            ...data.user,
                            token: data.token
                        };
                    } else {
                        throw new Error(data.message || 'Error al iniciar sesión');
                    }
                } catch (error) {
                    console.error("Error en la autenticación:", error);
                    return null;
                }
            }
        })
    ],
    debug: process.env.NODE_ENV === 'development',  
    session: {
        strategy: "jwt", 
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id; 
                token.name = user.name;
                token.email = user.email;
                // token.accessToken = user.token; // Guardar el token
            }
            return token; 
        },
        
        async session({ session, token }) {
            if (token) {
                // session.user.id = token.id as string;
                // session.user.name = token.name as string;
                // session.user.email = token.email as string;
                // session.accessToken = token.accessToken; 
            }
            return session; 
        }
    },  
});

export { handler as GET, handler as POST };
