/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import React, { useState } from 'react'
import AddGuestFromGuestBook from './AddGuestFromGuestBook'
import EventNotesEditor from './EventNotesEditor'

interface Creator {
    id: string
    email: string
    name: string | null
    role: 'COUPLE' | 'PLANNER' | 'GUEST'
}

interface EventData {
    id: string
    name: string
    date: Date | null
    location: string | null
    creatorId: string
    createdAt: string
    creator: Creator
    guests: any[]
    notes?: string
    eventGuests: any[]
}

interface Props {
    event: EventData
}

export default function EventInfoDisplay({ event }: Props) {
    const [isEditing, setIsEditing] = useState(false);
    const [showSearch, setShowSearch] = useState(false);

    const eventGuests = event.eventGuests
    console.log(eventGuests)
    
    const [saving, setSaving] = useState(false)
    const [error, setError] = useState('')
    const [dateTime, setDateTime] = useState(() => {
        if (event.date) {
            const date = new Date(event.date);
            return new Date(date.getTime() - date.getTimezoneOffset() * 60000)
            .toISOString()
            .slice(0, 16); // format: "yyyy-MM-ddTHH:mm"
        }
        return '';
    });
    const [form, setForm] = useState({
        name: event.name,
        date: dateTime,
        location: event.location || '',
    })

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target
        setForm(prev => ({ ...prev, [name]: value }))
    }

    async function handleSave() {
        setSaving(true)
        setError('')
        try {
            const res = await fetch(`/api/events/${event.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            })

            if (!res.ok) {
                const data = await res.json()
                setError(data.message || 'Update failed')
                return
            }

            setIsEditing(false)
        } catch (err) {
            setError('Something went wrong.')
        } finally {
            setSaving(false)
        }
    }

    // async function handleChangeRsvp(e: any) {
    //     const newRsvp = e.target.value as 'YES' | 'NO' | 'PENDING';

    //     try {
    //         const res = await fetch(
    //             `/api/events/${guest.eventId}/guests/${guest.guestBookEntryId}/rsvp`,
    //             {
    //                 method: 'PATCH',
    //                 headers: { 'Content-Type': 'application/json' },
    //                 body: JSON.stringify({ rsvp: newRsvp }),
    //             }
    //         );

    //         if (!res.ok) {
    //             throw new Error('Failed to update RSVP');
    //         }

    //         // Optionally trigger re-fetch or state update here
    //     } catch (err) {
    //         console.error('RSVP update error:', err);
    //         // Optionally show error message in UI
    //     }
    // }

    function formatDate(date: string) {
        const d = new Date(date)
        return `${d.toLocaleDateString()} ${d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
    }

    return (
        <div className="*:bg-[#00000008] *:p-6 *:rounded-lg *:space-y-4 grid grid-cols-6 gap-4">
            <div className='col-span-6'>
                <div className="flex justify-between items-start col-span-6">
                    <h2 className="text-2xl font-bold">{event.name}</h2>
                    <button
                        onClick={() => setIsEditing(prev => !prev)}
                        className="text-sm text-brand-primary-600 underline"
                    >
                        {isEditing ? 'Cancel' : 'Edit'}
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 col-span-6">
                    {/* Event Date */}
                    <div>
                        <label className="block text-sm font-semibold">Date</label>
                        {isEditing ? (
                            <input
                                type="datetime-local"
                                className="input input-bordered w-full"
                                value={dateTime}
                                onChange={(e) => setDateTime(e.target.value)}
                            />
                        ) : (
                            <p>{event.date ? formatDate(event.date.toDateString()) : 'N/A'}</p>
                        )}
                    </div>

                    {/* Location */}
                    <div>
                        <label className="block text-sm font-semibold">Location</label>
                        {isEditing ? (
                            <input
                                name="location"
                                type="text"
                                className="input input-bordered w-full"
                                value={form.location}
                                onChange={handleChange}
                            />
                        ) : (
                            <p>{event.location || 'N/A'}</p>
                        )}
                    </div>

                    {/* Creator Email */}
                    <div>
                        <label className="block text-sm font-semibold">Creator Email</label>
                        <p>{event.creator.email}</p>
                    </div>

                    {/* Created At */}
                    <div className="md:col-span-2">
                        <label className="block text-sm font-semibold">Created At</label>
                        <p>{formatDate(event.createdAt)}</p>
                    </div>
                </div>
                {error && <p className="text-red-500 text-sm">{error}</p>}
                {isEditing && (
                    <div className="text-right">
                        <button
                            onClick={handleSave}
                            disabled={saving}
                            className="btn btn-primary"
                        >
                            {saving ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                )}
                <div className='col-span-6'>
                    <EventNotesEditor
                        eventId={event.id}
                        initialNotes={event.notes || ''}
                        canEdit={['COUPLE', 'PLANNER'].includes(event.creator.role)}
                    />
                </div>
            </div>
            <div className='col-span-3'>
                <div className='flex justify-between items-center'>
                    <h2 className='text-xl font-semibold'>Guest List</h2>
                    <button
                        className='btn btn-primary'
                        onClick={() => setShowSearch(true)}
                    >
                        Add Guests
                    </button>
                </div>
                {showSearch && <AddGuestFromGuestBook eventId={event.id} />}
                <ul className='space-y-2'>
                    {eventGuests.length && eventGuests.map(guest => (
                        <li key={guest.id} className='bg-brand-primary-900 rounded-lg p-4 flex justify-between'>
                            <p>{guest.guestBookEntry.fName + " " + guest.guestBookEntry.lName}</p>
                            <select 
                                value={guest.rsvp}
                                onChange={
                                    async (e) => {
                                        const newRsvp = e.target.value as 'YES' | 'NO' | 'PENDING';

                                        try {
                                            const res = await fetch(
                                                `/api/events/${guest.eventId}/guests/${guest.guestBookEntryId}/rsvp`,
                                                {
                                                    method: 'PATCH',
                                                    headers: { 'Content-Type': 'application/json' },
                                                    body: JSON.stringify({ rsvp: newRsvp }),
                                                }
                                            );

                                            if (!res.ok) {
                                                throw new Error('Failed to update RSVP');
                                            }

                                            // Optionally trigger re-fetch or state update here
                                        } catch (err) {
                                            console.error('RSVP update error:', err);
                                            // Optionally show error message in UI
                                        }
                                    }
                                }
                            >
                                <option value="PENDING">Pending</option>
                                <option value="YES">Yes</option>
                                <option value="NO">No</option>
                            </select>
                        </li>
                    ))}
                </ul>
                
            </div>
            <div>
                Vendors
            </div>
        </div>
    )
}
