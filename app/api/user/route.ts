import { getCurrentUser } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const user = await getCurrentUser();
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const body = await request.json();
        const { twoFactorStatus, name } = body;

        const data: Record<string, any> = {};
        if (typeof twoFactorStatus === "boolean") {
            data.isTwoFactorEnabled = twoFactorStatus;
        }
        if (typeof name === "string" && name.trim()) {
            data.name = name.trim();
        }

        if (Object.keys(data).length === 0) {
            return NextResponse.json({ error: "No valid fields to update" }, { status: 400 });
        }

        const updatedUser = await prisma.user.update({
            where: { id: user.id },
            data,
        });

        return NextResponse.json(updatedUser);
    } catch (error) {
        return NextResponse.json({ error: "An error occurred" }, { status: 500 });
    }
}
