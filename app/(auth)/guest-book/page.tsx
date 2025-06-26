import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { queries } from '@/lib/queries'
import { getServerSession } from 'next-auth'
import GuestBookPageClient from '@/components/GuestBookPageClient'

export default async function GuestBookPage() {
    const session = await getServerSession(authOptions)
    if (!session?.user) return <p className='text-center mt-10'>Unauthorized</p>

    const entries = await queries.fetchGuestBookEntries()

    return <GuestBookPageClient entries={entries} />
}
