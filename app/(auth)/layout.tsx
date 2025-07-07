'use client'

import { SessionProvider } from 'next-auth/react'
import { ReactNode, useContext } from 'react'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/app-sidebar'
import { SiteHeader } from '@/components/site-header'
import { UserContext } from '@/context/UserContext'
import { redirect } from 'next/navigation'

export default function AuthLayout({ children }: { children: ReactNode }) {
    const { currentUser, loading } = useContext(UserContext)

    if (loading) {
        return <>Loading...</>
    }

    if (!currentUser) {
        redirect('/login')
    }

    console.log(currentUser)
    
    return (
        <main>
            <SessionProvider>
                <SidebarProvider
                    style={
                        {
                            "--sidebar-width": "calc(var(--spacing) * 72)",
                            "--header-height": "calc(var(--spacing) * 12)",
                        } as React.CSSProperties
                    }
                >
                    <AppSidebar />
                    <SidebarInset>
                        <SiteHeader />
                        <main className="flex flex-1 flex-col">
                             <div className="@container/main flex flex-1 flex-col gap-2">
                                <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 px-4">
                                    {children}
                                </div>
                            </div>
                        </main>
                    </SidebarInset>
                </SidebarProvider>
            </SessionProvider>
        </main>
    )
}
