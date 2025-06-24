'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface Props {
    invite: {
        token: string
        email: string
        role: 'COUPLE' | 'PLANNER' | 'GUEST'
    }
}

export default function SignupForm({ invite }: Props) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const router = useRouter()

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()

       const res = await fetch('/api/signup/from-invite', {
            method: 'POST',
            body: JSON.stringify({ token: invite.token, username, password }),
            headers: { 'Content-Type': 'application/json' },
        })

        if (res.ok) {
            router.push('/login')
        } else {
            const { message } = await res.json()
            setError(message || 'Signup failed')
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <p className="text-sm text-gray-600">
                Invited as <strong>{invite.email}</strong> ({invite.role})
            </p>

            <input
                type="text"
                placeholder="Choose a username"
                className="input input-bordered w-full"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
            />

            <input
                type="password"
                placeholder="Choose a password"
                className="input input-bordered w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button type="submit" className="btn btn-primary w-full">
                Create Account
            </button>
        </form>
    )
}
