/* eslint-disable @typescript-eslint/ban-ts-comment */
import EventInfoDisplay from '@/components/EventInfoDisplay'
import { queries } from '@/lib/queries'
import React from 'react'

export default async function SingleEventPage({ params }: { params: { eventId: string }}) {
    const data = await queries.singleEvent(params.eventId)
    console.log(data)
    
    return (
        <div className='max-w-[100rem] mx-auto'>
            {data ? (
                // @ts-ignore
                <EventInfoDisplay event={data} />
            ) : (
                <p className="text-center text-gray-500 mt-10">Event not found.</p>
            )}
        </div>
    )
}
