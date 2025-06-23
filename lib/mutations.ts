import { prisma } from './prisma';

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
    }
};