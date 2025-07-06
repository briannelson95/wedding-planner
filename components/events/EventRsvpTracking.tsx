import React from 'react'
import { Card, CardContent } from '../ui/card'
import EventRsvpModal from './EventRsvpModal'

interface GuestBookEntry {
  id: string
  fName: string
  lName: string
}

interface EventGuest {
  id: string
  rsvp: 'YES' | 'NO' | 'PENDING'
  eventId: string
  guestBookEntryId: string
  guestBookEntry: GuestBookEntry
}

interface Props {
  eventGuests: EventGuest[]
}

export default function EventRsvpTracking({ eventGuests }: Props) {
    const attendingGuests = eventGuests.filter((g) => g.rsvp === 'YES');
    const notAttendingGuests = eventGuests.filter((g) => g.rsvp === 'NO');
    const pendingGuests = eventGuests.filter((g) => g.rsvp === 'PENDING');

    return (
        <Card className='py-0'>
            <CardContent className='p-4'>
                <h2 className="text-xl font-semibold">RSVP Tracking</h2>
                <div className='grid grid-cols-4 gap-4 text-sm mt-4'>
                    <div>
                        <p className='text-muted-foreground'>Invited</p>
                        <p className='text-2xl font-bold'>{eventGuests.length}</p>
                    </div>
                    <div>
                        <p className='text-muted-foreground'>Confirmed</p>
                        <p className='text-2xl font-bold'>{attendingGuests.length}</p>
                    </div>
                    <div>
                        <p className='text-muted-foreground'>Declined</p>
                        <p className='text-2xl font-bold'>{notAttendingGuests.length}</p>
                    </div>
                    <div>
                        <p className='text-muted-foreground'>Pending</p>
                        <p className='text-2xl font-bold'>{pendingGuests.length}</p>
                    </div>
                </div>
                <EventRsvpModal eventGuests={eventGuests} />
            </CardContent>
        </Card>
    )
}
