'use client'

import { SessionProvider, useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import { ReactNode } from 'react'
import Navbar from '@/components/Navbar'

export default function AuthLayout({ children }: { children: ReactNode }) {
    
    return (
        <>
            <SessionProvider>
                <Navbar />
                <main className="p-4">
                    {/* Could also add a private header here */}
                    {children}
                </main>
            </SessionProvider>
        </>
    )
}
