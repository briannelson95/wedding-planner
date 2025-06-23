import { queries } from '@/lib/queries'
import Link from 'next/link'
import React from 'react'

export default async function DashboardPage() {
    const events = await queries.fetchEvents()
    console.log(events)

    return (
        <div>
            <h1 className='text-2xl font-bold'>Dashboard</h1>
            <div className='border rounded-lg max-w-6xl mx-auto p-6 space-y-4'>
                <h2 className='text-xl font-bold'>Your Events</h2>
                {events.map((item) => (
                    <div key={item.id}>
                        <p>ID: {item.id}</p>
                        <p>Name: {item.name}</p>
                        <p>Date: {item.date ? item.date.toISOString() : 'null'}</p>
                        <p>Location: {item.location ? item.location : 'null'}</p>
                        <p>Creator ID:{item.creatorId}</p>
                        <p>Created At:{item.createdAt.toISOString()}</p>
                        
                    </div>
                ))}
                <Link
                    href={'/events'}
                    className='underline'
                >
                    See all events
                </Link>
            </div>
        </div>
    )
}
