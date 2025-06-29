'use client'
import React, { useState } from 'react'
import AddGuestBookEntryModal from './AddGuestBookEntryModal';
import { handleAddGuest } from '@/lib/helper/addGuest';

export default function AddFirstGuestBookEntryClient() {
    const [isOpen, setIsOpen] = useState(false);
    return (
       <div className='w-full flex flex-col gap-2'>
            <p className='text-sm'>You haven&apos;t added anyone to your guest book yet.</p>
            <button
                className='btn btn-primary'
                onClick={() => setIsOpen(true)}
            >
                Add your first guest
            </button>
            <AddGuestBookEntryModal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                onSubmit={handleAddGuest}
            />
        </div>
    )
}
