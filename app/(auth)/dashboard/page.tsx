import EventInfoQuickView from '@/components/EventInfoQuickView'
import GuestBookQuickView from '@/components/GuestBookQuickView'
import { prisma } from '@/lib/prisma'
import { queries } from '@/lib/queries'
import { getServerSession } from 'next-auth'
import Link from 'next/link'
import React from 'react'

export default async function DashboardPage() {
    const events = await queries.fetchEvents();
    const guestBookEntries = await queries.fetchGuestBookEntries(5);
    const session = await getServerSession()

    const user = await prisma.user.findUnique({
        where: { email: session?.user.email }
    })
    // console.log(events)

    return (
        <div className='max-w-[100rem] mx-auto'>
            <div className='grid grid-cols-5 grid-rows-5 gap-4'>
                <div className='row-span-5 bg-[#00000008] rounded-xl p-6'>
                    <div className='py-4'>
                        <h2 className='text-lg font-semibold'>Hello, {user?.username}</h2>
                    </div>
                    <div className='bg-brand-primary-800 p-4 rounded-lg'>Overview</div>
                </div>
                <div className='col-span-3 row-span-3 bg-[#00000008] rounded-xl p-6 relative'>
                    <div>
                        <div className='w-full flex items-center justify-between'>
                            <h2 className='text-lg font-semibold py-4'>Your Events</h2>
                            <button
                                className='btn btn-primary h-fit'
                            >
                                Create Event
                            </button>
                        </div>
                        <div className='grid grid-cols-3'>
                            {events.map((item) => (
                                <EventInfoQuickView key={item.id} {...item} />
                            ))}
                        </div>
                    </div>
                    <Link href={'/events'} className='absolute bottom-4 right-4 text-sm text-brand-primary-400 hover:underline'>
                        View all
                    </Link>
                </div>
                <div className='row-span-5 col-start-5 bg-[#00000008] rounded-xl p-6'>
                    <div className='py-4 flex justify-between'>
                        <h2 className='text-lg font-semibold'>Guest Book</h2>
                        <Link 
                            href={'/guest-book'}
                            className='hover:cursor-pointer hover:underline text-brand-primary-500'
                        >
                            View All
                        </Link>
                    </div>
                    <div className='space-y-2'>
                        {guestBookEntries.map(entry => (
                            <GuestBookQuickView key={entry.id} {...entry} />
                        ))}
                    </div>
                </div>
            </div>
            {/* <div className='border rounded-lg max-w-6xl mx-auto p-6 space-y-4'>
                <h2 className='text-xl font-bold'>Your Events</h2>
                {events.map((item) => (
                    <Link key={item.id} href={`/events/${item.id}`} >
                        <div className='hover:cursor-pointer border rounded-xl p-2'>
                            <p>ID: {item.id}</p>
                            <p>Name: <strong>{item.name}</strong></p>
                            <p>Date: {item.date ? item.date.toISOString() : 'null'}</p>
                            <p>Location: {item.location ? item.location : 'null'}</p>
                            <p>Created By: {item.creator.username}</p>
                            <p>Created At: {item.createdAt.toISOString()}</p>
                            
                        </div>
                    </Link>
                ))}
                <Link
                    href={'/events'}
                    className='underline'
                >
                    See all events
                </Link>
            </div> */}
        </div>
    )
}
