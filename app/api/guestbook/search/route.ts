// api/guestbook/search/route.ts
import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url)
    const query = searchParams.get('search') // ✅ Match the client-side key

    if (!query || query.length < 2) {
        return NextResponse.json([], { status: 200 })
    }

    const results = await prisma.guestBookEntry.findMany({
        where: {
            OR: [
                { fName: { contains: query, mode: 'insensitive' } },
                { lName: { contains: query, mode: 'insensitive' } },
                { email: { contains: query, mode: 'insensitive' } },
            ]
        },
        orderBy: [
            { lName: 'asc' },
            { fName: 'asc' },
        ],
        take: 10
    })

    return NextResponse.json(results)
}
