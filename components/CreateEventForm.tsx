'use client'

import { useState } from "react"

export default function CreateEventForm() {
    const [name, setName] = useState('');

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        const res = await fetch('api/events', {
            method: 'POST',
            body: JSON.stringify({ name }),
        });
        const event = await res.json();
        console.log('Created:', event);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Event Name"
            />
            <button type="submit">Create</button>
        </form>
    )
}
