'use client'

import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import CreateVenueForm from './CreateVenueForm'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog'

interface CreateEventFormProps {
    onSuccess?: () => void
}

export default function CreateEventForm({ onSuccess }: CreateEventFormProps) {
    const [formData, setFormData] = useState({
        name: '',
        date: '',
        venueId: '' 
    })

    const [venues, setVenues] = useState<{ id: string; name: string }[]>([])
    // const [showVenueForm, setShowVenueForm] = useState(false)
    const [venueDialogOpen, setVenueDialogOpen] = useState(false)

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
        if (!formData.name || !formData.date) {
            toast.error('Event Name and Date are required')
            return
        }

        try {
            const res = await fetch('/api/events/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                name: formData.name,
                date: formData.date,
                venueId: formData.venueId || null
                })
            })

            if (!res.ok) throw new Error('Failed to create event')

            toast.success('Event created!')
            if (onSuccess) onSuccess()
        } catch (err) {
            toast.error('Something went wrong')
            console.error(err)
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit} className="space-y-6">

                {/* Event Details */}
                <div className="space-y-4">
                    <div>
                        <Label htmlFor="name">Event Name *</Label>
                        <Input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div>
                        <Label htmlFor="date">Event Date *</Label>
                        <Input
                            id="date"
                            name="date"
                            type="date"
                            value={formData.date}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                {/* Venue Selection */}
                <div className="space-y-2">
                    <Label htmlFor="venueId">Choose a Venue</Label>
                    <select
                        name="venueId"
                        id="venueId"
                        value={formData.venueId}
                        onChange={handleChange}
                        className="input input-bordered w-full"
                    >
                        <option value="">— Select a venue —</option>
                        {venues.map(v => (
                            <option key={v.id} value={v.id}>
                            {v.name}
                            </option>
                        ))}
                    </select>
                    <Button type="button" variant="outline" onClick={() => setVenueDialogOpen(true)}>
                        Or create new venue
                    </Button>
                </div>

                {/* Submit */}
                <Button type="submit" className="w-full">
                    Create Event
                </Button>
            </form>
            <Dialog open={venueDialogOpen} onOpenChange={setVenueDialogOpen}>
                <DialogContent onOpenAutoFocus={(e) => e.preventDefault()}>
                    <DialogHeader>
                    <DialogTitle>Create New Venue</DialogTitle>
                    <DialogDescription>Fill in venue details</DialogDescription>
                    </DialogHeader>
                    <CreateVenueForm
                        onSuccess={async (newVenueId) => {
                            // 1. Close the dialog
                            setVenueDialogOpen(false)

                            // 2. Refresh venues list
                            const res = await fetch('/api/venues/fetch')
                            const updated = await res.json()
                            setVenues(updated)

                            // 3. Update formData with new venue
                            setFormData(prev => ({ 
                                ...prev, 
                                venueId: newVenueId || ''
                            }))
                        }}
                    />
                </DialogContent>
            </Dialog>

        </>
    )
}
