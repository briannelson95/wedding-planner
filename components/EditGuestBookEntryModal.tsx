'use client'

import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react'
import { Fragment, useState, useEffect } from 'react'

export default function EditGuestBookEntryModal({ isOpen, onClose, initialData, onSubmit }: {
    isOpen: boolean
    onClose: () => void
    initialData: {
        id: string
        fName: string
        lName: string
        email?: string
        phone?: string
        address?: string
        side?: string
        notes?: string
    }
    onSubmit: (updated: typeof initialData) => void
}) {
    const [formData, setFormData] = useState(initialData)

    useEffect(() => {
        setFormData(initialData)
    }, [initialData])

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }))
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        onSubmit(formData)
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
                        <DialogTitle className="text-lg font-bold mb-4">
                            Edit Guest Entry
                        </DialogTitle>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <input
                                    className="input input-bordered w-full"
                                    type="text"
                                    name="name"
                                    placeholder='First Name'
                                    value={formData.fName}
                                    onChange={handleChange}
                                    required
                                />
                                <input
                                    className="input input-bordered w-full"
                                    type="text"
                                    name="name"
                                    placeholder='Last Name'
                                    value={formData.lName}
                                    onChange={handleChange}
                                    required
                                />
                                <input
                                    className="input input-bordered w-full"
                                    type="email"
                                    placeholder='email'
                                    name="email"
                                    value={formData.email || ''}
                                    onChange={handleChange}
                                />
                                <input
                                    className="input input-bordered w-full"
                                    type="tel"
                                    name="phone"
                                    placeholder="phone"
                                    value={formData.phone || ''}
                                    onChange={handleChange}
                                />
                                <input
                                    className="input input-bordered w-full"
                                    type="text"
                                    name="address"
                                    placeholder="address"
                                    value={formData.address || ''}
                                    onChange={handleChange}
                                />
                                <input
                                    className="input input-bordered w-full"
                                    type="text"
                                    name="side"
                                    placeholder="Bride/Groom"
                                    value={formData.side || ''}
                                    onChange={handleChange}
                                />
                                <textarea
                                    className='input input-bordered w-full'
                                    name='notes'
                                    placeholder="notes"
                                    value={formData.notes || ''}
                                    onChange={handleChange}
                                />
                                <div className="flex justify-end space-x-2">
                                    <button type="button" onClick={onClose} className="btn btn-outline">
                                        Cancel
                                    </button>
                                    <button type="submit" className="btn btn-primary">
                                        Save
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
