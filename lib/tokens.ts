import { getVerificationTokenByEmail } from '@/data/verification-token';
import { randomBytes } from 'crypto';
import prisma from '@/lib/prisma';
import { sendPasswordResetEmail, sendVerificationEmail } from '@/lib/mail';
import { getPasswordResetTokenByEmail } from '@/data/password-reset-token';
import { v4 as uuidv4 } from 'uuid';
import { getTwoFactorTokenByEmail } from '@/data/two-factor-token';






function generateRandomCode(): string {
    const characters = '0123456789';
    const codeLength = 6;
    let code = '';

    for (let i = 0; i < codeLength; i++) {
        const randomIndex = Math.floor(randomBytes(1).readUInt8(0) / 256 * characters.length);
        code += characters[randomIndex];
    }

    return code;
}







export const generateVerificationToken = async(
    email: string
) => {
    const token = generateRandomCode();
    const expires = new Date(new Date().getTime() + 10 * 60 * 1000)

    const existingToken = await getVerificationTokenByEmail(email);

    if(existingToken){
        await prisma.verificationToken.delete({
            where: {
                id: existingToken.id,
            }
        })
    }

    const verificationToken = await prisma.verificationToken.create({
        data: {
            email: email,
            token: token,
            expires: expires,
        }
    })

    await sendVerificationEmail(
        verificationToken.email,
        verificationToken.token
    )

    return verificationToken;
}








export const generatePasswordResetToken = async(
    email: string
) => {
    const token = uuidv4();
    const expires = new Date(new Date().getTime() + 10 * 60 * 1000)

    const existingToken = await getPasswordResetTokenByEmail(email);

    if(existingToken){
        await prisma.passwordResetToken.delete({
            where: {
                id: existingToken.id,
            }
        })
    }

    const passwordResetToken = await prisma.passwordResetToken.create({
        data: {
            email: email,
            token: token,
            expires: expires,
        }
    })

    return passwordResetToken;
}








export const generateTwoFactorToken = async(
    email: string
) => {
    const token = generateRandomCode();
    const expires = new Date(new Date().getTime() + 10 * 60 * 1000)

    const existingToken = await getTwoFactorTokenByEmail(email);

    if(existingToken){
        await prisma.twoFactorToken.delete({
            where: {
                id: existingToken.id,
            }
        })
    }

    const twoFactorToken = await prisma.twoFactorToken.create({
        data: {
            email: email,
            token: token,
            expires: expires,
        }
    })

    return twoFactorToken;
}