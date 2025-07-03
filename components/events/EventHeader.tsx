import React from 'react'

export default function EventHeader({ name, date, location }: { name: string, date?: Date | null, location?: string | null }) {
    return (
        <div className='w-full space-y-2'>
            <h1 className='text-3xl font-bold'>{name}</h1>
            <div className='flex w-full justify-between'>
                <p className='text-sm'>{date ? date?.toDateString() : "Upcoming"} | {location}</p>
                <button>Edit</button>
            </div>
        </div>
    )
}
