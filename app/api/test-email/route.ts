import { sendInviteEmail } from '@/lib/email'
import { NextResponse } from 'next/server'

export async function GET() {
    await sendInviteEmail({
        to: 'brian@briannelson.dev',
        token: 'testtoken123',
        inviterName: 'Test Admin',
    })

    return NextResponse.json({ status: 'sent' })
}
