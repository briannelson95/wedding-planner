'use client'

import React, { useState, DragEvent } from 'react'

export default function UploadTestPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [message, setMessage] = useState('')

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setSelectedFile(file)
    setMessage('')
  }

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const file = e.dataTransfer.files?.[0]
    if (file) {
      setSelectedFile(file)
      setMessage('')
    }
  }

  const handleUpload = async () => {
    if (!selectedFile) return

    const formData = new FormData()
    formData.append('file', selectedFile)

    setUploading(true)
    setMessage('')

    try {
      const res = await fetch('/api/files/upload', {
        method: 'POST',
        body: formData,
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Upload failed')

      setMessage(`✅ File uploaded: ${data.filename || selectedFile.name}`)
      setSelectedFile(null)
    } catch (err: any) {
      setMessage(`❌ Upload failed: ${err.message}`)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow space-y-4">
      <h2 className="text-xl font-semibold">File Upload Test</h2>

      {/* Drag and drop area */}
      <div
        onDrop={handleDrop}
        onDragOver={e => e.preventDefault()}
        className="border-2 border-dashed border-gray-400 rounded p-6 text-center cursor-pointer bg-gray-50 hover:bg-gray-100"
      >
        {selectedFile ? (
          <p>{selectedFile.name}</p>
        ) : (
          <p>Drag & drop a file here or click below to select</p>
        )}
      </div>

      {/* File input */}
      <input type="file" onChange={handleFileChange} className="block" />

      {/* Upload button */}
      <button
        onClick={handleUpload}
        className="btn btn-primary"
        disabled={!selectedFile || uploading}
      >
        {uploading ? 'Uploading...' : 'Upload'}
      </button>

      {/* Upload result */}
      {message && <p className="text-sm">{message}</p>}
    </div>
  )
}
