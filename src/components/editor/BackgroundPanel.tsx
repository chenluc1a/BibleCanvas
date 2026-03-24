'use client'

import { useState } from 'react'
import { useEditorStore } from '@/store/editor'
import { PRESET_THEMES } from '@/lib/constants'

export default function BackgroundPanel() {
  const { backgroundType, backgroundUrl, setBackgroundPreset, setBackgroundUpload } = useEditorStore()
  const [tab, setTab] = useState<'preset' | 'upload'>('preset')
  const [isDragOver, setIsDragOver] = useState(false)

  const handleFileUpload = (file: File) => {
    if (!file.type.startsWith('image/') && file.type !== 'image/heic') return
    if (file.size > 10 * 1024 * 1024) {
      alert('이미지 크기는 10MB 이하여야 합니다.')
      return
    }
    const url = URL.createObjectURL(file)
    setBackgroundUpload(url)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    const file = e.dataTransfer.files?.[0]
    if (file) handleFileUpload(file)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex items-center gap-2 text-sm font-medium text-canvas-text">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <circle cx="9" cy="9" r="2" />
          <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
        </svg>
        배경 선택
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 rounded-lg bg-canvas-surface/80">
        {[
          { key: 'preset', label: '프리셋', icon: '🎨' },
          { key: 'upload', label: '사진 업로드', icon: '📷' },
        ].map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key as typeof tab)}
            className={`flex-1 py-2 px-2 text-xs rounded-md transition-all duration-200 ${
              tab === t.key
                ? 'bg-canvas-accent/20 text-canvas-accent-light shadow-sm'
                : 'text-canvas-muted hover:text-canvas-text'
            }`}
          >
            <span className="mr-1">{t.icon}</span>
            {t.label}
          </button>
        ))}
      </div>

      {/* Preset grid */}
      {tab === 'preset' && (
        <div className="grid grid-cols-2 gap-2 panel-enter">
          {PRESET_THEMES.map((theme) => (
            <button
              key={theme.id}
              onClick={() => setBackgroundPreset(theme.id)}
              className={`preset-card group relative aspect-[4/3] rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                backgroundType === 'preset' && backgroundUrl === theme.backgroundUrl
                  ? 'border-canvas-accent shadow-lg shadow-canvas-accent/20'
                  : 'border-transparent hover:border-canvas-accent/30'
              }`}
            >
              <img
                src={theme.thumbnail}
                alt={theme.label}
                className="absolute inset-0 w-full h-full object-cover"
              />
              {/* Label */}
              <div className="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-black/70 to-transparent">
                <span className="text-[11px] font-medium text-white/90">
                  {theme.label}
                </span>
              </div>
              {/* Check mark */}
              {backgroundType === 'preset' && backgroundUrl === theme.backgroundUrl && (
                <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-canvas-accent flex items-center justify-center">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
              )}
            </button>
          ))}
        </div>
      )}

      {/* Upload area */}
      {tab === 'upload' && (
        <div className="panel-enter">
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={() => setIsDragOver(false)}
            className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 cursor-pointer ${
              isDragOver
                ? 'border-canvas-accent bg-canvas-accent/10'
                : 'border-canvas-border hover:border-canvas-accent/30 hover:bg-canvas-surface/50'
            }`}
            onClick={() => {
              const input = document.createElement('input')
              input.type = 'file'
              input.accept = 'image/jpeg,image/png,image/heic'
              input.onchange = (e) => {
                const file = (e.target as HTMLInputElement).files?.[0]
                if (file) handleFileUpload(file)
              }
              input.click()
            }}
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className={`mx-auto mb-3 transition-colors ${isDragOver ? 'text-canvas-accent' : 'text-canvas-muted'}`}
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
            <p className="text-sm text-canvas-muted mb-1">
              {isDragOver ? '여기에 놓으세요!' : '클릭하거나 드래그하여 업로드'}
            </p>
            <p className="text-[10px] text-canvas-muted/60">
              JPEG, PNG, HEIC • 최대 10MB
            </p>
          </div>

          {/* Upload preview */}
          {backgroundType === 'upload' && backgroundUrl && (
            <div className="mt-3 relative rounded-xl overflow-hidden aspect-video">
              <img
                src={backgroundUrl}
                alt="업로드된 배경"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2 bg-black/50 backdrop-blur-sm rounded-full p-1">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}


