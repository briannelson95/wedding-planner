'use client'
import { useSession } from 'next-auth/react'
import React, { createContext, useEffect, useState } from 'react'

type UserContextType = {
    currentUser: User | null
    loading: boolean
}

export const UserContext = createContext<UserContextType>({
    currentUser: null,
    loading: true
});

export const UserContextProvider = ({ children }: { children: React.ReactNode }) => {
    const { data: session, status } = useSession();
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchUser() {
            try {
                const res = await fetch('api/users/current-user')
                if (!res.ok) throw new Error('User not found')

                const data: User = await res.json()
                setCurrentUser(data)
            } catch (err) {
                console.error('Failed to fetch current user:', err)
            } finally {
                setLoading(false)
            }
        }

        if (status === 'authenticated' && session?.user?.id) {
            fetchUser()
        } else if (status === 'unauthenticated') {
            setLoading(false)
        }
    }, [session?.user.id, status])

    return (
        <UserContext.Provider value={{ currentUser, loading }}>
            {children}
        </UserContext.Provider>
    )
}
