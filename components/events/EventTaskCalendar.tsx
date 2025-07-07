import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import type { EventInput } from '@fullcalendar/core'

interface EventTodo {
    id: string
    name: string
    complete: boolean
    dueDate?: string | null
    notes?: string | null
    eventId: string
    createdAt: string
    updatedAt: string
}

export default function EventTaskCalendar({ todos }: { todos: EventTodo[] }) {
    const calendarEvents: EventInput[] = todos
        .filter(todo => !!todo.dueDate)
        .map(todo => ({
            id: todo.id,
            title: todo.name,
            start: todo.dueDate as string,
            backgroundColor: todo.complete ? '#9ae6b4' : '#fbd38d',
            borderColor: todo.complete ? '#38a169' : '#dd6b20',
            allDay: true,
        }))
    return (
        <FullCalendar
            plugins={[ dayGridPlugin ]}
            initialView="dayGridMonth"
            height={650}
            events={calendarEvents}
        />
    )
}