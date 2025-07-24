export async function fetchVenuesClient() {
    const res = await fetch('/api/venues/fetch', { cache: 'no-store' }) // ensure no stale cache
    if (!res.ok) throw new Error('Failed to fetch venues')
    return res.json()
}