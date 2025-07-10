import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'

export default function FormWrapper({
    title,
    description,
    form
}: {
    title: string,
    description?: string,
    form: React.ReactNode
}) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                {description && (
                    <CardDescription>Enter your email below to login</CardDescription>
                )}
            </CardHeader>
            <CardContent>
                {form}
            </CardContent>
        </Card>
    )
}
