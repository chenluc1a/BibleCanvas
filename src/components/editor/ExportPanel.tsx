'use client'

import { useEditorStore } from '@/store/editor'
import { OUTPUT_SIZES } from '@/lib/constants'
import type { OutputSize } from '@/types'

const SIZE_OPTIONS: { key: OutputSize; emoji: string }[] = [
  { key: 'story', emoji: '📱' },
  { key: 'feed', emoji: '📸' },
  { key: 'pc', emoji: '🖥️' },
  { key: 'mobile', emoji: '📲' },
  { key: 'kakao', emoji: '💬' },
  { key: 'youtube', emoji: '▶️' },
]

export default function ExportPanel() {
  const { outputSize, setOutputSize, isExporting } = useEditorStore()

  const handleDownload = async () => {
    // Will be wired to useExport hook
    alert('다운로드 기능은 Sprint 3에서 구현됩니다.')
  }

  return (
    <div className="space-y-5 animate-fade-in">
      <div className="flex items-center gap-2 text-sm font-medium text-canvas-text">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
        내보내기
      </div>

      {/* Size selection */}
      <div className="space-y-2">
        <label className="text-[11px] text-canvas-muted uppercase tracking-wider">
          출력 사이즈
        </label>
        <div className="grid grid-cols-2 gap-2">
          {SIZE_OPTIONS.map(({ key, emoji }) => {
            const spec = OUTPUT_SIZES[key]
            return (
              <button
                key={key}
                onClick={() => setOutputSize(key)}
                className={`p-3 rounded-xl border text-left transition-all duration-200 ${
                  outputSize === key
                    ? 'bg-canvas-accent/10 border-canvas-accent/40'
                    : 'border-canvas-border hover:border-canvas-accent/20 bg-canvas-surface/30'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm">{emoji}</span>
                  <span className={`text-xs font-medium ${
                    outputSize === key ? 'text-canvas-accent-light' : 'text-canvas-text'
                  }`}>
                    {spec.label}
                  </span>
                </div>
                <p className="text-[10px] text-canvas-muted">
                  {spec.width}×{spec.height} • {spec.ratio}
                </p>
              </button>
            )
          })}
        </div>
      </div>

      {/* Download button */}
      <button
        onClick={handleDownload}
        disabled={isExporting}
        className={`w-full py-3 px-4 rounded-xl font-medium text-sm flex items-center justify-center gap-2 transition-all duration-200 ${
          isExporting
            ? 'bg-canvas-border text-canvas-muted cursor-not-allowed'
            : 'bg-gradient-to-r from-canvas-accent to-canvas-accent-light text-white hover:shadow-lg hover:shadow-canvas-accent/30 hover:-translate-y-0.5 active:translate-y-0'
        }`}
      >
        {isExporting ? (
          <>
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            내보내는 중...
          </>
        ) : (
          <>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            PNG 다운로드
          </>
        )}
      </button>

      {/* Platform hints */}
      <div className="glass-subtle rounded-xl p-3">
        <p className="text-[11px] text-canvas-muted leading-relaxed">
          💡 <strong className="text-canvas-text/80">팁</strong>: 인스타그램 스토리에는{' '}
          <span className="text-canvas-accent-light">스토리 (9:16)</span>, 카카오톡 프로필에는{' '}
          <span className="text-canvas-accent-light">카카오 프로필 (1:1)</span> 사이즈를 추천합니다.
        </p>
      </div>
    </div>
  )
}
