import { getUserByEmail } from "@/data/user";
import { getCurrentUser } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
    try {

        const currentUser = await getCurrentUser();

        if(!currentUser){
            return new Response('User not logged in', { status: 404 });
        }

        const body = await req.json();
        const { role } = body;

        const user = await getUserByEmail(currentUser.email!);
        if(!user){
            return new Response('User not found', { status: 404 });
        }

        await prisma.user.update({
            where: {
                id: user.id,
            },
            data: {
                role: role
            }
        })

        return new Response('User updated', { status: 200 });

    } catch (error : any) {
        if (error instanceof Error) {
            console.error(error.message);
            return new Response(error.message, { status: 500 });
        } else {
            console.error(error.message);
            return new Response('An unknown error occurred', { status: 500 });
        }
    }
}