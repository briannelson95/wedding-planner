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

    async updateEvent(
        eventId: string,
        data: Partial<{ name: string; date: string; location: string; notes?: string; }>
    ) {
        const { date, ...rest } = data;

        let parsedDate: Date | undefined = undefined;

        if (date) {
            // Parse full datetime-local string into Date object
            parsedDate = new Date(date); // Automatically handled as local time
        }

        const event = await prisma.event.update({
            where: { id: eventId },
            data: {
                ...rest,
                ...(parsedDate ? { date: parsedDate } : {}),
            },
        });

        return event;
    },

    async createGuestBookEntry(data: { 
        fName: string, 
        lName: string,
        side: string, 
        email?: string, 
        phone?: string, 
        address?: string, 
        notes?: string 
    }) {
        return await prisma.guestBookEntry.create({
            data
        })
    },

    async updateGuestBookEntry(id: string, data: Partial<{ 
        fName: string,
        lName: string,
        side: string, 
        email?: string, 
        phone?: string, 
        address?: string, 
        notes?: string 
    }>){
        return await prisma.guestBookEntry.update({
            where: { id },
            data
        })
    },

    async deletGuestBookEntry(id: string) {
        return await prisma.guestBookEntry.delete({
            where: { id }
        })
    },

    async addEventGuest({
        eventId,
        guestBookEntryId,
    }: {
        eventId: string,
        guestBookEntryId: string,
    }) {
        return await prisma.eventGuest.create({
            data: {
                eventId,
                guestBookEntryId,
                rsvp: 'PENDING'
            }
        })
    },

    async updateEventGuestRsvp({
        eventId,
        guestBookEntryId,
        rsvp,
    }: {
        eventId: string;
        guestBookEntryId: string;
        rsvp: 'YES' | 'NO' | 'PENDING';
    }) {
        return await prisma.eventGuest.update({
            where: {
                eventId_guestBookEntryId: { eventId, guestBookEntryId }, // compound unique constraint
            },
            data: {
                rsvp,
            },
        });
    },

    async removeEventGuest(eventId: string, guestBookEntryId: string) {
        return await prisma.eventGuest.delete({
            where: {
                eventId_guestBookEntryId: { eventId, guestBookEntryId },
            },
        });
    },

};