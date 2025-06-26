'use client'

import { useState } from 'react'
import AddGuestBookEntryModal from '@/components/AddGuestBookEntryModal'
import GuestBookList from '@/components/GuestBookList'

interface GuestBookEntry {
    id: string
    fName: string
    lName: string
    side: string
    email?: string | null
    phone?: string | null
    address?: string | null
    notes?: string | null
}

export default function GuestBookPageClient({ entries }: { entries: GuestBookEntry[] }) {
    const [isOpen, setIsOpen] = useState(false)

    async function handleAddGuest(data: {
        fName: string
        lName: string
        email?: string
        phone?: string
        address?: string
        side: string
        notes?: string
    }) {
        try {
            const res = await fetch('/api/guestbook/add', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            })

            if (!res.ok) {
                const { message } = await res.json()
                throw new Error(message || 'Failed to add guest')
            }

            // Optionally: re-fetch entries or mutate state here
        } catch (err) {
            console.error('Error adding guest:', err)
        }
    }

    return (
        <div className='max-w-6xl mx-auto mt-8 space-y-4'>
            <div className="flex justify-between items-center">
                <h1 className='text-2xl font-bold'>Guest Book</h1>
                <button onClick={() => setIsOpen(true)} className="btn btn-primary">Add Guest</button>
            </div>

            <GuestBookList entries={entries} />

            <AddGuestBookEntryModal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                onSubmit={handleAddGuest}
            />
        </div>
    )
}
