import { PrismaClient } from "@prisma/client";

//This function creates a new instance of PrismaClient. It’s wrapped in a function to make it easier to create a new instance when needed.
const prismaClientSingleton = () => {
  return new PrismaClient();
};

// This block extends the global namespace with a prisma variable. This is necessary to avoid TypeScript errors when attaching the Prisma Client instance to the global object.
declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

// This block extends the global namespace with a prisma variable. This is necessary to avoid TypeScript errors when attaching the Prisma Client instance to the global object.
const prisma = globalThis.prisma ?? prismaClientSingleton();

export default prisma;

// Attaching to Global Object in Development
if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma;
//In a non-production environment (e.g., development), this line attaches the prisma instance to the globalThis object. This prevents the creation of multiple PrismaClient instances during hot module replacement, which can occur when files are changed and recompiled in development.