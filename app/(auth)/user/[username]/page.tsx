import SendInviteForm from '@/components/SendInviteForm';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import React from 'react'

export default async function UserPage({ params }: { params: { username: string } }) {
    const raw = params.username
    const username = raw.startsWith('@') ? raw.slice(1) : raw
    
    const user = await prisma.user.findUnique({
      where: { username },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
    },
  })

  if (!user) notFound()

  return (
    <>
      <div className="max-w-2xl mx-auto py-10">
        <h1 className="text-3xl font-bold mb-2">@{username}</h1>
        <p className="text-gray-600">Email: {user.email}</p>
        <p className="text-gray-600">Role: {user.role}</p>
        <p className="text-gray-500 text-sm">Joined: {user.createdAt.toDateString()}</p>
      </div>
      <h2 className='text-xl font-bold'>Invite More People</h2>
      <SendInviteForm />
    </>
  )
}
