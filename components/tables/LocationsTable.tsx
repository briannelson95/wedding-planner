'use client'

import { ColumnDef } from '@tanstack/react-table'
import { DataTable } from './DataTable'

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

export default function LocationsTable({ eventLocations }: Props) {
  return (
    <div className="mt-4">
      <DataTable columns={columns} data={eventLocations} />
    </div>
  )
}
