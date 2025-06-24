'use client'
import { useState } from 'react'

export default function CreateUserPage() {
    const [form, setForm] = useState({ username: '', password: '', role: 'GUEST' })
    const [success, setSuccess] = useState(false)

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        await fetch('/api/admin/create-user', {
            method: 'POST',
            body: JSON.stringify(form),
        })
        setSuccess(true)
    }

    return (
        <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-10 space-y-4">
            <h1 className="text-xl font-bold">Create Local User</h1>
            <input placeholder="Username" onChange={e => setForm({ ...form, username: e.target.value })} />
            <input placeholder="Password" type="password" onChange={e => setForm({ ...form, password: e.target.value })} />
            <select onChange={e => setForm({ ...form, role: e.target.value })}>
                <option value="COUPLE">COUPLE</option>
                <option value="PLANNER">PLANNER</option>
                <option value="GUEST">GUEST</option>
            </select>
            <button className="btn">Create</button>
            {success && <p className="text-green-600">User created</p>}
        </form>
    )
}
