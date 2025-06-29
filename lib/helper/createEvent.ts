export async function handleCreateEvent(data: {
    name: string
    date?: string
    location?: string
}) {
    try {
        const res = await fetch('/api/events/create', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        })

        if (!res.ok) {
            const { message } = await res.json()
            throw new Error(message || 'Failed to create event')
        }

        // Optionally return or mutate data
        return await res.json()
    } catch (err) {
        console.error('Error creating event:', err)
    }
}
