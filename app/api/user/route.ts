import { getCurrentUser } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { TaskSchema } from "@/schemas";
import * as z from "zod";

export async function POST(request: Request) {
    try {

        const user = await getCurrentUser();

        if(!user){
            return new Response('User not found', { status: 404 });
        }

        const body = await request.json();

        const { twoFactorStatus } = body;

        console.log(twoFactorStatus);

        const updatedUser = await prisma.user.update({
            where: {
                id: user.id,
            },
            data: {
                isTwoFactorEnabled: twoFactorStatus
            }
        })

        return new Response(JSON.stringify(updatedUser), { status: 200, headers: { 'Content-Type': 'application/json' } });

    } catch (error) {
        if (error instanceof Error) {
            return new Response(error.message, { status: 500 });
        } else {
            return new Response('An unknown error occurred', { status: 500 });
        }
    }
}