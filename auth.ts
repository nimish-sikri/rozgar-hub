import NextAuth from "next-auth"
import authConfig from "@/auth.config"
import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from "@/lib/prisma"
import { getUserById } from "@/data/user"
import { getTwoFactorConfirmationByUserId } from "./data/two-factor-confirmation"

export const { 
    auth, 
    handlers, 
    signIn, 
    signOut 
} = NextAuth({
    pages: {
        signIn: "/auth/login",
        error: "/auth/error",
    },
    events: {
        async linkAccount({ user }){
            await prisma.user.update({
                where: {
                    id: user.id,
                },
                data: {
                    emailVerified: new Date(),
                    isSocial: true,
                }
            })
        }
    },
    callbacks: {
        async signIn({ user, account }){
            
            if(account?.provider !== "credentials") return true;

            const existingUser = await getUserById(user.id!);
            
            if(!existingUser?.emailVerified) return false;

            if(existingUser.isTwoFactorEnabled) {
                const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id);

                if(!twoFactorConfirmation) return false;

                await prisma.twoFactorConfirmation.delete({
                    where: {
                        id: twoFactorConfirmation.id
                    }
                })
            }

            return true;
        },
        async session({ token, session }) {
            if (token.sub && session.user) {
                //@ts-ignore
                session.user.id = token.sub;
                //@ts-ignore
                session.user.role = token.role;
            }

            if (session.user) {
                session.user.name = token.name;
                //@ts-ignore
                session.user.isTwoFactorEnabled = token.isTwoFactorEnabled;
                //@ts-ignore
                session.user.isTwoFactorPopupShown = token.isTwoFactorPopupShown;
                //@ts-ignore
                session.user.role = token.role;
            }

            return session;
        },
        async jwt({ token }){
            if (!token.sub) return token;

            const existingUser = await getUserById(token.sub);

            if (!existingUser) return token;


            token.name = existingUser.name;
            token.email = existingUser.email;
            token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled;
            token.isTwoFactorPopupShown = existingUser.isTwoFactorPopupShown;
            token.role = existingUser.role;

            
            return token;
        }
    },
    adapter: PrismaAdapter(prisma),
    session: { strategy: "jwt" },
    ...authConfig
})