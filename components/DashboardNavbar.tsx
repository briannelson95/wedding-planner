'use client'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'

export default function DashboardNavbar() {
    const session = useSession()
    return (
        <div className='bg-white md:bg-[#00000008] rounded-xl w-full md:w-auto p-2 pr-10 md:p-6 fixed md:static top-0 md:flex flex-col gap-2'>
            <h2 className='text-lg font-semibold'>Hello, {session.data?.user.username}</h2>
            <div className='*:bg-[#00000010] *:hover:bg-brand-primary-700 *:transition-colors *:duration-200 *:px-2 *:py-1 md:*:p-4 *:rounded-lg *:w-full flex md:flex-col gap-2'>
                <Link href={'/dashboard'} className='bg-brand-primary-800'>Overview</Link>
                <Link href={'/events'} className=''>Events</Link>
                <Link href={'/guest-book'} className=''>Guest Book</Link>
            </div>
        </div>
    )
}
