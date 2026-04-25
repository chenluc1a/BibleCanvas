'use client'
// html2canvas 대신 Canvas 2D API로 직접 렌더링
// — 모바일 포함 모든 환경에서 안정적으로 동작

import type { StyleState, CalendarState, BackgroundFit, OutputSizeSpec, TextPosition } from '@/types'

export interface ExportParams {
  backgroundUrl: string
  backgroundFit: BackgroundFit
  displayText: string
  referenceText: string
  style: StyleState
  calendar: CalendarState
  spec: OutputSizeSpec
}

export async function renderToCanvas(params: ExportParams): Promise<HTMLCanvasElement> {
  const { spec } = params
  const canvas = document.createElement('canvas')
  canvas.width = spec.width
  canvas.height = spec.height
  const ctx = canvas.getContext('2d')!

  await drawBackground(ctx, params.backgroundUrl, params.backgroundFit, spec.width, spec.height)

  // CanvasPreview의 bg-black/20 오버레이 동일하게 적용
  ctx.fillStyle = 'rgba(0,0,0,0.2)'
  ctx.fillRect(0, 0, spec.width, spec.height)

  if (params.displayText) {
    await drawVerse(ctx, params.displayText, params.referenceText, params.style, spec.width, spec.height)
  }

  if (params.calendar.show) {
    drawCalendar(ctx, params.calendar, spec.width, spec.height)
  }

  return canvas
}

// ── Background ──────────────────────────────────────────────────────────────

async function drawBackground(
  ctx: CanvasRenderingContext2D,
  url: string,
  fit: BackgroundFit,
  w: number,
  h: number,
) {
  if (url.startsWith('gradient:')) {
    drawLinearGradient(ctx, url.slice('gradient:'.length), w, h)
    return
  }

  if (url) {
    try {
      const img = await loadImage(url)
      applyObjectFit(ctx, img, fit, w, h)
      return
    } catch {
      // 이미지 로드 실패 시 기본 배경으로 폴백
    }
  }

  // 기본 다크 그라데이션
  const grad = ctx.createLinearGradient(0, 0, w, h)
  grad.addColorStop(0, '#111827')
  grad.addColorStop(0.5, '#1f2937')
  grad.addColorStop(1, '#111827')
  ctx.fillStyle = grad
  ctx.fillRect(0, 0, w, h)
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => resolve(img)
    img.onerror = () => {
      // CORS 실패 시 crossOrigin 없이 재시도 (로컬 에셋, blob URL)
      const img2 = new Image()
      img2.onload = () => resolve(img2)
      img2.onerror = () => reject(new Error(`이미지 로드 실패: ${src}`))
      img2.src = src
    }
    img.src = src
  })
}

function applyObjectFit(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  fit: BackgroundFit,
  w: number,
  h: number,
) {
  const iw = img.naturalWidth
  const ih = img.naturalHeight
  const ir = iw / ih
  const cr = w / h

  ctx.save()
  ctx.beginPath()
  ctx.rect(0, 0, w, h)
  ctx.clip()

  switch (fit) {
    case 'cover': {
      const dw = ir > cr ? h * ir : w
      const dh = ir > cr ? h : w / ir
      ctx.drawImage(img, (w - dw) / 2, (h - dh) / 2, dw, dh)
      break
    }
    case 'contain': {
      const dw = ir > cr ? w : h * ir
      const dh = ir > cr ? w / ir : h
      ctx.fillStyle = '#000'
      ctx.fillRect(0, 0, w, h)
      ctx.drawImage(img, (w - dw) / 2, (h - dh) / 2, dw, dh)
      break
    }
    case 'fit-width': {
      const dh = (w / iw) * ih
      ctx.drawImage(img, 0, (h - dh) / 2, w, dh)
      break
    }
    case 'fit-height': {
      const dw = (h / ih) * iw
      ctx.drawImage(img, (w - dw) / 2, 0, dw, h)
      break
    }
    default: // fill
      ctx.drawImage(img, 0, 0, w, h)
  }

  ctx.restore()
}

