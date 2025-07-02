import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { parse } from 'csv-parse/sync'

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData()
        const file = formData.get('file') as File

        if (!file || file.type !== 'text/csv') {
            return NextResponse.json({ message: "Invalid file type or missing CSV file."}, { status: 400 })
        }

        const buffer = Buffer.from(await file.arrayBuffer())
        const csvString = buffer.toString('utf-8')

        const records = parse(csvString, {
            columns: true,
            skip_empty_lines: true,
            trim: true,
        })

        const validRecords = records.filter((r: any) => r.first && r.last && r.side)

        let created = 0
        let updated = 0

        for (const r of validRecords) {
            const existing = await prisma.guestBookEntry.findFirst({
                where: {
                    fName: r.first,
                    lName: r.last,
                }
            })

            const baseData = {
                fName: r.first,
                lName: r.last,
                side: r.side,
                email: r.email || undefined,
                phone: r.phone || undefined,
                address: r.address || undefined,
                notes: r.notes || undefined,
            }

            if (existing) {
                const updates: Record<string, string | undefined> = {}

                if (!existing.email && r.email) updates.email = r.email
                if (!existing.phone && r.phone) updates.phone = r.phone
                if (!existing.address && r.address) updates.address = r.address
                if (!existing.notes && r.notes) updates.notes = r.notes
                if (!existing.side && r.side) updates.side = r.side

                if (Object.keys(updates).length > 0) {
                    await prisma.guestBookEntry.update({
                        where: { id: existing.id },
                        data: updates,
                    })
                    updated++
                }
            } else {
                await prisma.guestBookEntry.create({
                    data: baseData,
                })
                created++
            }
        }

        return NextResponse.json({
            success: true,
            created,
            updated,
            totalProcessed: created + updated
        })

    } catch (err) {
        console.error('[CSV Upload Error]', err)
        return NextResponse.json({ message: 'Failed to upload guests' }, { status: 500 })
    }
}