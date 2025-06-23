'use client'

import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
    const { data: session, status } = useSession();

    if (status === 'loading') return null;
    if (!session?.user) return null
    
    return (
        <nav className="flex justify-between items-center p-4 bg-gray-100 border-b">
            <div className="font-semibold">Wedding Planner</div>
            <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">
                    {session.user.email} ({session.user.role})
                </span>
                <button
                    className="text-sm text-blue-600 underline"
                    onClick={() => signOut({ callbackUrl: '/login' })}
                >
                    Logout
                </button>
            </div>
        </nav>
    )
}
