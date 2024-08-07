"use server";

import { RegisterSchema } from "@/schemas";
import * as z from "zod";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";
import { getUserByEmail } from "@/data/user";
import { generateVerificationToken } from "@/lib/tokens";
import { redirect } from "next/navigation";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
    const validatedFields = RegisterSchema.safeParse(values);

    if(!validatedFields.success){
        return {
            error: "Invalid fields!"
        }
    }

    const {
        name,
        email,
        password,
        role,
    } = validatedFields.data;

    const hashedPassword = await bcrypt.hash(password, 10);
    const existingUser = await getUserByEmail(email);

    if(existingUser){
        return {
            error: "Email already in use"
        }
    }


    await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
            //@ts-ignore
            role: role,
        },
    });

    const verificationToken = await generateVerificationToken(email);


    return {
        success: "Verification code sent!",
        redirect: true,
    }
}