'use client'
import React, { useState } from 'react'
import EditGuestBookEntryModal from './EditGuestBookEntryModal'

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

export default function GuestBookList({ entries }: { entries: GuestBookEntry[] }) {
    const [editingEntry, setEditingEntry] = useState<GuestBookEntry | null>(null)

    function handleModalClose() {
        setEditingEntry(null)
    }

    async function handleUpdate(updated: {
        id: string
        fName: string
        lName: string
        email?: string
        phone?: string
        address?: string
        side?: string
        notes?: string
    }) {
        try {
            const res = await fetch(`/api/guestbook/${updated.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    fName: updated.fName,
                    lName: updated.lName,
                    email: updated.email,
                    phone: updated.phone,
                    address: updated.address,
                    side: updated.side,
                    notes: updated.notes,
                }),
            })

            if (!res.ok) {
                const { message } = await res.json()
                throw new Error(message || 'Update failed')
            }

            // Optional: trigger a state update/refetch if needed
            setEditingEntry(null)
        } catch (err) {
            console.error('Update failed:', err)
        }
    }

    return (
        <div className='space-y-4'>
            <div className='overflow-hidden rounded-xl'>
                <table className='table-auto w-full mb-16 p-4'>
                    <thead className='bg-text text-background'>
                        <tr className='text-left'>
                            <th className='px-4 py-2'>Name</th>
                            <th className='px-4 py-2'>Email</th>
                            <th className='px-4 py-2'>Phone</th>
                            <th className='px-4 py-2'>Address</th>
                            <th className='px-4 py-2'>Notes</th>
                        </tr>
                    </thead>
                    <tbody className=''>
                        {entries.map(entry => (
                            <tr
                                key={entry.id}
                                className=''
                            >
                                <td className='border border-gray-300 px-4 py-2'>{entry.fName + ' ' + entry.lName} <span className='text-sm text-gray-600'>(Side: {entry.side})</span></td>
                                <td className='border border-gray-300 px-4 py-2'>{entry.email || 'N/A'}</td>
                                <td className='border border-gray-300 px-4 py-2'>{entry.phone || 'N/A'}</td>
                                <td className='border border-gray-300 px-4 py-2'>{entry.address || 'N/A'}</td>
                                <td className='border border-gray-300 px-4 py-2'>{entry.notes || 'N/A'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className='max-w-3xl space-y-4 mx-auto'>
                {entries.map(entry => (
                    <div key={entry.id} className='p-4 border rounded shadow-sm'>
                        <h2 className='font-semibold text-lg'>{entry.fName} {entry.lName}</h2>
                        <p className='text-sm text-gray-600'>Side: {entry.side}</p>
                        <p>Email: {entry.email || 'N/A'}</p>
                        <p>Phone: {entry.phone || 'N/A'}</p>
                        <p>Address: {entry.address || 'N/A'}</p>
                        <p>Notes: {entry.notes || 'N/A'}</p>
                        <button
                            className='text-blue-600 underline text-sm mt-2'
                            onClick={() => setEditingEntry(entry)}
                        >
                            Edit
                        </button>
                    </div>
                ))}
            </div>

            {editingEntry && (
                <EditGuestBookEntryModal
                    isOpen={!!editingEntry}
                    onClose={handleModalClose}
                    initialData={{
                        id: editingEntry.id,
                        fName: `${editingEntry.fName}`,
                        lName: `${editingEntry.lName}`,
                        email: editingEntry.email || '',
                        phone: editingEntry.phone || '',
                        address: editingEntry.address || '',
                        side: editingEntry.side,
                        notes: editingEntry.notes || '',
                    }}
                    onSubmit={handleUpdate}
                />
            )}
        </div>
    )
}
