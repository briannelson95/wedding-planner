import { prisma } from './prisma';

export const queries = {
    async fetchEvents() {
        const allEvents = await prisma.event.findMany()
        console.log(allEvents)
        return allEvents;
    }
}