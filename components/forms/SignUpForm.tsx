'use client'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'

interface Props {
    invite: {
        token: string
        email: string
        role: 'COUPLE' | 'PLANNER' | 'GUEST'
    }
}

export default function SignUpForm({ invite }: Props) {
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
        <form onSubmit={handleSubmit}>
            <p className="text-sm text-gray-600">
                Invited as <strong>{invite.email}</strong> ({invite.role})
            </p>

            <div className='flex flex-col gap-6'>
                <div className='grid gap-3'>
                    <Label htmlFor='username'>Username</Label>
                    <Input
                        id='username'
                        type='text'
                        placeholder='Choose a username'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className='grid gap-3'>
                    <Label htmlFor='password'>Password</Label>
                    <Input
                        id='password'
                        type='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className='flex flex-col gap-3'>
                    <Button
                        type="submit" 
                        className="w-full bg-brand-primary-600 hover:bg-brand-primary-400"
                    >
                        Sign Up
                    </Button>
                    {error && <p className="text-red-500">{error}</p>}
                </div>
            </div>
        </form>
    )
}
