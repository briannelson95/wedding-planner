'use client'

import React, { useState } from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Label } from '../ui/label'
import { toast } from 'sonner'

interface CreateVenueFormProps {
    onSuccess?: () => void
}

export default function CreateVenueForm({ onSuccess }: CreateVenueFormProps) {
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        city: '',
        state: '',
        postalCode: '',
        country: 'United States',
        phone: '',
        email: ''
    })

    const [loading, setLoading] = useState(false)

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()

        if (!formData.name || !formData.address || !formData.city || !formData.state || !formData.postalCode) {
            toast.error('Please fill in all required fields')
            return
        }

        setLoading(true)
            try {
            const res = await fetch('/api/venues/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            })

            if (!res.ok) throw new Error('Failed to create venue')

            toast.success('Venue created!')
            setFormData({
                name: '',
                address: '',
                city: '',
                state: '',
                postalCode: '',
                country: 'United States',
                phone: '',
                email: ''
            })

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
            {[
                { label: 'Name', name: 'name', required: true },
                { label: 'Address', name: 'address', required: true },
                { label: 'City', name: 'city', required: true },
                { label: 'State', name: 'state', required: true },
                { label: 'Postal Code', name: 'postalCode', required: true },
                { label: 'Country', name: 'country', required: false },
                { label: 'Phone', name: 'phone', required: false },
                { label: 'Email', name: 'email', required: false }
            ].map(field => (
                <div key={field.name} className="space-y-1">
                    <Label htmlFor={field.name}>
                        {field.label}{field.required && ' *'}
                    </Label>
                    <Input
                        id={field.name}
                        name={field.name}
                        value={formData[field.name as keyof typeof formData]}
                        onChange={handleChange}
                        required={field.required}
                    />
                </div>
            ))}
            {/* <div className="space-y-1">
                <Label htmlFor='name'>
                    Name *
                </Label>
                <Input
                    id='name'
                    name='name'
                    value={formData[field.name as keyof typeof formData]}
                    onChange={handleChange}
                    required={field.required}
                />
            </div> */}
            <Button type="submit" disabled={loading}>
                {loading ? 'Creating...' : 'Create Venue'}
            </Button>
        </form>
    )
}
