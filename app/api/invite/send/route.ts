import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../auth/[...nextauth]/route'
import { sendInviteEmail } from '@/lib/email'
import { createInvite } from '@/lib/invite'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  try {
        const session = await getServerSession(authOptions)

        if (!session?.user || !['COUPLE', 'PLANNER'].includes(session.user.role)) {
            return new NextResponse('Unauthorized', { status: 403 })
        }

        const { email, role } = await req.json()
        if (!email || !role) {
            return NextResponse.json({ message: 'Missing email or role' }, { status: 400 })
        }

        const existingUser = await prisma.user.findUnique({ where: { email } })
        if (existingUser) {
            return NextResponse.json({ message: 'User with this email already exists' }, { status: 400 })
        }

        const existingInvite = await prisma.inviteToken.findFirst({
            where: {
                email,
                accepted: false,
            },
        })

        if (existingInvite) {
            return NextResponse.json({ message: 'An invite already exists for this email' }, { status: 400 })
        }

        const invite = await createInvite({ email, role })
        const inviteUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/invite/accept?token=${invite.token}`

        await sendInviteEmail({
            to: email,
            inviterName: session.user.email || 'A wedding planner',
            inviteUrl,
            role,
        })

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('[INVITE SEND ERROR]', error)
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 })
    }
}
