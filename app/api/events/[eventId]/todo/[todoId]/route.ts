// app/api/events/[eventId]/todos/[todoId]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { mutations } from '@/lib/mutations';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function PATCH(
    req: NextRequest,
    { params }: { params: { todoId: string; eventId: string } }
) {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
        return new NextResponse('Unauthorized', { status: 401 });
    }

    const { name, dueDate, complete } = await req.json();

    try {
        const updated = await mutations.updateEventTodo(params.todoId, {
            name,
            dueDate,
            complete,
        });

        return NextResponse.json(updated);
    } catch (error) {
        console.error('[UPDATE_TODO]', error);
        return new NextResponse('Failed to update todo', { status: 500 });
    }
}

export async function DELETE(
    _req: NextRequest,
    { params }: { params: { todoId: string; eventId: string } }
) {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
        return new NextResponse('Unauthorized', { status: 401 });
    }

    try {
        await mutations.deleteEventTodo(params.todoId);
        return new NextResponse(null, { status: 204 });
    } catch (error) {
        console.error('[DELETE_TODO]', error);
        return new NextResponse('Failed to delete todo', { status: 500 });
    }
}

