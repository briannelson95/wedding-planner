import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcrypt'

export async function POST(req: NextRequest) {
    try {
        const { token, username, password } = await req.json()

        if (!token || !username || !password) {
            return NextResponse.json({ message: 'Missing fields' }, { status: 400 })
        }

        const invite = await prisma.inviteToken.findUnique({
        where: { token },
        })

        if (!invite || invite.accepted || new Date(invite.expiresAt) < new Date()) {
            return NextResponse.json({ message: 'Invalid or expired invite' }, { status: 400 })
        }

        const existingUser = await prisma.user.findFirst({
            where: {
                OR: [
                    { email: invite.email },
                    { username },
                ],
            },
        })

        if (existingUser) {
            return NextResponse.json({ message: 'A user with this email or username already exists' }, { status: 400 })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        await prisma.user.create({
            data: {
                email: invite.email,
                username,
                role: invite.role,
                password: hashedPassword,
            },
        })

        await prisma.inviteToken.update({
            where: { token },
            data: { accepted: true },
        })

        return NextResponse.json({ success: true })
    } catch (err) {
        console.error('[SIGNUP ERROR]', err)
        return new NextResponse('Internal Server Error', { status: 500 })
    }
}
