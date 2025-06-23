'use client'

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

export default function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        const result = await signIn('credentials', {
            redirect: false,
            email,
            password,
        })

        console.log('[CLIENT] signIn result:', result)

        if (result?.error) {
            setError(result.error)
        } else {
            router.push('/')
        }
    }
    return (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-sm mx-auto mt-10">
            <h1 className="text-2xl font-bold">Login</h1>
            {error && <p className="text-red-500">{error}</p>}
            <input
                className="input input-bordered w-full"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                className="input input-bordered w-full"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button className="btn btn-primary w-full" type="submit">
                Sign In
            </button>
        </form>
    )
}
