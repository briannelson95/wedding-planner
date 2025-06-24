'use client'

import { useState } from 'react'

export default function SendInviteForm() {
    const [email, setEmail] = useState('')
    const [role, setRole] = useState<'GUEST' | 'COUPLE' | 'PLANNER'>('GUEST')
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setError('')
        setMessage('')

        const res = await fetch('/api/invite/send', {
            method: 'POST',
            body: JSON.stringify({ email, role }),
            headers: { 'Content-Type': 'application/json' },
        })

        if (res.ok) {
        setMessage('Invite sent successfully!')
            setEmail('')
        } else {
        const { message } = await res.json()
            setError(message || 'Failed to send invite')
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
            <h2 className="text-xl font-bold">Send an Invite</h2>

            {message && <p className="text-green-600">{message}</p>}
            {error && <p className="text-red-600">{error}</p>}

            <input
                type="email"
                className="input input-bordered w-full"
                placeholder="Recipient email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />

            <select
                className="select select-bordered w-full"
                value={role}
                onChange={(e) => setRole(e.target.value as 'COUPLE' | 'PLANNER' | 'GUEST')}
            >
                <option value="GUEST">Guest</option>
                <option value="PLANNER">Planner</option>
                <option value="COUPLE">Couple</option>
            </select>

            <button type="submit" className="btn btn-primary w-full">
                Send Invite
            </button>
        </form>
    )
}