function drawLinearGradient(ctx: CanvasRenderingContext2D, css: string, w: number, h: number) {
  // linear-gradient(Xdeg, #color P%, ...) 파싱
  const m = css.match(/linear-gradient\(([^)]+)\)/)
  if (!m) {
    ctx.fillStyle = '#1a1a2e'
    ctx.fillRect(0, 0, w, h)
    return
  }

  const parts = m[1].split(',').map(s => s.trim())
  let angleRad = Math.PI / 2 // 기본: 180deg (위→아래)
  let stopStart = 0

  const first = parts[0]
  if (/^-?\d/.test(first) && first.includes('deg')) {
    // CSS 각도 → Canvas 각도 변환 (CSS 0deg = 위쪽 = Canvas -90deg)
    angleRad = (parseFloat(first) - 90) * (Math.PI / 180)
    stopStart = 1
  } else if (first.startsWith('to ')) {
    const map: Record<string, number> = { right: 0, bottom: Math.PI / 2, left: Math.PI, top: -Math.PI / 2 }
    angleRad = map[first.slice(3)] ?? Math.PI / 2
    stopStart = 1
  }

  const diag = Math.sqrt(w * w + h * h)
  const cx = w / 2, cy = h / 2
  const x0 = cx - Math.cos(angleRad) * diag / 2
  const y0 = cy - Math.sin(angleRad) * diag / 2
  const x1 = cx + Math.cos(angleRad) * diag / 2
  const y1 = cy + Math.sin(angleRad) * diag / 2

  const grad = ctx.createLinearGradient(x0, y0, x1, y1)
  for (let i = stopStart; i < parts.length; i++) {
    const sm = parts[i].match(/^(.+?)\s+([\d.]+)%$/)
    if (sm) {
      try { grad.addColorStop(parseFloat(sm[2]) / 100, sm[1].trim()) } catch { /* 무효 색상 무시 */ }
    }
  }

  ctx.fillStyle = grad
  ctx.fillRect(0, 0, w, h)
}

// ── Text ────────────────────────────────────────────────────────────────────

async function drawVerse(
  ctx: CanvasRenderingContext2D,
  text: string,
  reference: string,
  style: StyleState,
  w: number,
  h: number,
) {
  const { fontSize, fontFamily, textColor, textAlign, lineHeight, textShadow, shadowBlur, showReference, textPosition } = style
  const lineH = fontSize * lineHeight
  const maxW = w * 0.85
  const padX = w * 0.075
  const padY = h * 0.08

  // 폰트 로드 보장 (Google Fonts 등 웹폰트)
  try {
    await document.fonts.load(`${fontSize}px ${fontFamily}`)
    await document.fonts.load(`bold ${fontSize}px ${fontFamily}`)
  } catch { /* 폰트 로드 실패 시 폴백 폰트 사용 */ }

  ctx.save()

  if (textShadow) {
    ctx.shadowBlur = shadowBlur * 2
    ctx.shadowOffsetX = 0
    ctx.shadowOffsetY = 2
    ctx.shadowColor = 'rgba(0,0,0,0.7)'
  }

  ctx.fillStyle = textColor
  ctx.textBaseline = 'top'
  ctx.textAlign = textAlign
  ctx.font = `${fontSize}px ${fontFamily}`

  const mainLines = wrapKorean(ctx, text, maxW)
  const refFontSize = fontSize * 0.65
  const refLineH = refFontSize * lineHeight
  let refLines: string[] = []

  if (reference && showReference) {
    ctx.font = `${refFontSize}px ${fontFamily}`
    refLines = wrapKorean(ctx, `— ${reference}`, maxW)
    ctx.font = `${fontSize}px ${fontFamily}`
  }

  const mainH = mainLines.length * lineH
  const refH = refLines.length > 0 ? lineH * 0.5 + refLines.length * refLineH : 0
  const totalH = mainH + refH

  // textPosition → x, y 계산
  const x = textAlign === 'center' ? w / 2 : textAlign === 'right' ? w - padX : padX
  let y: number
  const pos = textPosition ?? 'center'
  if (pos.startsWith('top')) y = padY
  else if (pos.startsWith('bottom')) y = h - totalH - padY
  else y = (h - totalH) / 2

  // 본문
  ctx.font = `${fontSize}px ${fontFamily}`
  mainLines.forEach((line, i) => {
    ctx.fillText(line, x, y + i * lineH)
  })

  // 출처
  if (refLines.length) {
    ctx.save()
    ctx.globalAlpha = 0.8
    ctx.font = `${refFontSize}px ${fontFamily}`
    const refY = y + mainH + lineH * 0.5
    refLines.forEach((line, i) => {
      ctx.fillText(line, x, refY + i * refLineH)
    })
    ctx.restore()
  }

  ctx.restore()
}

function wrapKorean(ctx: CanvasRenderingContext2D, text: string, maxW: number): string[] {
  const result: string[] = []
  for (const para of text.split('\n')) {
    if (!para) { result.push(''); continue }
    let line = ''
    for (const ch of para) {
      const next = line + ch
      if (ctx.measureText(next).width > maxW && line) {
        result.push(line)
        line = ch
      } else {
        line = next
      }
    }
    if (line) result.push(line)
  }
  return result
}

