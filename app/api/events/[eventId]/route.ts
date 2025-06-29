import { NextRequest, NextResponse } from 'next/server';
import { mutations } from '@/lib/mutations';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';

export async function PATCH(req: NextRequest, { params }: { params: { eventId: string } }) {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
        return new NextResponse('Unauthorized', { status: 401 });
    }

    const eventId = params.eventId;
    const body = await req.json();

    try {
        const updated = await mutations.updateEvent(eventId, {
            name: body.name,
            date: body.date,
            location: body.location,
            notes: body.notes,
        });
        return NextResponse.json(updated);
    } catch (error) {
        console.error('[PATCH EVENT]', error);
        return new NextResponse('Failed to update event', { status: 500 });
    }
}
