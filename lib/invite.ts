import { prisma } from './prisma';
import { randomBytes } from 'crypto';

export async function createInvite({
    email,
    role,
    eventId
}: {
    email: string
    role: 'COUPLE' | 'PLANNER' | 'GUEST'
    eventId?: string
}) {
    const token = randomBytes(32).toString('hex');

    const invite = await prisma.inviteToken.create({
        data: {
            email,
            role,
            token,
            eventId,
            expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
        },
    })

    return invite
}

export async function verifyInvite(token:string) {
    return await prisma.inviteToken.findUnique({
        where: { token }
    })
}