import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { queries } from '@/lib/queries'
import { getServerSession } from 'next-auth'
import GuestBookPageClient from '@/components/GuestBookPageClient'

export default async function GuestBookPage({ searchParams }: { searchParams: { page?: string } }) {
    const session = await getServerSession(authOptions)
    if (!session?.user) return <p className='text-center mt-10'>Unauthorized</p>

    const currentPage = Number(searchParams.page) || 1

    const guestBookData = await queries.fetchGuestBookEntries({
        page: currentPage,
        pageSize: 20,
    })

    const { entries, totalPages, currentPage: verifiedPage } = !Array.isArray(guestBookData)
        ? guestBookData
        : { entries: guestBookData, totalPages: 1, currentPage: 1 }

    return (
        <GuestBookPageClient
            entries={entries}
            totalPages={totalPages}
            currentPage={verifiedPage}
        />
    )
}
