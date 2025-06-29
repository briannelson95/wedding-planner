'use client'
import React, { useState } from 'react'

interface Todo {
    id: string
    name: string
    complete: boolean
    dueDate?: string | null
}

interface Props {
    eventId: string
    initialTodos: Todo[]
    onUpdate: () => void
}

export default function ToDoList({ eventId, initialTodos, onUpdate }: Props) {
    const [todos, setTodos] = useState(initialTodos)
    const [newName, setNewName] = useState('')
    const [newDueDate, setNewDueDate] = useState('')

    async function handleAdd() {
        if (!newName.trim()) return

        const res = await fetch(`/api/events/${eventId}/todo`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: newName, dueDate: newDueDate || null }),
        })

        const data = await res.json()
        if (res.ok) {
            setTodos(prev => [...prev, data])
            setNewName('')
            setNewDueDate('')
        }
        if (onUpdate) await onUpdate()
    }

    async function toggleComplete(id: string, complete: boolean) {
        const res = await fetch(`/api/events/${eventId}/todo/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ complete }),
        })

        if (res.ok) {
            setTodos(prev =>
                prev.map(todo =>
                todo.id === id ? { ...todo, complete } : todo
                )
            )
        }
        if (onUpdate) await onUpdate()
    }

    async function handleDelete(id: string) {
        const res = await fetch(`/api/events/${eventId}/todo/${id}`, {
            method: 'DELETE',
        })

        if (res.ok) {
            setTodos(prev => prev.filter(todo => todo.id !== id))
        }
        if (onUpdate) await onUpdate()
    }

    return (
        <div className="space-y-4">
            <h2 className="text-xl font-semibold">To Do List</h2>

            <div className="flex gap-2">
                <input
                    className="input input-bordered w-full"
                    placeholder="New To Do..."
                    value={newName}
                    onChange={e => setNewName(e.target.value)}
                />
                <input
                    type="date"
                    className="input input-bordered"
                    value={newDueDate}
                    onChange={e => setNewDueDate(e.target.value)}
                />
                <button className="btn btn-primary" onClick={handleAdd}>Add</button>
            </div>

            <ul className="space-y-2">
                {todos.map(todo => (
                    <li
                        key={todo.id}
                        className="flex items-center justify-between p-3 bg-[#00000010] rounded-lg"
                    >
                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={todo.complete}
                                onChange={e => toggleComplete(todo.id, e.target.checked)}
                            />
                            <span className={todo.complete ? 'line-through text-gray-400' : ''}>
                                {todo.name}
                            </span>
                            {todo.dueDate && (
                                <span className="text-sm text-gray-500 ml-2">
                                (Due {new Date(todo.dueDate).toLocaleDateString()})
                                </span>
                            )}
                        </div>
                        <button className="text-red-500 text-sm" onClick={() => handleDelete(todo.id)}>
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}
