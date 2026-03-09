import NextAuth, { DefaultSession } from "next-auth"
import { JWT as NextAuthJWT } from "next-auth/jwt"

declare module "next-auth" {
    interface Session extends DefaultSession {
        user: {
            id: string
            username: string
            email: string
        } & DefaultSession["user"]
    }

    interface User {
        id: string
        username: string
        email: string
    }
}

declare module "next-auth/jwt" {
    interface JWT extends NextAuthJWT {
        id: string
        username: string
        email: string
    }
}
