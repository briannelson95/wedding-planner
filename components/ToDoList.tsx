'use client'
import React, { useState } from 'react'
import { Card, CardContent } from './ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import EventTaskCalendar from './events/EventTaskCalendar'

interface Todo {
  id: string
  name: string
  complete: boolean
  dueDate?: string | null
  notes?: string | null
  eventId: string
  createdAt: string
  updatedAt: string
}

interface Props {
    eventId: string
    initialTodos: Todo[]
    onUpdate: () => void
}

export default function  ToDoList({ eventId, initialTodos, onUpdate }: Props) {
    const [todos, setTodos] = useState(initialTodos)
    const [newName, setNewName] = useState('')
    const [newDueDate, setNewDueDate] = useState('')
    const [editingNoteId, setEditingNoteId] = useState<string | null>(null)
    const [noteDraft, setNoteDraft] = useState('')

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

    async function saveNote(id: string) {
        const res = await fetch(`/api/events/${eventId}/todo/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ notes: noteDraft }),
        })

        if (res.ok) {
            setTodos(prev =>
                prev.map(todo =>
                todo.id === id ? { ...todo, notes: noteDraft } : todo
                )
            )
            setEditingNoteId(null)
            setNoteDraft('')
        }
        if (onUpdate) await onUpdate()
    }

    return (
        <Card className='py-0'>
            <CardContent className="p-4">
                <h2 className="text-xl font-semibold">To-Do List</h2>
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
                    <button className="btn btn-primary" onClick={handleAdd}>
                        Add
                    </button>
                </div>
                <Tabs defaultValue="list" className="w-full mt-2">
                    <TabsList className="mb-4">
                        <TabsTrigger value="list">List View</TabsTrigger>
                        <TabsTrigger value="calendar">Calendar View</TabsTrigger>
                    </TabsList>
                    <TabsContent value="list">
                        <div className="space-y-2">
                            {todos.map(todo => (
                                <div
                                    key={todo.id}
                                    className="border p-2 rounded-md"
                                >
                                    <div className="flex items-center justify-between">
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
                                        <button
                                            className="text-red-500 text-sm"
                                            onClick={() => handleDelete(todo.id)}
                                        >
                                            Delete
                                        </button>
                                    </div>

                                    {/* Notes Section */}
                                    <div className="mt-1 text-sm text-gray-700">
                                        {editingNoteId === todo.id ? (
                                            <div className="space-y-1">
                                                <textarea
                                                    className="textarea textarea-bordered w-full"
                                                    value={noteDraft}
                                                    onChange={e => setNoteDraft(e.target.value)}
                                                    rows={2}
                                                />
                                                <div className="flex gap-2">
                                                    <button
                                                        className="btn btn-sm btn-primary"
                                                        onClick={() => saveNote(todo.id)}
                                                    >
                                                        Save
                                                    </button>
                                                    <button
                                                        className="btn btn-sm"
                                                        onClick={() => {
                                                            setEditingNoteId(null)
                                                            setNoteDraft('')
                                                        }}
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>
                                            </div>
                                        ) : (
                                            <div
                                                className="cursor-pointer text-gray-600"
                                                onClick={() => {
                                                    setEditingNoteId(todo.id)
                                                    setNoteDraft(todo.notes || '')
                                                }}
                                            >
                                                {todo.notes ? (
                                                    <span>{todo.notes}</span>
                                                ) : (
                                                    <span className="italic text-gray-400">Add note...</span>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </TabsContent>
                    <TabsContent value='calendar'>
                        <div className=''>
                            <EventTaskCalendar
                                todos={todos}
                            />
                        </div>
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    )
}
