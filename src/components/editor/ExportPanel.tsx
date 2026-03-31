'use client'

import { useState } from 'react'
import { useEditorStore } from '@/store/editor'
import { OUTPUT_SIZES } from '@/lib/constants'
import type { OutputSize } from '@/types'

const SIZE_OPTIONS: { key: OutputSize; emoji: string }[] = [
  { key: 'story',   emoji: '📱' },
  { key: 'feed',    emoji: '📸' },
  { key: 'pc',      emoji: '🖥️' },
  { key: 'mobile',  emoji: '📲' },
  { key: 'kakao',   emoji: '💬' },
  { key: 'youtube', emoji: '▶️' },
]

/** 실제 비율을 시각적으로 표현 — maxDim 기준으로 스케일 */
function RatioBox({ width, height, active }: { width: number; height: number; active: boolean }) {
  const maxDim = 44
  const ratio = width / height
  const boxW = ratio >= 1 ? maxDim : Math.round(maxDim * ratio)
  const boxH = ratio >= 1 ? Math.round(maxDim / ratio) : maxDim
  return (
    <div
      className={`rounded border flex-shrink-0 transition-all duration-200 ${
        active
          ? 'border-canvas-accent bg-canvas-accent/20'
          : 'border-canvas-border/60 bg-canvas-border/15'
      }`}
      style={{ width: boxW, height: boxH }}
    />
  )
}

