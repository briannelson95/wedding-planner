import { ReactNode } from 'react'

export default function PublicLayout({ children }: { children: ReactNode }) {
    return (
        <main>
            {/* Public site header if any */}
            {children}
        </main>
    )
}