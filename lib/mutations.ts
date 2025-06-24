import { prisma } from './prisma';
import bcrypt from 'bcrypt'

export const mutations = {
    async createEvent(data: {
        name: string;
        date?: string;
        location?: string;
        creatorId: string;
    }) {
        const event = await prisma.event.create({
            data: {
                name: data.name,
                date: data.date ? new Date(data.date) : undefined,
                location: data.location,
                creatorId: data.creatorId,
            },
        });
        return event;
    },

    async addGuest(data: {
        eventId: string;
        name: string;
        email?: string;
    }) {
        return await prisma.guest.create({
            data: {
                eventId: data.eventId,
                name: data.name,
                email: data.email,
            },
        });
    },

    async createUser({
        username,
        email,
        password,
        role,
    }: {
        username: string
        email?: string
        password: string
        role: 'COUPLE' | 'PLANNER' | 'GUEST'
    }) {
        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await prisma.user.create({
            data: {
                username,
                email: email || '',
                password: hashedPassword,
                role,
            },
        })

        return user
    },
};