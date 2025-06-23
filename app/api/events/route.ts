import { auth } from '@/lib/auth';
import { mutations } from '@/lib/mutations';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    const session = await auth();
    if (!session?.user) return new NextResponse('Unauthorized', { status: 401 });

    const body = await req.json();
    const { name, date, location } = body;

    const event = await mutations.createEvent({
        name,
        date,
        location,
        creatorId: session.user.id,
    });

    return NextResponse.json(event)
}