import Link from 'next/link'
import React from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card'

export default function EventInfoQuickView(props: QucikEventProps) {
    return (
        <Link href={`/events/${props.id}`}>
            <Card className='bg-brand-primary-900 hover:bg-brand-primary-800 transition-colors duration-200'>
                <CardHeader>
                    <CardTitle>{props.name}</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>Date: {props.date ? props.date.toDateString() : 'null'}</p>
                    <p>Location: {props.venue ? props.venue.name : 'null'}</p>
                </CardContent>
                <CardFooter>
                    <p className='text-xs mt-2'>Created By: {props.creator.username}</p>
                </CardFooter>
            </Card>
        </Link>
    )
}
