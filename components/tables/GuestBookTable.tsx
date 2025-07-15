'use client'

import { ColumnDef } from '@tanstack/react-table'
import { DataTable } from './DataTable'

interface GuestBookEntryRow {
  id: string
  fName: string
  lName: string
  side: string
  address: string
  notes?: string | null
  phone?: string | null
  email?: string | null
  congratulated?: boolean | null
}

interface Props {
  guestBookEntries: GuestBookEntryRow[]
}

const columns: ColumnDef<GuestBookEntryRow>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => row.original.fName + " " + row.original.lName
  },
  {
    accessorKey: 'side',
    header: 'Side'
  },
  {
    accessorKey: 'email',
    header: 'Email',
    cell: ({ row }) => row.original.email || '—'
  },
  {
    accessorKey: 'phone',
    header: 'Phone',
    cell: ({ row }) => row.original.phone || '—'
  },
  {
    accessorKey: 'address',
    header: 'Address',
    cell: ({ row }) => row.original.address || '—'
  },
  {
    accessorKey: 'congratulated',
    header: 'Congratulated Engagement',
    cell: ({ row }) => row.original.congratulated == true ? "Yes" : 'No'
  },
  {
    accessorKey: 'notes',
    header: 'Notes',
    cell: ({ row }) => row.original.notes || '—'
  },

]

export default function GuestBookTable({ guestBookEntries }: Props) {
  return (
    <div className="mt-4">
      <DataTable columns={columns} data={guestBookEntries} />
    </div>
  )
}
