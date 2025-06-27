/* eslint-disable @typescript-eslint/no-explicit-any */
interface GuestBookEntry {
    id: string
    fName: string
    lName: string
    side: string
    email?: string | null
    phone?: string | null
    address?: string | null
    notes?: string | null
    createdAt: Date
}

interface EventProps {
    id: string
    name: string
    date?: Date | null
    location?: string | null
    creator: { id: string; username: string; }
    createdAt: Date; date: Date | null;
    creatorId: string; 
    key: string;
}