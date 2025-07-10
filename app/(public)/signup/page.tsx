import { verifyInvite } from '@/lib/invite'
import FormWrapper from '@/components/forms/FormWrapper'
import SignUpForm from '@/components/forms/SignUpForm'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { IconArrowLeft } from '@tabler/icons-react'

interface Props {
    searchParams: {
        token?: string
    }
}

export default async function SignupPage({ searchParams }: Props) {
    const invite = searchParams.token ? await verifyInvite(searchParams.token) : null

    if (!invite || invite.accepted || new Date(invite.expiresAt) < new Date()) {
        return (
            <div className="flex min-h-svh w-full justify-center p-6 md:p-10">
                <div className="w-full max-w-sm">
                    <Card>
                        <CardHeader className='py-2'>
                            <CardTitle>
                                <div className="text-center">Invalid or expired invitation.</div>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>Reach out to the couple or event planner to get a new invitation link.</p>
                            <Link href={'/'} className='mt-4 text-brand-primary-400 flex items-center hover:underline'>
                                <IconArrowLeft />
                                Back to Homepage
                            </Link>
                        </CardContent>
                    </Card>

                </div>
            </div>
        )
    }

    return (
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm">
                <FormWrapper
                    title='Complete Your Signup'
                    description='Choose a username to finish signing up'
                    form={<SignUpForm invite={invite} />}
                />
            </div>
        </div>
    )
}
