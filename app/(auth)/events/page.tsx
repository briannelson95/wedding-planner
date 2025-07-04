import { queries } from '@/lib/queries'
import Link from 'next/link'
import React from 'react'

export default async function EventsPage() {
    const allEvents = await queries.fetchEvents()
    console.log(allEvents)

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">Your Events</h1>
                <Link href="/events/create" className="btn btn-primary">
                    Create Event
                </Link>
            </div>

            {allEvents.length === 0 ? (
                <p className="text-lg text-gray-600">
                    You don&apos;t have any events yet.{' '}
                    <Link href="/events/create" className="underline text-brand-primary-600">
                        Create one!
                    </Link>
                </p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {allEvents.map(event => (
                        <Link
                            href={`/events/${event.id}`}
                            key={event.id}
                            className="block bg-white border border-gray-200 hover:shadow-md rounded-lg p-5 transition-all"
                        >
                            <h2 className="text-xl font-semibold mb-1">{event.name}</h2>
                            <p className="text-sm text-gray-600">
                                {event.date ? new Date(event.date).toLocaleDateString() : 'No date set'}
                            </p>
                            <p className="text-sm text-gray-400 mt-2">
                                Created by: {event.creator?.username || 'Unknown'}
                            </p>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    )
}
