import { NextRequest, NextResponse } from 'next/server'
import { mutations } from '@/lib/mutations'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../auth/[...nextauth]/route'

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session?.user || !['COUPLE', 'PLANNER'].includes(session.user.role)) {
    return new NextResponse('Unauthorized', { status: 403 })
  }

  try {
    const data = await req.json()
    const updated = await mutations.updateGuestBookEntry(params.id, data)
    return NextResponse.json(updated)
  } catch (err) {
    console.error('[EDIT GUESTBOOK ENTRY]', err)
    return new NextResponse('Failed to update guestbook entry', { status: 500 })
  }
}
