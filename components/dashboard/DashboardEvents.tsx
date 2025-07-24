import React from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import Link from 'next/link'
import EventInfoQuickView from '../EventInfoQuickView'

interface EventsProps {
    events: {
        id: string
        name: string
        date?: Date | null
        creator: {
            id: string,
            username: string
        },
        venue?: {
            name: string
        } | null
    }[]
}

export default function DashboardEvents({events}: EventsProps) {
    return (
        <Card className='md:col-span-5 pb-3'>
            <CardHeader>
                <div className='flex justify-between items-center'>
                    <CardTitle>
                        Your Events
                    </CardTitle>
                    <Button
                        className='bg-brand-primary-600 hover:bg-brand-primary-400'
                    >
                        Create Event
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                <div className='grid md:grid-cols-3'>
                    {events.map((item) => (
                        <EventInfoQuickView key={item.id} {...item} />
                    ))}
                </div>
            </CardContent>
            <CardFooter>
                <div className='text-right w-full text-sm'>
                    <Link href={'/events'}>View all</Link>
                </div>
            </CardFooter>
        </Card>
    )
}
