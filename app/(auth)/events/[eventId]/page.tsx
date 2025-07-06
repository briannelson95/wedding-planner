import EventDashboard from '@/components/events/EventDashboard'
import { queries } from '@/lib/queries'
import React from 'react'

export default async function SingleEventPage({ params }: { params: { eventId: string }}) {
    const data = await queries.singleEvent(params.eventId)
    
    return (
        <div className=''>
            
            {data ? (
                <EventDashboard 
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    //@ts-expect-error
                    event={data}
                />
            ) : (
                <p className="text-center text-gray-500 mt-10">Event not found.</p>
            )}
        </div> 
    )
}
