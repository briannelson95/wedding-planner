'use client'
import React, { useState } from 'react'
import CreateEventModal from './CreateEventModal'
import { handleCreateEvent } from '@/lib/helper/createEvent';

export default function CreateEventClient() {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <>
            <button
                className='btn btn-primary h-fit'
                onClick={() => setIsOpen(true)}
            >
                Create Event
            </button>
            <CreateEventModal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                onSubmit={handleCreateEvent}
            />
        </>
    )
}
