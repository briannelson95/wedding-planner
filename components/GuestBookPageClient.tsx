'use client'

import { useState } from 'react'
import AddGuestBookEntryModal from '@/components/AddGuestBookEntryModal'
import GuestBookList from '@/components/GuestBookList'
import TableIcon from './icons/TableIcon'
import GuestCardIcon from './icons/GuestCardIcon'
import BulkUploadGuest from './BulkUploadGuest'

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
    const [isOpen, setIsOpen] = useState(false);
    const [view, setView] = useState<'CARD' | 'TABLE'>('TABLE')

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
                <div className='flex gap-5'>
                    <h1 className='text-2xl font-bold'>Guest Book</h1>
                    <div className='flex gap-2'>
                        <button onClick={() => setView('TABLE')}>
                            <TableIcon />
                        </button>
                        <button onClick={() => setView('CARD')}>
                            <GuestCardIcon />
                        </button>
                    </div>
                </div>
                <div className='flex gap-2'>
                    <button onClick={() => setIsOpen(true)} className="btn btn-primary">Add Guest</button>
                    <BulkUploadGuest />
                </div>
            </div>

            <GuestBookList view={view} entries={entries} />

            <AddGuestBookEntryModal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                onSubmit={handleAddGuest}
            />
        </div>
    )
}
