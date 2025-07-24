import VenuesTable from '@/components/tables/VenuesTable'
import { queries } from '@/lib/queries'
import React from 'react'

export default async function LocationsPage() {
    const venues = await queries.fetchAllLocations()

    return (
        <div>
            <VenuesTable eventLocations={venues} />
        </div>
    )
}
