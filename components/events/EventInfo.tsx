'use client'
import React, { useEffect, useState } from 'react'
import { Card, CardContent } from '../ui/card'
import { getDaysUntilEvent } from '@/lib/helper/getDaysUntilEvent'
import { Button } from '../ui/button'
import EventNotesEditor from '../EventNotesEditor'
import DialogWrapper from '../dialogs/DialogWrapper'
import EditEventForm from '../forms/EditEventForm'

interface EventProps {
    event: EventData
}

export default function EventInfo({ event }: EventProps) {
    const [daysLeft, setDaysLeft] = useState<number | null>(null)
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    useEffect(() => {
        if (event.date) {
            const diff = getDaysUntilEvent(event.date);
            setDaysLeft(diff)
        }
    }, [event.date])

    async function refreshEventData(eventId: string) {
        try {
            const res = await fetch(`/api/events/${eventId}/fetch`)
            if (!res.ok) throw new Error('Failed to fetch event data')
            const data = await res.json()
            return data
        } catch (err) {
            console.error('Failed to refresh event data:', err)
            return null
        }
    }


    return (
        <div className='lg:col-span-1 space-y-4'>
            <Card className='py-0'>
                <CardContent className='p-4'>
                    <h2 className='text-xl font-semibold'>Event Info</h2>
                    <p className='text-sm mt-2'>Name: {event.name}</p>
                    <p className='text-sm'>Date: {event.date ? event.date.toDateString() : 'Upcoming'}</p>
                    <p className='text-sm'>Venue: {event.venue ? event.venue.name : 'No location yet'}</p>
                    {daysLeft !== null && (
                        <p className='text-sm mt-2 font-medium text-brand-primary-400'>
                            {daysLeft} days until this event!
                        </p>
                    )}
                    <Button 
                        className="mt-4 w-full bg-brand-primary-600 hover:bg-brand-primary-400"
                        onClick={() => setIsDialogOpen(true)}
                    >
                        Edit Event
                    </Button>
                </CardContent>
            </Card>
            <Card className='py-0'>
                <CardContent className='p-4'>
                    <h2 className='text-xl font-semibold mb-2'>General Notes</h2>
                    <EventNotesEditor
                        eventId={event.id}
                        initialNotes={event.notes || ''}
                        canEdit={['COUPLE', 'PLANNER'].includes(event.creator.role)}
                    />
                </CardContent>
            </Card>

            <DialogWrapper
                open={isDialogOpen}
                onOpenChange={setIsDialogOpen}
                title="Edit Event"
                description="Update the event details"
                form={
                    <EditEventForm event={event} onSuccess={async () => {
                            await refreshEventData(event.id)
                            setIsDialogOpen(false)
                        }} 
                    />
                }
            />
        </div>
    )
}
