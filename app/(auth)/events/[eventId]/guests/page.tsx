'use client'
import { useState } from 'react';

export default function GuestManager({ params }: { params: { eventId: string } }) {
    const [guests, setGuests] = useState<{ name: string; email: string }[]>([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    async function addGuest() {
        const res = await fetch(`/api/events/${params.eventId}/guests`, {
            method: 'POST',
            body: JSON.stringify({ name, email }),
        });
        const newGuest = await res.json();
        setGuests([...guests, newGuest]);
        setName('');
        setEmail('');
    }

    return (
        <div className="space-y-4">
            <h2 className="text-lg font-semibold">Guest List</h2>
            <ul className="space-y-1">
                {guests.map((g, i) => (
                    <li key={i}>{g.name} - {g.email}</li>
                ))}
            </ul>
            <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
            <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
            <button onClick={addGuest}>Add Guest</button>
        </div>
    );
}
