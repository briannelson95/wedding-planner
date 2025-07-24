import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()

    try {
        const venue = await prisma.venue.create({
            data: {
                name: body.name,
                address: body.address,
                city: body.city,
                state: body.state,
                postalCode: body.postalCode,
                country: body.country,
                phone: body.phone || undefined,
                email: body.email || undefined
            }
        })

        return NextResponse.json(venue)
    } catch (err) {
        console.error(err)
        return NextResponse.json({ message: 'Error creating venue' }, { status: 500 })
    }
}
