// app/api/events/[eventId]/guests/[entryId]/rsvp/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { mutations } from '@/lib/mutations'

export async function PATCH(req: NextRequest, { params }: { params: { eventId: string; entryId: string } }) {
    const { eventId, entryId: guestBookEntryId } = params
    const { rsvp } = await req.json()

    if (!['YES', 'NO', 'PENDING'].includes(rsvp)) {
        return NextResponse.json({ message: 'Invalid RSVP status' }, { status: 400 })
    }

    try {
        const updated = await mutations.updateEventGuestRsvp({ eventId, guestBookEntryId, rsvp })
        return NextResponse.json(updated)
    } catch (error) {
        console.error('RSVP Update Error:', error)
        return NextResponse.json({ message: 'Failed to update RSVP status' }, { status: 500 })
    }
}
