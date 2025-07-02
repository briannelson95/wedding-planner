'use client'
import React, { useState } from 'react'

export default function BulkUploadGuest() {
    const [file, setFile] = useState<File | null>(null);
    const [status, setStatus] = useState('');
    const [loading, setLoading] = useState(false)

    async function handleUpload(e: React.FormEvent) {
        e.preventDefault()
        if (!file) return

        const formData = new FormData()
        formData.append('file', file)

        setStatus('Uploading...')
        const res = await fetch('/api/guestbook/bulk-upload', {
            method: 'POST',
            body: formData,
        })

        const result = await res.json()
        if (res.ok) {
            setStatus(`Uploaded ${result.count} guests successfull`)
        } else {
            setStatus(`Upload failed: ${result.message}`)
        }
    }

    return (
        <div className="flex flex-col md:flex-row items-start md:items-center gap-2">
            <label className="btn btn-outline btn-sm">
                Select CSV
                <input
                    type="file"
                    accept=".csv"
                    hidden
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                />
            </label>

            {file && (
                <div className="text-sm truncate max-w-xs">
                    📄 {file.name}
                </div>
            )}

            {file && (
                <button
                    className="btn btn-primary btn-sm"
                    onClick={handleUpload}
                    disabled={loading}
                >
                    {loading ? 'Uploading...' : 'Upload'}
                </button>
            )}

            {status && (
                <p className="text-sm text-gray-600">{status}</p>
            )}
        </div>
    )
}
