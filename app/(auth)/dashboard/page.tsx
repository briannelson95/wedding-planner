import DashboardEvents from '@/components/dashboard/DashboardEvents'
import DashboardGuestBook from '@/components/dashboard/DashboardGuestBook'
import { queries } from '@/lib/queries'
import React from 'react'

export default async function DashboardPage() {
    const events = await queries.fetchQuickViewEvents();
    const guestBookData = await queries.fetchGuestBookEntries({ takeOnlyRecent: 5 });

    const guestBookEntries = Array.isArray(guestBookData) ? guestBookData : guestBookData.entries;

    return (
        <>
            
            <div className='grid grid-cols-1 md:grid-cols-7 gap-4'>
                <DashboardEvents events={events} />
                <DashboardGuestBook guestBookEntries={guestBookEntries} />
                {/* <div className='md:col-span-5 md:row-span-3 bg-[#00000008] rounded-xl p-4 md:p-6 relative'>
                    <div>
                        <div className='w-full flex items-center justify-between'>
                            <h2 className='text-lg font-semibold py-4'>Your Events</h2>
                            <CreateEventClient />
                        </div>
                        {!events.length && <>You don&apos;t have any events yet. Create your first event.</>}
                        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                            {events.map((item) => (
                                <EventInfoQuickView key={item.id} {...item} />
                            ))}
                        </div>
                    </div>
                    <div className='w-full text-right mt-2'>
                        <Link href={'/events'} className='md:absolute bottom-4 right-4 text-sm text-brand-primary-400 hover:underline'>
                            View all
                        </Link>
                    </div>
                </div>
                <div className='md:row-span-5 md:col-start-6 col-span-2 bg-[#00000008] rounded-xl p-6'>
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
                        {!guestBookEntries.length && <AddFirstGuestBookEntryClient />}
                        {guestBookEntries.map(entry => (
                            <GuestBookQuickView key={entry.id} {...entry} />
                        ))}
                    </div>
                </div> */}
            </div>
        </>
    )
}
