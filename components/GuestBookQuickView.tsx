'use client'
import { Transition } from '@headlessui/react';
import React, { Fragment, useState } from 'react'

export default function GuestBookQuickView(props: GuestBookEntry) {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const handleOpenView = () => setIsOpen(true);
    const handleCloseView = () => setIsOpen(false);

    return (
        <>
            <div
                className='p-4 bg-brand-primary-900 rounded-lg hover:cursor-pointer hover:bg-brand-background-950 transition-colors duration-200'
                onClick={handleOpenView}
            >   
                <p>{props.fName + " " + props.lName}</p>
                <p className='text-xs'>Added on: {new Date(props.createdAt).toDateString()}</p>
            </div>

            <Transition
                as={Fragment}
                show={isOpen}
                enter="transition duration-200 ease-out"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="transition duration-150 ease-in"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
            >
                <div className="absolute right-4 top-4 bg-white border shadow-lg rounded-lg p-6 w-[350px] max-w-full z-30">
                    <div className="flex justify-between items-center mb-2">
                        <h2 className="text-lg font-bold">Guest Details</h2>
                        <button onClick={handleCloseView} className="text-sm text-gray-600 hover:text-red-500">
                        ✕
                        </button>
                    </div>

                    <div className="space-y-2 text-sm">
                        <p><strong>Name:</strong> {props.fName} {props.lName}</p>
                        <p><strong>Side:</strong> {props.side}</p>
                        <p><strong>Email:</strong> {props.email || 'N/A'}</p>
                        <p><strong>Phone:</strong> {props.phone || 'N/A'}</p>
                        <p><strong>Address:</strong> {props.address || 'N/A'}</p>
                        <p><strong>Notes:</strong> {props.notes || 'None'}</p>
                        <p className='text-xs text-gray-500 pt-2'>Created: {new Date(props.createdAt).toLocaleString()}</p>
                    </div>
                </div>
            </Transition>
        </>
    )
}
