'use client'

import { useEditorStore } from '@/store/editor'
import type { CalendarPosition, CalendarSize } from '@/types'

// 3×3 위치 그리드 정의
const POSITION_GRID: { value: CalendarPosition; label: string }[][] = [
  [
    { value: 'top-left',    label: '↖' },
    { value: 'top-center',  label: '↑' },
    { value: 'top-right',   label: '↗' },
  ],
  [
    { value: 'middle-left',  label: '←' },
    { value: 'center',       label: '·' },
    { value: 'middle-right', label: '→' },
  ],
  [
    { value: 'bottom-left',   label: '↙' },
    { value: 'bottom-center', label: '↓' },
    { value: 'bottom-right',  label: '↘' },
  ],
]

const SIZE_OPTIONS: { value: CalendarSize; label: string }[] = [
  { value: 'sm', label: '소' },
  { value: 'md', label: '중' },
  { value: 'lg', label: '대' },
]

export default function CalendarPanel() {
  const { calendar, updateCalendar } = useEditorStore()

  return (
    <div className="space-y-5 animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-medium text-canvas-text">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
          달력
        </div>

        {/* Calendar on/off */}
        <button
          onClick={() => updateCalendar({ show: !calendar.show })}
          className={`relative w-10 h-5 rounded-full transition-all duration-300 ${
            calendar.show ? 'bg-canvas-accent' : 'bg-canvas-border'
          }`}
        >
          <div
            className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-300 ${
              calendar.show ? 'translate-x-[22px]' : 'translate-x-0.5'
            }`}
          />
        </button>
      </div>

      {calendar.show && (
        <div className="space-y-4 panel-enter">

          {/* Position — 3×3 grid */}
          <div className="space-y-2">
            <label className="text-[11px] text-canvas-muted uppercase tracking-wider">
              위치
            </label>
            {/* 미니 캔버스 위치 선택기 — 3×3 고정 높이 그리드 */}
            <div
              className="rounded-xl border border-canvas-border/50 p-2 grid grid-rows-3 gap-1.5"
              style={{ backgroundColor: 'var(--canvas-surface)', height: '108px' }}
            >
              {POSITION_GRID.map((row, ri) => (
                <div key={ri} className="grid grid-cols-3 gap-1.5 h-full">
                  {row.map(({ value, label }) => (
                    <button
                      key={value}
                      onClick={() => updateCalendar({ position: value })}
                      title={value}
                      className={`rounded-md text-sm font-bold transition-colors duration-200 flex items-center justify-center w-full h-full ${
                        calendar.position === value
                          ? 'bg-canvas-accent/25 text-canvas-accent-light border border-canvas-accent/50'
                          : 'text-canvas-muted hover:bg-canvas-border/40 border border-transparent'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Size */}
          <div className="space-y-2">
            <label className="text-[11px] text-canvas-muted uppercase tracking-wider">
              크기
            </label>
            <div className="grid grid-cols-3 gap-2">
              {SIZE_OPTIONS.map(({ value, label }) => (
                <button
                  key={value}
                  onClick={() => updateCalendar({ size: value })}
                  className={`py-1.5 rounded-lg text-xs border transition-all duration-200 ${
                    calendar.size === value
                      ? 'bg-canvas-accent/15 border-canvas-accent/40 text-canvas-accent-light'
                      : 'border-canvas-border text-canvas-muted hover:border-canvas-accent/20'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Opacity — 배경 투명도 (텍스트 제외) */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-[11px] text-canvas-muted uppercase tracking-wider">
                배경 불투명도
              </label>
              <span className="text-[11px] text-canvas-accent-light">
                {Math.round(calendar.opacity * 100)}%
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="0.9"
              step="0.05"
              value={calendar.opacity}
              onChange={(e) => updateCalendar({ opacity: Number(e.target.value) })}
              className="w-full h-1.5 bg-canvas-border rounded-full appearance-none cursor-pointer accent-canvas-accent"
            />
            <p className="text-[10px] text-canvas-muted">0% 완전 투명 → 90% 진하게 · 글씨는 항상 선명</p>
          </div>

          {/* Today highlight */}
          <div className="flex items-center justify-between">
            <label className="text-[11px] text-canvas-muted uppercase tracking-wider">
              오늘 표시
            </label>
            <button
              onClick={() => updateCalendar({ showToday: !calendar.showToday })}
              className={`relative w-10 h-5 rounded-full transition-all duration-300 ${
                calendar.showToday ? 'bg-canvas-accent' : 'bg-canvas-border'
              }`}
            >
              <div
                className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-300 ${
                  calendar.showToday ? 'translate-x-[22px]' : 'translate-x-0.5'
                }`}
              />
            </button>
          </div>

          {/* Sunday color */}
          <div className="flex items-center justify-between">
            <label className="text-[11px] text-canvas-muted uppercase tracking-wider">
              주일 표시
            </label>
            <button
              onClick={() => updateCalendar({ showSunday: !calendar.showSunday })}
              className={`relative w-10 h-5 rounded-full transition-all duration-300 ${
                calendar.showSunday ? 'bg-canvas-accent' : 'bg-canvas-border'
              }`}
            >
              <div
                className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-300 ${
                  calendar.showSunday ? 'translate-x-[22px]' : 'translate-x-0.5'
                }`}
              />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
