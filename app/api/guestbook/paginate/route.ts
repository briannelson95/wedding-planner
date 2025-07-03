import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url)
    const cursor = searchParams.get('cursor') ?? undefined
    const take = parseInt(searchParams.get('take') || '10', 10)

    try {
        const entries = await prisma.guestBookEntry.findMany({
            take,
            skip: cursor ? 1 : 0,
            ...(cursor && { cursor: { id: cursor } }),
            orderBy: [{ lName: 'asc' }, { fName: 'asc' }],
        })

        const nextCursor = entries.length === take ? entries[entries.length - 1].id : null

        return NextResponse.json({ entries, nextCursor })
    } catch (error) {
        console.error('[GET GUESTBOOK PAGINATE]', error)
        return NextResponse.json({ message: 'Failed to fetch paginated entries' }, { status: 500 })
    }
}
