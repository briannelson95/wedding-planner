import { NextResponse } from 'next/server'
import { mutations } from '@/lib/mutations'

export async function DELETE(_: Request, { params }: { params: { eventId: string; entryId: string } }) {
    const { eventId, entryId: guestBookEntryId } = params

    if (!eventId || !guestBookEntryId) {
        return NextResponse.json({ message: 'Missing eventId or guestBookEntryId' }, { status: 400 })
    }

    try {
        await mutations.removeEventGuest(eventId, guestBookEntryId)
        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Remove Guest Error:', error)
        return NextResponse.json({ message: 'Failed to remove guest from event' }, { status: 500 })
    }
}
