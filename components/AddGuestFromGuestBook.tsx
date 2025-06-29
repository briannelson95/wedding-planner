'use client'

import React, { useEffect, useState } from 'react'

interface GuestBookEntry {
    id: string
    fName: string
    lName: string
    email?: string | null
    side?: string
}

interface Props {
    eventId: string
    onGuestAdded?: (guestId: string) => void
}

export default function AddGuestFromGuestBook({ eventId, onGuestAdded }: Props) {
    const [searchTerm, setSearchTerm] = useState('')
    const [filteredGuests, setFilteredGuests] = useState<GuestBookEntry[]>([])
    const [allGuests, setAllGuests] = useState<GuestBookEntry[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')

    useEffect(() => {
        if (searchTerm.length < 2) {
            setFilteredGuests([])
            return
        }

        async function fetchGuests() {
            setIsLoading(true)
            try {
                const res = await fetch(`/api/guestbook/search?search=${encodeURIComponent(searchTerm)}`)
                const data = await res.json()
                setAllGuests(data)
            } catch (err) {
                console.error(err)
                setError('Failed to fetch guest book entries.')
            } finally {
                setIsLoading(false)
            }
        }

        fetchGuests()
    }, [searchTerm])


    useEffect(() => {
            const filtered = allGuests.filter((guest) => {
            const fullName = `${guest.fName} ${guest.lName}`.toLowerCase()
            return fullName.includes(searchTerm.toLowerCase())
        })
        setFilteredGuests(filtered)
    }, [searchTerm, allGuests])

    async function handleAdd(guestId: string) {
        try {
            const res = await fetch(`/api/events/${eventId}/guests/add`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ guestId }),
            })

            if (!res.ok) {
                const data = await res.json()
                throw new Error(data.message || 'Failed to add guest to event')
            }

            if (onGuestAdded) onGuestAdded(guestId)

            setSearchTerm('')
        } catch (err) {
            console.error(err)
            setError('Could not add guest to event.')
        }
    }

    return (
        <div className="relative mt-2">
            <input
                type="text"
                className="input border border-brand-primary-900 bg-white rounded-lg p-1 w-full"
                placeholder="Search guest book..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            {searchTerm && (
                <ul className="absolute z-10 mt-2 w-full bg-white border border-gray-200 rounded shadow max-h-60 overflow-y-auto">
                    {isLoading ? (
                        <li className="p-2 text-sm text-gray-500">Loading...</li>
                    ) : filteredGuests.length === 0 ? (
                        <li className="p-2 text-sm text-gray-500">No matches found</li>
                    ) : (
                        filteredGuests.map((guest) => (
                        <li
                            key={guest.id}
                            className="p-2 hover:bg-gray-100 cursor-pointer text-sm"
                            onClick={() => handleAdd(guest.id)}
                        >
                            {guest.fName} {guest.lName} {guest.side ? `(${guest.side})` : ''}
                            {guest.email ? ` – ${guest.email}` : ''}
                        </li>
                        ))
                    )}
                </ul>
            )}

            {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
        </div>
    )
}
