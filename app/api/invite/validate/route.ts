// app/api/invite/validate/route.ts
import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
    const { token } = await req.json()

    const invite = await prisma.inviteToken.findUnique({
        where: { token },
    })

    if (!invite || invite.accepted) {
        return new NextResponse('Invalid or expired invite', { status: 400 })
    }

    return NextResponse.json({
        email: invite.email,
        role: invite.role,
    })
}
