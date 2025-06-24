'use client'

import { signIn } from 'next-auth/react';
import React, { useState } from 'react'

export default function SetupPage() {
    const [role, setRole] = useState<'COUPLE' | 'PLANNER' | null>(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');

    async function handleSetup(e:React.FormEvent) {
        e.preventDefault();

        const res = await fetch('/api/setup', {
            method: 'POST',
            body: JSON.stringify({ email, password, role }),
        });

        if (res.ok) {
            await signIn('credentials', { email, password, callbackUrl: '/' });
        } else {
            alert('Error setting up user');
        }
    }

    if (!role) {
        return (
            <div className='mx-auto max-w-4xl border rounded-2xl flex flex-col items-center px-4 py-4 space-y-4'>
                <h1 className='text-4xl font-bold'>Welcome! Who are you?</h1>
                <button 
                    className='hover:cursor-pointer dark:bg-white dark:text-black rounded px-4 py-2' 
                    onClick={() => setRole('COUPLE')}
                >
                    I&apos;m part of the Couple
                </button>
                <button 
                    className='hover:cursor-pointer dark:bg-white dark:text-black rounded px-4 py-2'
                    onClick={() => setRole('PLANNER')}
                >
                    I&apos;m the Planner
                </button>
            </div>
        );
    }
    return (
        <form onSubmit={handleSetup} className="space-y-4">
            <h2>Create your account ({role})</h2>
            <input
                type="text"
                placeholder="Choose a username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
            />
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <button type="submit">Create Account</button>
        </form>
    )
}
