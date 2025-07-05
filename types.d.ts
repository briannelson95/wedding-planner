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

interface Creator {
    id: string
    email: string
    name: string | null
    role: 'COUPLE' | 'PLANNER' | 'GUEST'
}

interface Todo {
    id: string
    name: string
    complete: boolean
    dueDate?: string | null
    createdAt: string
    updatedAt?: string
    dueDate?: string | null
    notes?: string | null
}

interface EventData {
    id: string
    name: string
    date: Date | null
    location: string | null
    creatorId: string
    createdAt: string
    creator: Creator
    guests: any[]
    notes?: string
    eventGuests: any[]
    todos: Todo[] 
}
