import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcrypt';

export async function POST(req: NextRequest) {
    const { email, password, role } = await req.json();

    const existing = await prisma.user.findUnique({ where: { email }});
    if (existing) return new NextResponse('User already exists', { status: 400 });

    const hashed = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
        data: {
            email,
            password: hashed,
            role
        }
    });

    return NextResponse.json(user)
}