import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
        return new NextResponse('Unauthorized', { status: 403 })
    }

    const { name, date, location } = await req.json()

    const event = await prisma.event.create({
        data: {
            name,
            date: date ? new Date(date) : undefined,
            location,
            creatorId: session.user.id,
        },
    })

    return NextResponse.json(event)
}
