'use client'
import { useSession } from 'next-auth/react'
import React, { useEffect, useRef, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import InfoIcon from './icons/InfoIcon'

interface Props {
    eventId: string
    initialNotes: string
    canEdit: boolean
}

export default function EventNotesEditor({ eventId, initialNotes, canEdit }: Props) {
    const [notes, setNotes] = useState(initialNotes || '');
    const [isEditing, setIsEditing] = useState(false)
    const [saving, setSaving] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null)
    const { data: session } = useSession()

    const isAuthorized =
        session?.user?.role === 'COUPLE' || session?.user?.role === 'PLANNER'

    useEffect(() => {
        if (isEditing && textareaRef.current) {
        textareaRef.current.focus()
        }
    }, [isEditing])

    async function saveNotes() {
        setSaving(true)
        try {
            const res = await fetch(`/api/events/${eventId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ notes }),
            })

            if (!res.ok) throw new Error('Failed to save notes')
            setIsEditing(false)
        } catch (err) {
            console.error(err)
        } finally {
            setSaving(false)
        }
    }

    if (!canEdit) {
        return (
            <div className="p-4 rounded shadow w-full order-last">
                <h3 className="font-semibold text-lg mb-2">Event Notes</h3>
                <div className='prose prose-sm dark:prose-invertse'>
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{notes || '_No notes yet._'}</ReactMarkdown>
                </div>
            </div>
        )
    }

    function handleBlur() {
        if (notes.trim() !== initialNotes?.trim()) {
            saveNotes()
        } else {
            setIsEditing(false)
        }
  }

    return (
        <div>
            <div
                className="prose prose-brand rounded-lg textarea-bordered p-4 w-full min-h-[120px] cursor-text"
                onClick={() => {
                    if (isAuthorized) setIsEditing(true)
                }}
            >
                {isEditing ? (
                    <textarea
                        ref={textareaRef}
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        onBlur={handleBlur}
                        rows={6}
                        className="textarea textarea-bordered w-full resize-none"
                    />
                ) : notes.trim() ? (
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{notes}</ReactMarkdown>
                ) : (
                    <p className="text-gray-500 italic textarea-bordered rounded-lg min-h-32 p-4">Click to add notes...</p>
                )}

                {saving && <p className="text-xs text-gray-400">Saving...</p>}
            </div>
            <div className='text-xs font-normal'>
                <a href={'https://www.markdownguide.org/cheat-sheet/'} target='_blank' className='flex items-center underline'>
                    Supports Markdown
                    <InfoIcon />
                </a>
            </div>
        </div>
    )
}
