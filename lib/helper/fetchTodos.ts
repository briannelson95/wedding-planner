export async function fetchEventTodos(eventId: string) {
    const res = await fetch(`/api/events/${eventId}/todo`)
    if (!res.ok) throw new Error('Failed to fetch todos')
    return await res.json()
}