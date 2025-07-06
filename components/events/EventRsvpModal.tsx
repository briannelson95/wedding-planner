'use client'
import React from 'react'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { toast } from 'sonner'
import { Button } from '../ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'

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

export default function EventRsvpModal({ eventGuests }: Props) {

     const handleRsvpChange = async (
        guest: EventGuest,
        rsvp: 'YES' | 'NO' | 'PENDING'
    ) => {
        try {
        const res = await fetch(
            `/api/events/${guest.eventId}/guests/${guest.guestBookEntryId}/rsvp`,
            {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ rsvp })
            }
        )

        if (!res.ok) throw new Error('Failed to update RSVP')
        toast.success(`RSVP updated for ${guest.guestBookEntry.fName} ${guest.guestBookEntry.lName}`)
        } catch (err) {
        console.error('RSVP update error:', err)
        toast.error('Failed to update RSVP')
        }
    }


    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="secondary">Manage Guest RSVPs</Button>
            </DialogTrigger>
            <DialogContent className='max-w-2xl'>
                <DialogHeader>
                    <DialogTitle>Manage Guest RSVPs</DialogTitle>
                    <DialogDescription>
                        Update RSVP statuses for each guest attending this event.
                    </DialogDescription>
                </DialogHeader>

                <div className='space-y-4 max-h-[400px] overflow-y-auto pr-1'>
                    {eventGuests.length && eventGuests.map(guest => (
                        <div key={guest.id} className="flex justify-between items-center bg-muted p-3 rounded-md">
                            <div>
                                <p className="font-medium">{guest.guestBookEntry.fName + " " + guest.guestBookEntry.lName}</p>
                            </div>
                            <Select
                                defaultValue={guest.rsvp}
                                onValueChange={(value) =>
                                    handleRsvpChange(guest, value as 'YES' | 'NO' | 'PENDING')
                                }
                            >
                                <SelectTrigger className="w-[120px]">
                                    <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="PENDING">Pending</SelectItem>
                                    <SelectItem value="YES">Yes</SelectItem>
                                    <SelectItem value="NO">No</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    ))}
                </div>

                <DialogFooter className="mt-4">
                    <DialogClose asChild>
                        <Button variant="ghost">Close</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
