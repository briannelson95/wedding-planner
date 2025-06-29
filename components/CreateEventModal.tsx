'use client'

import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react'
import { Fragment, useState } from 'react'

export default function CreateEventModal({
    isOpen,
    onClose,
    onSubmit
}: {
    isOpen: boolean
    onClose: () => void
    onSubmit: (data: { name: string; date?: string; location?: string }) => void
}) {
    const [name, setName] = useState('')
    const [date, setDate] = useState('')
    const [location, setLocation] = useState('')

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        onSubmit({ name, date, location })
        setName('')
        setDate('')
        setLocation('')
        onClose()
    }

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={onClose}>
                <TransitionChild
                    as={Fragment}
                    enter="ease-out duration-200"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-150"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-30" />
                </TransitionChild>

                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <TransitionChild
                        as={Fragment}
                        enter="ease-out duration-200"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-150"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <DialogPanel className="w-full max-w-lg transform overflow-hidden rounded bg-white p-6 text-left shadow-xl transition-all">
                            <DialogTitle className="text-lg font-bold mb-4">Create New Event</DialogTitle>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <input
                                    className="input input-bordered w-full"
                                    type="text"
                                    placeholder="Event Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                                <input
                                    className="input input-bordered w-full"
                                    type="datetime-local"
                                    placeholder="Date"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                />
                                <input
                                    className="input input-bordered w-full"
                                    type="text"
                                    placeholder="Location"
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                />
                                <div className="flex justify-end space-x-2">
                                    <button type="button" onClick={onClose} className="btn btn-outline">
                                        Cancel
                                    </button>
                                    <button type="submit" className="btn btn-primary">
                                        Create
                                    </button>
                                </div>
                            </form>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </Dialog>
        </Transition>
    )
}
