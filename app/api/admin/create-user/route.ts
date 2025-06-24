import { mutations } from '@/lib/mutations'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
    const body = await req.json()

    if (!body.username || !body.password || !body.role) {
        return new NextResponse('Missing fields', { status: 400 })
    }

    const user = await mutations.createUser({
        username: body.username,
        password: body.password,
        role: body.role,
        email: '',
    })

    return NextResponse.json({ id: user.id })
}
