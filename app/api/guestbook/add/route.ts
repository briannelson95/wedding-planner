import { NextRequest, NextResponse } from 'next/server'
import { mutations } from '@/lib/mutations'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../auth/[...nextauth]/route'

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user || !['COUPLE', 'PLANNER'].includes(session.user.role)) {
    return new NextResponse('Unauthorized', { status: 403 })
  }

  try {
    const data = await req.json()
    const entry = await mutations.createGuestBookEntry(data)
    return NextResponse.json(entry)
  } catch (err) {
    console.error('[ADD GUESTBOOK ENTRY]', err)
    return new NextResponse('Failed to create guestbook entry', { status: 500 })
  }
}
