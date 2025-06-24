import { verifyInvite } from '@/lib/invite';
import { redirect } from 'next/navigation';

export default async function AcceptInvitePage({ searchParams }: { searchParams: { token?: string } }) {
    const invite = searchParams.token ? await verifyInvite(searchParams.token) : null

    if (!invite || invite.accepted || new Date(invite.expiresAt) < new Date()) {
        return <div className='text-center mt-10'>Invalid or expired invitation.</div>
    }

    redirect(`/signup?token=${invite.token}`)
}