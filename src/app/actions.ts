'use server';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getAbout() {
    const data = await prisma.users.findMany();
    return data;
}