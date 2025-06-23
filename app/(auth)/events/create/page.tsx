'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CreateEventPage() {
    const [name, setName] = useState('');
    const router = useRouter();

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        const res = await fetch('/api/events', {
            method: 'POST',
            body: JSON.stringify({ name }),
        });
        const data = await res.json();
        router.push(`/events/${data.id}`);
    }

    return (
        <form onSubmit={handleSubmit} className="max-w-md space-y-4">
            <h2 className="text-xl font-bold">Create Event</h2>
            <input
                type="text"
                placeholder="Event Name"
                className="input input-bordered w-full"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <button className="btn btn-primary">Create</button>
        </form>
    );
}
