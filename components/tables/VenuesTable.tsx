'use client'

import { ColumnDef } from '@tanstack/react-table'
import { DataTable } from './DataTable'
import { Button } from '../ui/button'
import DialogWrapper from '../dialogs/DialogWrapper'
import CreateVenueForm from '../forms/CreateVenueForm'
import { useState } from 'react'
import { fetchVenuesClient } from '@/lib/helper/fetchVenues'

interface LocationRow {
  id: string
  name: string
  address: string
  city: string
  state: string
  postalCode: string
  country: string
  phone?: string | null
  email?: string | null
}

interface Props {
  eventLocations: LocationRow[]
}

const columns: ColumnDef<LocationRow>[] = [
  {
    accessorKey: 'name',
    header: 'Name'
  },
  {
    accessorKey: 'address',
    header: 'Address'
  },
  {
    accessorKey: 'city',
    header: 'City'
  },
  {
    accessorKey: 'state',
    header: 'State'
  },
  {
    accessorKey: 'postalCode',
    header: 'Postal Code'
  },
  {
    accessorKey: 'country',
    header: 'Country'
  },
  {
    accessorKey: 'phone',
    header: 'Phone',
    cell: ({ row }) => row.original.phone || '—'
  },
  {
    accessorKey: 'email',
    header: 'Email',
    cell: ({ row }) => row.original.email || '—'
  }
]

export default function VenuesTable({ eventLocations }: Props) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [venues, setVenues] = useState<LocationRow[]>(eventLocations)

  async function refreshVenues() {
    try {
      const updated = await fetchVenuesClient()
      setVenues(updated)
    } catch (err) {
      console.error('Failed to refresh venues:', err)
    }
  }

  return (
    <div className="space-y-4">
      <Button 
        variant={'outline'}
        onClick={() => setIsDialogOpen(true)}
      >
        Create Venue
      </Button>
      <DataTable columns={columns} data={venues} />
      <DialogWrapper
        title="Create a New Venue"
        description="Enter the Venue information below"
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        form={<CreateVenueForm onSuccess={async () => {
            await refreshVenues()
            setIsDialogOpen(false)
          }} 
        />}
      />
    </div>
  )
}
