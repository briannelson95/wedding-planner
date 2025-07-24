import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import Link from 'next/link'
import AddFirstGuestBookEntryClient from '../AddFirstGuestBookEntryClient'
import GuestBookQuickView from '../GuestBookQuickView'

interface GuestBookEntryProps {
    guestBookEntries: {
        id: string
        fName: string
        lName: string
        email?: string | null
        phone?: string | null
        address?: string | null
        notes?: string | null
        side: string
        congratulated?: boolean | null
        createdAt: Date
    }[]
}

export default function DashboardGuestBook(guestBookEntries: GuestBookEntryProps) {
    return (
        <Card className='md:col-start-6 col-span-2 row-span-2'>
            <CardHeader>
                <div className='flex justify-between items-center'>
                    <CardTitle>
                        Guest Book
                    </CardTitle>
                    <Link href={'/guest-book'}>View All</Link>
                </div>
            </CardHeader>
            <CardContent className='space-y-2'>
                {!guestBookEntries.guestBookEntries.length && <AddFirstGuestBookEntryClient />}
                {guestBookEntries.guestBookEntries.map(entry => (
                    <GuestBookQuickView key={entry.id} {...entry} />
                ))}
            </CardContent>
        </Card>
    )
}
