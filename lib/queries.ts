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
                },
                venue: true
            },
        })
        
        return allEvents;
    },

    async fetchQuickViewEvents() {
        const events = await prisma.event.findMany({
            take: 3,
            select: {
                id: true,
                name: true,
                date: true,
                creator: {
                    select: {
                        id: true,
                        username: true,
                    }
                },
                venue: {
                    select: {
                        name: true,
                    },
                },
            }
        })

        return events
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
                guests: true,
                eventGuests: {
                    include: {
                        guestBookEntry: true,
                    },
                },
                todos: {
                    orderBy: [
                        { complete: 'asc' },
                        { dueDate: 'asc' },
                    ],
                },
                venue: true
            }
        })
        return event
    },

    async fetchGuestBookEntries({
        page,
        pageSize = 10,
        newestFirst = false,
        takeOnlyRecent,
    }: {
        page?: number
        pageSize?: number
        newestFirst?: boolean
        takeOnlyRecent?: number // Optional: Just get the latest N
    }) {
        // ⏱ Quick recent entries (e.g., homepage)
        if (takeOnlyRecent) {
            const entries = await prisma.guestBookEntry.findMany({
                take: takeOnlyRecent,
                orderBy: { createdAt: 'desc' },
            })
            return entries
        }

        // 📄 Paginated GuestBook view
        const skip = ((page ?? 1) - 1) * pageSize

        const [entries, totalCount] = await Promise.all([
            prisma.guestBookEntry.findMany({
                skip,
                take: pageSize,
                orderBy: newestFirst
                ? { createdAt: 'desc' }
                : [{ lName: 'asc' }, { fName: 'asc' }],
            }),
            prisma.guestBookEntry.count(),
        ])

        const totalPages = Math.ceil(totalCount / pageSize)

        return {
            entries,
            totalPages,
            currentPage: page ?? 1,
        }
    },

    async fetchCurrentUser(id: string | null) {
        if (!id) return

        return await prisma.user.findUnique({
            where: { id },
        })
    },

    async fetchAllLocations() {
        return await prisma.venue.findMany()
    },

}