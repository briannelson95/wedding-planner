'use client'

import { SessionProvider } from 'next-auth/react'
import { redirect } from 'next/navigation'
import { ReactNode } from 'react'
import DashboardNavbar from '@/components/DashboardNavbar'

export default function AuthLayout({ children }: { children: ReactNode }) {
    
    return (
        <>
            <SessionProvider>
                <main className="p-4 max-w-[100rem] mx-auto">
                    <div className='grid grid-cols-5 gap-4'>
                        <DashboardNavbar />
                        <section className="col-span-4">
                        {children}
                        </section>
                    </div>
                </main>
            </SessionProvider>
        </>
    )
}
