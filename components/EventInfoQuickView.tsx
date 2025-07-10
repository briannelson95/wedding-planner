import Link from 'next/link'
import React from 'react'

export default function EventInfoQuickView(props: EventProps) {
    return (
        <Link href={`/events/${props.id}`} >
            <div className='hover:cursor-pointer rounded-lg p-2 bg-brand-primary-900 hover:bg-brand-primary-800 transition-colors duration-200'>
                <h3 className='text-md font-semibold'>{props.name}</h3>
                <p>Date: {props.date ? props.date.toDateString() : 'null'}</p>
                <p>Location: {props.location ? props.location.name : 'null'}</p>
                <p className='text-xs mt-2'>Created By: {props.creator.username}</p>                                    
            </div>
        </Link>
    )
}
