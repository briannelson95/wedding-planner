import AddFirstGuestBookEntryClient from '@/components/AddFirstGuestBookEntryClient'
import AddGuestBookEntryModal from '@/components/AddGuestBookEntryModal'
import CreateEventClient from '@/components/CreateEventClient'
import DashboardNavbar from '@/components/DashboardNavbar'
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
    const session = await getServerSession();

    const user = await prisma.user.findUnique({
        where: { email: session?.user.email }
    })

    return (
        <div className='grid grid-cols-7 gap-4'>
            <div className='col-span-5 row-span-3 bg-[#00000008] rounded-xl p-6 relative'>
                    <div>
                        <div className='w-full flex items-center justify-between'>
                            <h2 className='text-lg font-semibold py-4'>Your Events</h2>
                            <CreateEventClient />
                        </div>
                        {!events.length && <>You don&apos;t have any events yet. Create your first event.</>}
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
                <div className='row-span-5 col-start-6 col-span-2 bg-[#00000008] rounded-xl p-6'>
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
                </div>
        </div>
    )
}
