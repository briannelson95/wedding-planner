'use client'

import { useSession, signOut } from "next-auth/react";
import { UserIcon } from "./icons/UserIcon";
import Link from "next/link";

export default function Navbar() {
    const { data: session, status } = useSession();

    if (status === 'loading') return null;
    if (!session?.user) return null
    
    return (
        <nav className="flex justify-between items-center p-4 bg-background border-b">
            <div className="flex items-center space-x-2">
                <div className="font-semibold">Wedding Planner</div>
                {session.user && (
                    <Link
                        href={'/dashboard'}
                    >
                        Dashboard
                    </Link>
                )}
            </div>
            
            <div className="flex items-center space-x-2">
                <UserIcon />
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
