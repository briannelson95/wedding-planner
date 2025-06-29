// app/api/events/[eventId]/todos/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { mutations } from '@/lib/mutations';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function POST(
  req: NextRequest,
  { params }: { params: { eventId: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  const { name, dueDate } = await req.json();

  if (!name) {
    return NextResponse.json({ message: 'Name is required' }, { status: 400 });
  }

  try {
    const todo = await mutations.addTodoToEvent({
      eventId: params.eventId,
      name,
      dueDate,
    });
    return NextResponse.json(todo);
  } catch (error) {
    console.error('[CREATE_TODO]', error);
    return new NextResponse('Failed to create todo', { status: 500 });
  }
}
