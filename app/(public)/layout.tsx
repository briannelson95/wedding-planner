'use client'
import Navbar from '@/components/Navbar'
import { SessionProvider } from 'next-auth/react'
import { ReactNode } from 'react'

export default function PublicLayout({ children }: { children: ReactNode }) {
    return (
        <>
            <SessionProvider>
                <Navbar />
                <main>
                    {/* Public site header if any */}
                    {children}
                </main>
            </SessionProvider>
        </>
    )
}