import { queries } from '@/lib/queries'
import Link from 'next/link'
import React from 'react'

export default async function EventsPage() {
    const allEvents = await queries.fetchEvents()
    console.log(allEvents)

    return (
        <div>
            Events
            <div>
                {allEvents.length == 0 && (
                    <>
                        You don't have any events yet. <Link href={'/events/create'} className='underline'>Create One!</Link>
                    </>
                )}
            </div>
        </div>
    )
}
