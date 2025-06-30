'use client'

import { SessionProvider } from 'next-auth/react'
import { ReactNode } from 'react'
import DashboardNavbar from '@/components/DashboardNavbar'

export default function AuthLayout({ children }: { children: ReactNode }) {
    
    return (
        <>
            <SessionProvider>
                <main className="p-4 max-w-[100rem] mx-auto relative">
                    <div className='grid grid-cols-1 md:grid-cols-5 gap-4'>
                        <DashboardNavbar />
                        <section className="md:col-span-4 mt-16 md:mt-0">
                        {children}
                        </section>
                    </div>
                </main>
            </SessionProvider>
        </>
    )
}
