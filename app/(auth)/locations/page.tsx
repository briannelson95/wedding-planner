import LocationsTable from '@/components/tables/LocationsTable'
import { queries } from '@/lib/queries'
import React from 'react'

export default async function LocationsPage() {
    const eventLocations = await queries.fetchAllLocations()

    return (
        <div>
            <LocationsTable eventLocations={eventLocations} />
        </div>
    )
}
