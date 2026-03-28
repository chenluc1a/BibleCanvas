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
      // onclone은 파싱 이후에 실행되므로 해결 불가.
      // 해결책: html2canvas에 넘기기 전에 직접 클론 후 문제 CSS 제거.
      clone = original.cloneNode(true) as HTMLElement
      clone.id = 'canvas-preview-export'
      clone.style.cssText = [
        'position:fixed',
        'top:0',
        `left:-99999px`,
        `width:${original.offsetWidth}px`,
        `height:${original.offsetHeight}px`,
        'z-index:-1',
        'visibility:hidden',
      ].join(';')
      clone.classList.remove('canvas-glow')
      clone.querySelectorAll<HTMLElement>('[class*="backdrop-blur"]').forEach((el) => {
        el.style.backdropFilter = 'none'
        ;(el.style as CSSStyleDeclaration & { webkitBackdropFilter?: string }).webkitBackdropFilter = 'none'
      })
      document.body.appendChild(clone)

      const previewW = original.offsetWidth || 400
      const previewH = original.offsetHeight || 400
      const scale = previewW > 0 ? Math.min(spec.width / previewW, 8) : 2

      const canvas = await html2canvas(clone, {
        width: previewW,
        height: previewH,
        scale,
        useCORS: true,
        allowTaint: false,
        backgroundColor: null,
        logging: false,
      })

      const verseRef = verse
        ? `${verse.book}${verse.chapter}_${verse.verse}`
        : 'custom'
      const filename = `bible-canvas_${verseRef}_${outputSize}_${spec.width}x${spec.height}.png`

      // iOS Safari: blob URL의 download 속성이 동작하지 않음 → 새 탭에서 열기
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

      const blob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob(
          (b) => (b ? resolve(b) : reject(new Error('Blob 생성 실패'))),
          'image/png',
          1.0
        )
      })

      // Web Share API — Android Chrome / 최신 모바일 브라우저
      try {
        const file = new File([blob], filename, { type: 'image/png' })
        if (
          typeof navigator.share === 'function' &&
          typeof navigator.canShare === 'function' &&
          navigator.canShare({ files: [file] })
        ) {
          await navigator.share({ files: [file], title: 'Bible Canvas' })
          return
        }
      } catch {
        // 공유 취소 또는 미지원 → 일반 다운로드로 폴백
      }

      // 데스크톱 / Android 폴백
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
