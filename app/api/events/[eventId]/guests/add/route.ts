import { NextRequest, NextResponse } from 'next/server'
import { mutations } from '@/lib/mutations'

export async function POST(req: NextRequest, { params }: { params: { eventId: string } }) {
    const eventId = params.eventId
    const { guestBookEntryId } = await req.json()

    if (!eventId || !guestBookEntryId) {
        return NextResponse.json({ message: 'Missing eventId or guestBookEntryId' }, { status: 400 })
    }

    try {
        const added = await mutations.addEventGuest({ eventId, guestBookEntryId })
        return NextResponse.json(added)
    } catch (error) {
        console.error('Add Event Guest Error:', error)
        return NextResponse.json({ message: 'Failed to add guest to event' }, { status: 500 })
    }
}
