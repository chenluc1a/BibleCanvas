'use client'

import { useEditorStore } from '@/store/editor'
import { OUTPUT_SIZES } from '@/lib/constants'
import { formatVerseRef } from '@/lib/bible-data'
import type { BackgroundFit } from '@/types'

function getObjectFitStyle(fit: BackgroundFit): React.CSSProperties {
  switch (fit) {
    case 'cover':    return { objectFit: 'cover', width: '100%', height: '100%' }
    case 'contain':  return { objectFit: 'contain', width: '100%', height: '100%' }
    case 'fill':     return { objectFit: 'fill', width: '100%', height: '100%' }
    case 'fit-width':  return { objectFit: 'cover', width: '100%', height: 'auto', minHeight: '100%' }
    case 'fit-height': return { objectFit: 'cover', width: 'auto', height: '100%', minWidth: '100%' }
    default:         return { objectFit: 'cover', width: '100%', height: '100%' }
  }
}

export default function CanvasPreview() {
  const {
    verse,
    customText,
    backgroundUrl,
    backgroundFit,
    style,
    calendar,
    outputSize,
  } = useEditorStore()

  const sizeSpec = OUTPUT_SIZES[outputSize]
  const aspectRatio = sizeSpec.width / sizeSpec.height

  const displayText = verse ? verse.text : customText
  const referenceText = verse ? formatVerseRef(verse) : ''

  const isGradient = backgroundUrl.startsWith('gradient:')
  const gradientValue = isGradient ? backgroundUrl.slice('gradient:'.length) : ''

  // Generate calendar data
  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth()
  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const today = now.getDate()

  const monthNames = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월']
  const dayNames = ['일', '월', '화', '수', '목', '금', '토']

  const calendarDays: (number | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ]

  const calendarPositionClass = {
    'top-left': 'top-3 left-3',
    'top-right': 'top-3 right-3',
    'bottom-left': 'bottom-3 left-3',
    'bottom-right': 'bottom-3 right-3',
  }[calendar.position]

  // Text shadow style
  const textShadowStyle = style.textShadow
    ? `0 2px ${style.shadowBlur}px rgba(0,0,0,0.7), 0 0 ${style.shadowBlur * 2}px rgba(0,0,0,0.3)`
    : 'none'

  const fitStyle = getObjectFitStyle(backgroundFit)

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Size label */}
      <div className="flex items-center gap-2 text-xs" style={{ color: 'var(--canvas-muted)' }}>
        <span>{sizeSpec.label}</span>
        <span style={{ color: 'var(--canvas-border)' }}>•</span>
        <span>{sizeSpec.width} × {sizeSpec.height}</span>
      </div>

      {/* Canvas wrapper */}
      <div
        className="canvas-glow rounded-2xl overflow-hidden relative w-full"
        style={{
          aspectRatio: `${aspectRatio}`,
          maxHeight: '70vh',
          maxWidth: aspectRatio > 1 ? '100%' : `calc(70vh * ${aspectRatio})`,
        }}
        id="canvas-preview"
      >
        {/* Background */}
        <div className="absolute inset-0" style={{ backgroundColor: 'var(--canvas-surface)' }}>
          {isGradient ? (
            <div
              className="w-full h-full"
              style={{ background: gradientValue }}
            />
          ) : backgroundUrl ? (
            <div className="w-full h-full flex items-center justify-center overflow-hidden"
              style={{ backgroundColor: backgroundFit === 'contain' ? '#000000' : undefined }}
            >
              <img
                src={backgroundUrl}
                alt="배경"
                style={fitStyle}
                crossOrigin="anonymous"
              />
            </div>
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900" />
          )}
          {/* Dark overlay for text readability */}
          {!isGradient && <div className="absolute inset-0 bg-black/20" />}
        </div>

        {/* Text overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-8 sm:p-12">
          {displayText ? (
            <div
              className="max-w-[85%] transition-all duration-300"
              style={{
                fontFamily: style.fontFamily,
                fontSize: `clamp(14px, ${style.fontSize / 24}vw, ${style.fontSize}px)`,
                color: style.textColor,
                textAlign: style.textAlign,
                lineHeight: style.lineHeight,
                textShadow: textShadowStyle,
              }}
            >
              <p className="whitespace-pre-line leading-relaxed">{displayText}</p>
              {referenceText && style.showReference && (
                <p
                  className="mt-4 text-[0.65em] tracking-wider"
                  style={{ opacity: 0.8 }}
                >
                  — {referenceText}
                </p>
              )}
            </div>
          ) : (
            <div className="text-center text-white/30 select-none">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mx-auto mb-3 opacity-40">
                <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
                <path d="M12 6v7" />
                <path d="M9 10h6" />
              </svg>
              <p className="text-sm">말씀을 선택하거나 입력해주세요</p>
            </div>
          )}
        </div>

        {/* Calendar overlay */}
        {calendar.show && (
          <div
            className={`absolute ${calendarPositionClass} transition-all duration-300`}
            style={{ opacity: calendar.opacity }}
          >
            <div className="bg-black/40 backdrop-blur-md rounded-lg p-2 text-white text-[8px] sm:text-[10px] min-w-[120px] sm:min-w-[150px]">
              <div className="text-center font-medium mb-1 text-[10px] sm:text-xs">
                {year} {monthNames[month]}
              </div>
              <div className="grid grid-cols-7 gap-px">
                {dayNames.map((d, i) => (
                  <div
                    key={d}
                    className={`text-center py-0.5 font-medium ${
                      i === 0 && calendar.showSunday ? 'text-red-300' : 'text-white/60'
                    }`}
                  >
                    {d}
                  </div>
                ))}
                {calendarDays.map((day, i) => (
                  <div
                    key={i}
                    className={`text-center py-0.5 rounded ${
                      day === today && calendar.showToday
                        ? 'bg-white/30 font-bold'
                        : ''
                    } ${
                      day && i % 7 === 0 && calendar.showSunday
                        ? 'text-red-300'
                        : ''
                    }`}
                  >
                    {day ?? ''}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
