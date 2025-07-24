'use client'

import React, { useState, useEffect } from 'react'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Button } from '../ui/button'
import { toast } from 'sonner'

interface EditEventFormProps {
    event: EventData
    onSuccess?: () => void
}

export default function EditEventForm({ event, onSuccess }: EditEventFormProps) {
    const [formData, setFormData] = useState({
        name: event.name,
        date: event.date?.toISOString().substring(0, 10) || '',
        venueId: event.venue?.id || ''
    })

    const [venues, setVenues] = useState<{ id: string; name: string }[]>([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        async function fetchVenues() {
            const res = await fetch('/api/venues/fetch')
            const data = await res.json()
            setVenues(data)
        }
        fetchVenues()
    }, [])

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setLoading(true)

        try {
            const res = await fetch(`/api/events/${event.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            })

            if (!res.ok) throw new Error('Failed to update event')
            toast.success('Event updated!')

            if (onSuccess) onSuccess()
        } catch (err) {
            console.error(err)
            toast.error('Something went wrong')
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <Label htmlFor="name">Event Name</Label>
                <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div>
                <Label htmlFor="date">Event Date</Label>
                <Input id="date" name="date" type="date" value={formData.date} onChange={handleChange} />
            </div>
            <div>
                <Label htmlFor="venueId">Venue</Label>
                <select
                    id="venueId"
                    name="venueId"
                    className="input input-bordered w-full"
                    value={formData.venueId}
                    onChange={handleChange}
                    >
                    <option value="">No venue</option>
                    {venues.map(v => (
                        <option key={v.id} value={v.id}>
                        {v.name}
                        </option>
                    ))}
                </select>
            </div>
            <Button type="submit" disabled={loading}>
                {loading ? 'Saving...' : 'Save Changes'}
            </Button>
        </form>
    )
}
