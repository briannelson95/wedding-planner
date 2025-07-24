import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

export async function GET(
    req: NextRequest,
    { params }: { params: { eventId: string } }
) {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    try {
        const event = await prisma.event.findUnique({
        where: { id: params.eventId },
        include: {
            creator: {
            select: { id: true, name: true, email: true, role: true }
            },
            venue: true,
            todos: {
            orderBy: [
                { complete: 'asc' },
                { dueDate: 'asc' }
            ]
            },
            eventGuests: {
            include: {
                guestBookEntry: true
            }
            }
        }
        })

        if (!event) {
        return NextResponse.json({ message: 'Event not found' }, { status: 404 })
        }

        return NextResponse.json(event)
    } catch (err) {
        console.error(err)
        return NextResponse.json({ message: 'Error fetching event' }, { status: 500 })
    }
}
