'use client'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'

export default function DashboardNavbar() {
    const session = useSession()
    console.log(session)
    return (
        <div className='bg-[#00000008] rounded-xl p-6 flex flex-col gap-2'>
            <h2 className='text-lg font-semibold'>Hello, {session.data?.user.username}</h2>
            <div className='*:bg-[#00000010] *:hover:bg-brand-primary-700 *:transition-colors *:duration-200 *:p-4 *:rounded-lg *:w-full flex flex-col gap-2'>
                <Link href={'/dashboard'} className='bg-brand-primary-800'>Overview</Link>
                <Link href={'/events'} className=''>Events</Link>
                <Link href={'/guest-book'} className=''>Guest Book</Link>
            </div>
        </div>
    )
}
