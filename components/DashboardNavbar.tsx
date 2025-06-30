'use client'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import EllipsisIcon from './icons/EllipsisIcon'

function Menu ({ onClose }: { onClose: () => void }) {
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                onClose()
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [onClose])

    return (
       <div
            ref={menuRef}
            className="absolute right-0 top-2 bg-white border border-gray-200 rounded shadow-md p-2 z-50"
        >
            <button
                onClick={() => signOut({ callbackUrl: '/login' })}
                className="text-sm text-red-600 hover:underline"
            >
                Logout
            </button>
        </div>
    )
}

export default function DashboardNavbar() {
    const session = useSession()
    const [showMenu, setShowMenu] = useState(false);
    return (
        <div className='bg-white md:bg-[#00000008] rounded-xl w-full md:w-auto p-2 pr-10 md:p-6 fixed md:static top-0 md:flex flex-col gap-2'>
            <div className='w-full flex justify-between relative'>
                <h2 className='text-lg font-semibold'>Hello, {session.data?.user.username}</h2>
                <button
                    onClick={() => setShowMenu(prev => !prev)}
                    className="hover:cursor-pointer relative z-10"
                >
                    <EllipsisIcon />
                </button>
                {showMenu && <Menu onClose={() => setShowMenu(false)} />}
            </div>
                        
            <div className='*:bg-[#00000010] *:hover:bg-brand-primary-700 *:transition-colors *:duration-200 *:px-2 *:py-1 md:*:p-4 *:rounded-lg *:w-full flex md:flex-col gap-2'>
                <Link href={'/dashboard'} className='bg-brand-primary-800'>Overview</Link>
                <Link href={'/events'} className=''>Events</Link>
                <Link href={'/guest-book'} className=''>Guest Book</Link>
            </div>
        </div>
    )
}
