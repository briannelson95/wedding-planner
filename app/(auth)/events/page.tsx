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
                {allEvents.length == 0 ? (
                    <>
                        You don't have any events yet. <Link href={'/events/create'} className='underline'>Create One!</Link>
                    </>
                ) : (
                    <table className='table-auto w-full'>
                        <thead>
                            <tr>
                                <th>Event Name</th>
                                <th>Event Date</th>
                                <th>Created by</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allEvents.map((item) => (
                                <tr 
                                    key={item.id}
                                    className='text-center'
                                >
                                    <td className=''><Link href={`/events/${item.id}`}>{item.name}</Link></td>
                                    <td className=''>{item.date?.toDateString()}</td>
                                    <td className=''>{item.creatorId}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    )
}