// ── Calendar ────────────────────────────────────────────────────────────────

function drawCalendar(ctx: CanvasRenderingContext2D, cal: CalendarState, w: number, h: number) {
  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth()
  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const today = now.getDate()

  const MONTHS = ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월']
  const DAYS   = ['일','월','화','수','목','금','토']

  const base     = Math.min(w, h)
  const cell     = base * 0.038
  const fontSize = cell * 0.68
  const headerFs = fontSize * 1.15
  const pad      = cell * 0.55
  const rows     = Math.ceil((firstDay + daysInMonth) / 7)

  const calW = 7 * cell + pad * 2
  const calH = pad * 2 + headerFs * 1.8 + fontSize * 1.4 + rows * cell

  const mX = w * 0.04, mY = h * 0.03
  const posMap: Record<string, [number, number]> = {
    'top-left':      [mX,              mY],
    'top-center':    [(w - calW) / 2,  mY],
    'top-right':     [w - calW - mX,   mY],
    'middle-left':   [mX,              (h - calH) / 2],
    'center':        [(w - calW) / 2,  (h - calH) / 2],
    'middle-right':  [w - calW - mX,   (h - calH) / 2],
    'bottom-left':   [mX,              h - calH - mY],
    'bottom-center': [(w - calW) / 2,  h - calH - mY],
    'bottom-right':  [w - calW - mX,   h - calH - mY],
  }
  const [cx, cy] = posMap[cal.position] ?? posMap['top-right']

  ctx.save()

  // 배경
  ctx.fillStyle = `rgba(0,0,0,${cal.opacity})`
  drawRoundRect(ctx, cx, cy, calW, calH, cell * 0.3)
  ctx.fill()

  ctx.textBaseline = 'middle'
  ctx.textAlign = 'center'
  ctx.fillStyle = '#ffffff'

  // 헤더 (연/월)
  ctx.font = `bold ${headerFs}px 'Noto Sans KR', sans-serif`
  ctx.fillText(`${year} ${MONTHS[month]}`, cx + calW / 2, cy + pad + headerFs * 0.7)

  // 요일
  const dayLabelY = cy + pad + headerFs * 1.6 + fontSize * 0.5
  ctx.font = `${fontSize * 0.85}px 'Noto Sans KR', sans-serif`
  DAYS.forEach((d, i) => {
    ctx.fillStyle = i === 0 && cal.showSunday ? '#fca5a5' : 'rgba(255,255,255,0.7)'
    ctx.fillText(d, cx + pad + i * cell + cell / 2, dayLabelY)
  })

  // 날짜
  const gridY = dayLabelY + fontSize * 1.2
  const cells = [...Array(firstDay).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)]
  cells.forEach((day, idx) => {
    if (!day) return
    const col = idx % 7
    const row = Math.floor(idx / 7)
    const dx = cx + pad + col * cell + cell / 2
    const dy = gridY + row * cell + cell / 2

    if (day === today && cal.showToday) {
      ctx.fillStyle = 'rgba(255,255,255,0.28)'
      ctx.beginPath()
      ctx.arc(dx, dy, cell * 0.42, 0, Math.PI * 2)
      ctx.fill()
      ctx.fillStyle = '#ffffff'
      ctx.font = `bold ${fontSize * 0.85}px 'Noto Sans KR', sans-serif`
    } else if (col === 0 && cal.showSunday) {
      ctx.fillStyle = '#fca5a5'
      ctx.font = `${fontSize * 0.85}px 'Noto Sans KR', sans-serif`
    } else {
      ctx.fillStyle = '#ffffff'
      ctx.font = `${fontSize * 0.85}px 'Noto Sans KR', sans-serif`
    }
    ctx.fillText(String(day), dx, dy)
  })

  ctx.restore()
}

function drawRoundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath()
  if (typeof ctx.roundRect === 'function') {
    ctx.roundRect(x, y, w, h, r)
  } else {
    ctx.moveTo(x + r, y)
    ctx.lineTo(x + w - r, y); ctx.arcTo(x + w, y, x + w, y + r, r)
    ctx.lineTo(x + w, y + h - r); ctx.arcTo(x + w, y + h, x + w - r, y + h, r)
    ctx.lineTo(x + r, y + h); ctx.arcTo(x, y + h, x, y + h - r, r)
    ctx.lineTo(x, y + r); ctx.arcTo(x, y, x + r, y, r)
    ctx.closePath()
  }
}
