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

    async fetchGuestBookEntries() {
        return await prisma.guestBookEntry.findMany({
            orderBy: [
                { lName: 'asc' },
                { fName: 'asc' }
            ],
        })
    },
}