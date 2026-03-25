'use client'

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

/** 출력 비율을 시각적으로 표현하는 미니 미리보기 박스 */
function AspectBox({ width, height }: { width: number; height: number }) {
  const ratio = width / height
  // 최대 너비 32px 기준으로 높이 계산 (비율 유지)
  const boxW = ratio >= 1 ? 32 : Math.round(32 * ratio)
  const boxH = ratio >= 1 ? Math.round(32 / ratio) : 32
  return (
    <div
      className="rounded border border-canvas-border/60 bg-canvas-border/20 flex-shrink-0"
      style={{ width: boxW, height: boxH }}
    />
  )
}

export default function ExportPanel() {
  const { outputSize, setOutputSize, isExporting, setExporting, verse } = useEditorStore()

  const handleDownload = async () => {
    const element = document.getElementById('canvas-preview')
    if (!element) {
      alert('캔버스를 찾을 수 없습니다.')
      return
    }

    setExporting(true)
    try {
      const { default: html2canvas } = await import('html2canvas')
      const spec = OUTPUT_SIZES[outputSize]

      const previewW = element.offsetWidth || 400
      const previewH = element.offsetHeight || 400
      // scale이 Infinity / NaN이 되지 않도록 방어
      const scale = previewW > 0 ? Math.min(spec.width / previewW, 8) : 2

      const canvas = await html2canvas(element, {
        width: previewW,
        height: previewH,
        scale,
        useCORS: true,
        allowTaint: false,
        backgroundColor: null,
        logging: false,
        // html2canvas는 backdrop-filter와 CSS 변수 그라데이션 미지원
        onclone: (clonedDoc) => {
          // ① CSS 변수를 유효한 값으로 오버라이드 (var() 미해석 → NaN → addColorStop 오류 방지)
          // ② backdrop-filter 전체 비활성화
          // ③ CSS 변수 그라데이션을 쓰는 ::after 숨김
          const fix = clonedDoc.createElement('style')
          fix.textContent = `
            :root {
              --glow-color: rgba(0,0,0,0) !important;
              --glow-hover: rgba(0,0,0,0) !important;
              --canvas-accent: #7C6AEF !important;
              --canvas-accent-light: #9B8CFB !important;
            }
            * {
              backdrop-filter: none !important;
              -webkit-backdrop-filter: none !important;
            }
            .canvas-glow::after { display: none !important; }
            .bg-noise::before  { display: none !important; }
          `
          clonedDoc.head.appendChild(fix)

          // 인라인 backdrop-filter도 제거 (inline style 우선순위 대응)
          clonedDoc.querySelectorAll<HTMLElement>('[class*="backdrop-blur"]').forEach((el) => {
            el.style.backdropFilter = 'none'
            ;(el.style as CSSStyleDeclaration & { webkitBackdropFilter?: string }).webkitBackdropFilter = 'none'
          })
        },
      })

      const blob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob(
          (b) => (b ? resolve(b) : reject(new Error('Blob 생성 실패'))),
          'image/png',
          1.0
        )
      })

      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      const verseRef = verse
        ? `${verse.book}${verse.chapter}_${verse.verse}`
        : 'custom'
      a.href = url
      a.download = `bible-canvas_${verseRef}_${outputSize}_${spec.width}x${spec.height}.png`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } catch (err) {
      console.error('[ExportPanel] PNG 내보내기 실패:', err)
      alert('다운로드 중 오류가 발생했습니다. 다시 시도해주세요.')
    } finally {
      setExporting(false)
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
                className={`p-2.5 rounded-xl border text-left transition-all duration-200 ${
                  outputSize === key
                    ? 'bg-canvas-accent/10 border-canvas-accent/40'
                    : 'border-canvas-border hover:border-canvas-accent/20 bg-canvas-surface/30'
                }`}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  {/* 시각적 비율 박스 */}
                  <AspectBox width={spec.width} height={spec.height} />
                  <div>
                    <div className="flex items-center gap-1">
                      <span className="text-xs">{emoji}</span>
                      <span className={`text-xs font-medium ${
                        outputSize === key ? 'text-canvas-accent-light' : 'text-canvas-text'
                      }`}>
                        {spec.label}
                      </span>
                    </div>
                    <p className="text-[10px] text-canvas-muted mt-0.5">
                      {spec.width}×{spec.height}
                    </p>
                  </div>
                </div>
                <p className="text-[9px] text-canvas-muted/70">
                  {spec.ratio} • {spec.platform}
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
            PNG 다운로드 ({OUTPUT_SIZES[outputSize].width}×{OUTPUT_SIZES[outputSize].height})
          </>
        )}
      </button>

      {/* Platform hints */}
      <div className="glass-subtle rounded-xl p-3">
        <p className="text-[11px] text-canvas-muted leading-relaxed">
          💡 <strong className="text-canvas-text/80">팁</strong>: 인스타그램 스토리에는{' '}
          <span className="text-canvas-accent-light">스토리 (9:16)</span>, 카카오톡 프로필에는{' '}
          <span className="text-canvas-accent-light">카카오 프로필 (1:1)</span>, PC 바탕화면에는{' '}
          <span className="text-canvas-accent-light">PC (1920×1080)</span> 사이즈를 추천합니다.
        </p>
      </div>
    </div>
  )
}
