import { prisma } from './prisma';

export const queries = {
    async fetchEvents() {
        const allEvents = await prisma.event.findMany({
            include: {
                creator: {
                    select: {
                        id: true,
                        username: true
                    }
                }
            }
        })
        console.log(allEvents)
        return allEvents;
    },

    async fetchEventGuests(eventId: string) {
        return await prisma.eventGuest.findMany({
            where: { eventId },
            include: {
                guestBookEntry: true,
            },
            orderBy: [
                {
                    guestBookEntry: {
                       lName: 'asc',
                    },
                },
                {
                    guestBookEntry: {
                        fName: 'asc'
                    }
                }
            ],
        });
    },

    async fetchAvailableGuestBookEntriesForEvent(eventId: string) {
        const invitedGuests = await prisma.eventGuest.findMany({
            where: { eventId },
            select: { guestBookEntryId: true }
        });

        const excludeIds = invitedGuests.map(g => g.guestBookEntryId);

        return prisma.guestBookEntry.findMany({
            where: {
                id: {
                    notIn: excludeIds,
                },
            },
            orderBy: [
                { lName: 'asc' },
                { fName: 'asc' }
            ]
        })
    },

    async singleEvent(id: string) {
        const event = await prisma.event.findUnique({
            where: { id },
            include: {
                creator: {
                    select: { id: true, email: true, name: true, role: true },
                },
                guests: true
            }
        })
        return event
    },

    async fetchGuestBookEntries(amount?: number) {
        return await prisma.guestBookEntry.findMany({
            orderBy: amount 
                ? { createdAt: 'desc'}
                : [{ lName: 'asc' }, { fName: 'asc' }],
            ...(amount ? {take: amount} : {})
        })
    },
}