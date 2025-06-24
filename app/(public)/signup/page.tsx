import { verifyInvite } from '@/lib/invite'
import SignupForm from '@/components/SignupForm'

interface Props {
    searchParams: {
        token?: string
    }
}

export default async function SignupPage({ searchParams }: Props) {
    const invite = searchParams.token ? await verifyInvite(searchParams.token) : null

    if (!invite || invite.accepted || new Date(invite.expiresAt) < new Date()) {
        return <div className="text-center mt-10">Invalid or expired invitation.</div>
    }

    return (
        <div className="max-w-md mx-auto mt-10">
            <h1 className="text-2xl font-bold mb-4">Complete Your Signup</h1>
            <SignupForm invite={invite} />
        </div>
    )
}
