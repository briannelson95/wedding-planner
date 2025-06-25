'use client'

import React, { useState } from 'react'
import PencilIcon from './icons/PencilIcon'

export default function HeadingWithEdit({
    title,
    eventId,
}: {
    title: string
    eventId: string
}) {
    const [edit, setEdit] = useState(false)
    const [currentTitle, setCurrentTitle] = useState(title)
    const [newTitle, setNewTitle] = useState(title)
    const [saving, setSaving] = useState(false)
    const [error, setError] = useState('')

    async function handleSave() {
        setSaving(true)
        setError('')

        try {
        const res = await fetch(`/api/events/${eventId}`, {
            method: 'PATCH',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: newTitle }),
        })

        if (!res.ok) {
            const data = await res.json()
            setError(data.message || 'Failed to update event')
            return
        }

        setCurrentTitle(newTitle) // update display title
        setEdit(false)
        } catch (err) {
            console.error(err)
            setError('Something went wrong')
        } finally {
            setSaving(false)
        }
    }

    return (
        <>
        <h1 className="text-4xl font-bold flex gap-2 items-center">
            {edit ? (
                <input
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="border rounded-lg px-2 py-1"
                />
            ) : (
                currentTitle
            )}
            <button onClick={() => setEdit(!edit)} className="hover:cursor-pointer">
                <PencilIcon />
            </button>
            {edit && (
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="text-sm bg-blue-600 text-white rounded px-2 py-1"
                >
                    {saving ? 'Saving...' : 'Save'}
                </button>
            )}
        </h1>
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </>
    )
}
