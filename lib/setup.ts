import { prisma } from './prisma';

export async function isFirstSetup() {
    const user = await prisma.user.findFirst({
        where: {
            OR: [
                { role: 'COUPLE' },
                { role: 'PLANNER'},
            ]
        }
    });

    return !user;
}