export default function ExportPanel() {
  const { outputSize, setOutputSize, isExporting, setExporting, verse } = useEditorStore()
  const [copied, setCopied] = useState(false)

  // ─── 다운로드 ─────────────────────────────────────────────────────────────
  const handleDownload = async () => {
    const original = document.getElementById('canvas-preview')
    if (!original) {
      alert('캔버스를 찾을 수 없습니다.')
      return
    }

    setExporting(true)
    let clone: HTMLElement | null = null
    try {
      const { default: html2canvas } = await import('html2canvas')
      const spec = OUTPUT_SIZES[outputSize]

      // html2canvas는 CSS 변수 그라데이션(var(--glow-color))을 파싱할 때 NaN → addColorStop 오류.
      // onclone은 파싱 이후 실행되므로 해결 불가 → 직접 클론 후 문제 CSS 제거.
      const previewW = original.offsetWidth || 400
      const previewH = original.offsetHeight || 400

      clone = original.cloneNode(true) as HTMLElement
      clone.id = 'canvas-preview-export'
      clone.style.cssText = [
        'position:fixed', 'top:0', 'left:-99999px',
        `width:${previewW}px`,
        `height:${previewH}px`,
        'z-index:-1',
        'opacity:0',           // visibility:hidden 대신 opacity:0 — 이미지 렌더링 차단 방지
        'pointer-events:none',
      ].join(';')
      clone.classList.remove('canvas-glow')
      clone.querySelectorAll<HTMLElement>('[class*="backdrop-blur"]').forEach((el) => {
        el.style.backdropFilter = 'none'
        ;(el.style as CSSStyleDeclaration & { webkitBackdropFilter?: string }).webkitBackdropFilter = 'none'
      })
      document.body.appendChild(clone)

      // 브라우저 레이아웃 재계산 강제 (reflow)
      void clone.offsetWidth

      // 클론 내 이미지가 모두 로드될 때까지 대기 — 이미지 미로드 시 빈 배경 방지
      const cloneImages = Array.from(clone.querySelectorAll<HTMLImageElement>('img'))
      await Promise.all(
        cloneImages.map(img => {
          if (img.complete && img.naturalWidth > 0) return Promise.resolve()
          return new Promise<void>(resolve => {
            img.onload = () => resolve()
            img.onerror = () => resolve()
          })
        })
      )

      const scale = previewW > 0 ? Math.min(spec.width / previewW, 8) : 2

      const canvas = await html2canvas(clone, {
        width: previewW,
        height: previewH,
        scale,
        useCORS: true,
        allowTaint: false,
        backgroundColor: '#000000', // null → 배경 로드 실패 시 투명 방지
        logging: false,
      })

      const verseRef = verse
        ? `${verse.book}${verse.chapter}_${verse.verse}`
        : 'custom'
      const filename = `bible-canvas_${verseRef}_${outputSize}_${spec.width}x${spec.height}.png`

      // ── iOS Safari ──────────────────────────────────────────────────────
      // blob URL에 download 속성이 동작하지 않으므로 새 탭에서 이미지 표시
      const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent)
      if (isIOS) {
        const dataUrl = canvas.toDataURL('image/png', 1.0)
        const win = window.open('', '_blank')
        if (win) {
          win.document.write(
            '<html><head>' +
            '<meta name="viewport" content="width=device-width,initial-scale=1">' +
            '<style>body{margin:0;background:#111;display:flex;flex-direction:column;' +
            'align-items:center;padding:20px;min-height:100vh;box-sizing:border-box}' +
            'img{max-width:100%;border-radius:8px;box-shadow:0 4px 24px rgba(0,0,0,0.6)}' +
            'p{color:#fff;font-family:sans-serif;font-size:15px;margin-top:16px;' +
            'text-align:center;line-height:1.6}</style></head><body>' +
            `<img src="${dataUrl}">` +
            '<p>이미지를 <strong>꾹 눌러서</strong> 저장하세요 📱</p>' +
            '</body></html>'
          )
          win.document.close()
        }
        return
      }

      // ── 데스크톱 & Android Chrome ─────────────────────────────────────
      // blob URL + <a download> 방식 — 직접 로컬 저장
      const blob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob(
          (b) => (b ? resolve(b) : reject(new Error('Blob 생성 실패'))),
          'image/png', 1.0
        )
      })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = filename
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } catch (err) {
      console.error('[ExportPanel] PNG 내보내기 실패:', err)
      alert('다운로드 중 오류가 발생했습니다. 다시 시도해주세요.')
    } finally {
      clone?.remove()
      setExporting(false)
    }
  }

  // ─── 링크 공유 ────────────────────────────────────────────────────────────
  const handleShare = async () => {
    const url = window.location.href
    if (navigator.share) {
      try {
        await navigator.share({ title: 'Bible Canvas', url })
        return
      } catch {
        // 취소 또는 미지원 → 클립보드
      }
    }
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      alert('링크 복사에 실패했습니다.')
    }
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

      {/* ── 출력 사이즈 선택 ── */}
      <div className="space-y-2">
        <label className="text-[11px] text-canvas-muted uppercase tracking-wider">
          출력 사이즈
        </label>
        <div className="space-y-1.5">
          {SIZE_OPTIONS.map(({ key, emoji }) => {
            const spec = OUTPUT_SIZES[key]
            const active = outputSize === key
            return (
              <button
                key={key}
                onClick={() => setOutputSize(key)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl border text-left transition-all duration-200 ${
                  active
                    ? 'bg-canvas-accent/10 border-canvas-accent/40'
                    : 'border-canvas-border hover:border-canvas-accent/20 bg-canvas-surface/30'
                }`}
              >
                {/* 비율 시각화 박스 — 44px 기준 실제 비율 */}
                <div className="w-12 flex items-center justify-center flex-shrink-0">
                  <RatioBox width={spec.width} height={spec.height} active={active} />
                </div>

                {/* 레이블 */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs">{emoji}</span>
                    <span className={`text-xs font-semibold ${active ? 'text-canvas-accent-light' : 'text-canvas-text'}`}>
                      {spec.label}
                    </span>
                    <span className="text-[10px] text-canvas-muted/60 ml-auto flex-shrink-0">
                      {spec.ratio}
                    </span>
                  </div>
                  <p className="text-[10px] text-canvas-muted mt-0.5">
                    {spec.width} × {spec.height} • {spec.platform}
                  </p>
                </div>

                {active && (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-canvas-accent flex-shrink-0">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* ── 저장 버튼 ── */}
      <button
        onClick={handleDownload}
        disabled={isExporting}
        className={`w-full py-3 px-4 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-200 ${
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
            저장 중...
          </>
        ) : (
          <>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            이미지 저장 ({OUTPUT_SIZES[outputSize].width}×{OUTPUT_SIZES[outputSize].height})
          </>
        )}
      </button>

      {/* iOS 안내 */}
      {/iPhone|iPad|iPod/i.test(typeof navigator !== 'undefined' ? navigator.userAgent : '') && (
        <p className="text-[11px] text-canvas-muted text-center -mt-3">
          📱 새 탭에서 이미지를 꾹 눌러 저장하세요
        </p>
      )}

      {/* ── 링크 공유 (별도) ── */}
      <div className="flex gap-2">
        <button
          onClick={handleShare}
          className="flex-1 py-2.5 px-3 rounded-xl border border-canvas-border text-xs text-canvas-muted hover:border-canvas-accent/30 hover:text-canvas-text flex items-center justify-center gap-1.5 transition-all duration-200"
        >
          {copied ? (
            <>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-green-400">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span className="text-green-400">링크 복사됨</span>
            </>
          ) : (
            <>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
              </svg>
              링크 공유
            </>
          )}
        </button>
      </div>

      {/* ── 플랫폼 팁 ── */}
      <div className="glass-subtle rounded-xl p-3">
        <p className="text-[11px] text-canvas-muted leading-relaxed">
          💡 인스타그램 스토리 →{' '}
          <span className="text-canvas-accent-light">스토리 9:16</span>
          {' '}/ 카카오 프로필 →{' '}
          <span className="text-canvas-accent-light">카카오 1:1</span>
          {' '}/ PC 배경화면 →{' '}
          <span className="text-canvas-accent-light">PC 1920×1080</span>
        </p>
      </div>
    </div>
  )
}
