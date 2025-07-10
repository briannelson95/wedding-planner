'use client'
import React, { useState } from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import Link from 'next/link'
import { Button } from '../ui/button'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [error, setError] = useState('');
    const router = useRouter();

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        const result = await signIn('credentials', {
            redirect: false,
            email,
            password,
        })

        console.log('[CLIENT] signIn result:', result)

        if (result?.error) {
            setError(result.error)
        } else {
            router.push('/dashboard')
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            <div className='flex flex-col gap-6'>
                <div className='grid gap-3'>
                    <Label htmlFor='email'>Email</Label>
                    <Input
                        id='email'
                        type='email'
                        placeholder='m@example.com'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className='grid gap-3'>
                    <div className='flex items-center'>
                        <Label htmlFor='password'>Password</Label>
                        <Link 
                            href={'#'}
                            className='ml-auto inline-block text-sm underline-offset-4 hover:underline'
                        >
                            Forgot your password?
                        </Link>
                    </div>
                    <Input 
                        id='password' 
                        type='password' 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required 
                    />
                </div>
                <div className='flex flex-col gap-3'>
                    <Button 
                        type="submit" 
                        className="w-full bg-brand-primary-600 hover:bg-brand-primary-400"
                    >
                        Login
                    </Button>
                    {error && <p className="text-red-500">{error}</p>}
                </div>
            </div>
        </form>
    )
}
