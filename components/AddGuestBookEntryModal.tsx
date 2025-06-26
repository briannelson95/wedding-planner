'use client'
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react'
import { Fragment, useState } from 'react'

export default function AddGuestBookEntryModal({ isOpen, onClose, onSubmit }: {
    isOpen: boolean
    onClose: () => void
    onSubmit: (data: { fName: string, lName: string, email: string, phone?: string, address?: string, side: string, notes?: string }) => void
}) {
    const [fName, setFName] = useState('');
    const [lName, setLName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [side, setSide] = useState('');
    const [notes, setNotes] = useState('');

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        onSubmit({ fName, lName, email, phone, address, side, notes })
        setFName('')
        setLName('')
        setEmail('')
        setPhone('')
        setAddress('')
        setSide('')
        setNotes('')
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
                                Add Guest Entry
                            </DialogTitle>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <input
                                    className="input input-bordered w-full"
                                    type="text"
                                    placeholder="First name"
                                    value={fName}
                                    onChange={e => setFName(e.target.value)}
                                    required
                                />
                                <input
                                    className="input input-bordered w-full"
                                    type="text"
                                    placeholder="Last name"
                                    value={lName}
                                    onChange={e => setLName(e.target.value)}
                                    required
                                />
                                <input
                                    className="input input-bordered w-full"
                                    type="email"
                                    placeholder="Email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                />
                                <input
                                    className="input input-bordered w-full"
                                    type="tel"
                                    placeholder="Phone"
                                    value={phone}
                                    onChange={e => setPhone(e.target.value)}
                                />
                                <input
                                    className="input input-bordered w-full"
                                    type="text"
                                    placeholder="Address"
                                    value={address}
                                    onChange={e => setAddress(e.target.value)}
                                />
                                <input
                                    className="input input-bordered w-full"
                                    type="text"
                                    placeholder="Side (e.g., Bride/Groom)"
                                    value={side}
                                    onChange={e => setSide(e.target.value)}
                                    required
                                />
                                <textarea
                                    className="input input-bordered w-full"
                                    placeholder='Notes (e.g. Family/Friend of ...)'
                                    value={notes}
                                    onChange={e => setNotes(e.target.value)}
                                />
                                <div className="flex justify-end space-x-2">
                                    <button type="button" onClick={onClose} className="btn btn-outline">
                                        Cancel
                                    </button>
                                    <button type="submit" className="btn btn-primary">
                                        Add
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
