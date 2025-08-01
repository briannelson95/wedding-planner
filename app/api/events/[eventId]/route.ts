import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

export async function PATCH(req: NextRequest, { params }: { params: { eventId: string } }) {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()

    try {
        const updated = await prisma.event.update({
            where: { id: params.eventId },
            data: {
                name: body.name,
                date: body.date ? new Date(body.date) : undefined,
                venueId: body.venueId || null,
            },
        })

        return NextResponse.json(updated)
    } catch (err) {
        console.error(err)
        return NextResponse.json({ message: 'Error updating event' }, { status: 500 })
    }
}
