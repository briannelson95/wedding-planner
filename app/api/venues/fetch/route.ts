import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
    try {
        const venues = await prisma.venue.findMany()
        return NextResponse.json(venues)
    } catch (error) {
        console.error('Failed to fetch venues:', error)
        return new NextResponse('Failed to fetch venues', { status: 500 })
    }
}
