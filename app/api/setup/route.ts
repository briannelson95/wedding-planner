import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcrypt';

export async function POST(req: NextRequest) {
    const { email, username, password, role } = await req.json();

    const existingUsername = await prisma.user.findUnique({
        where: { username },
    })
    if (existingUsername) {
        return new NextResponse('Username already taken', { status: 400 })
    }

    const existing = await prisma.user.findUnique({ where: { email }});
    if (existing) return new NextResponse('User already exists', { status: 400 });

    const hashed = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
        data: {
            email,
            username,
            password: hashed,
            role
        }
    });

    return NextResponse.json(user)
}