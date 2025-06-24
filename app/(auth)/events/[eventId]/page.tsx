import { queries } from '@/lib/queries'
import React from 'react'

export default async function SingleEventPage({ params }: { params: { eventId: string }}) {
    console.log(params)
    const data = await queries.singleEvent(params.eventId)
    
    return (
        <div>
            <h1 className='text-4xl font-bold'>
                {data?.name}
            </h1>
        </div>
    )
}
