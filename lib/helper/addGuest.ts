export async function handleAddGuest(data: {
    fName: string
    lName: string
    email?: string
    phone?: string
    address?: string
    side: string
    notes?: string
}) {
    try {
        const res = await fetch('/api/guestbook/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        })

        if (!res.ok) {
            const { message } = await res.json()
            throw new Error(message || 'Failed to add guest')
        }

        // Optionally: re-fetch entries or mutate state here
    } catch (err) {
        console.error('Error adding guest:', err)
    }
}