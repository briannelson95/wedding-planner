'use client'

import React, { useState } from 'react'
import EventInfo from './EventInfo'
import EventRsvpTracking from './EventRsvpTracking'
import ToDoList from '../ToDoList'
import { fetchEventTodos } from '@/lib/helper/fetchTodos'

interface Props {
    event: EventData
}

export default function EventDashboard({ event }: Props) {
    const [todos, setTodos] = useState(event.todos)

     async function refreshTodos() {
        try {
            const data = await fetchEventTodos(event.id)
            setTodos(data)
        } catch (err) {
            console.error('Failed to refresh todos:', err)
        }
    }

    console.log(todos)

    return (
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
            <EventInfo event={event} />
            <div className='lg:col-span-2 space-y-4'>
                <EventRsvpTracking eventGuests={event.eventGuests} />
                <ToDoList 
                    eventId={event.id}
                    initialTodos={todos}
                    onUpdate={refreshTodos}
                />
            </div>
        </div>
    )
}
