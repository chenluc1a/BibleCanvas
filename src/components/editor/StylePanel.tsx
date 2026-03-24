'use client'

import { useEditorStore } from '@/store/editor'
import { FONTS } from '@/lib/constants'

const TEXT_COLORS = [
  '#FFFFFF', '#F5F0E8', '#E8E8F0', '#000000',
  '#1A1A2E', '#3A2E24', '#C4B5FD', '#FDE68A',
  '#FECACA', '#BBF7D0', '#BAE6FD', '#E9D5FF',
]

export default function StylePanel() {
  const { style, updateStyle } = useEditorStore()

  return (
    <div className="space-y-5 animate-fade-in">
      <div className="flex items-center gap-2 text-sm font-medium text-canvas-text">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="4 7 4 4 20 4 20 7" />
          <line x1="9" y1="20" x2="15" y2="20" />
          <line x1="12" y1="4" x2="12" y2="20" />
        </svg>
        스타일 설정
      </div>

      {/* Font selection */}
      <div className="space-y-2">
        <label className="text-[11px] text-canvas-muted uppercase tracking-wider">
          폰트
        </label>
        <div className="grid grid-cols-2 gap-1.5">
          {FONTS.map((font) => (
            <button
              key={font.id}
              onClick={() => updateStyle({ fontFamily: font.family })}
              className={`py-2 px-3 rounded-lg text-xs border transition-all duration-200 ${
                style.fontFamily === font.family
                  ? 'bg-canvas-accent/15 border-canvas-accent/40 text-canvas-accent-light'
                  : 'border-canvas-border text-canvas-muted hover:border-canvas-accent/20 hover:text-canvas-text'
              }`}
              style={{ fontFamily: font.family }}
            >
              {font.label}
            </button>
          ))}
        </div>
      </div>

      {/* Font size */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <label className="text-[11px] text-canvas-muted uppercase tracking-wider">
            크기
          </label>
          <span className="text-[11px] text-canvas-accent-light">{style.fontSize}px</span>
        </div>
        <input
          type="range"
          min="16"
          max="64"
          value={style.fontSize}
          onChange={(e) => updateStyle({ fontSize: Number(e.target.value) })}
          className="w-full h-1.5 bg-canvas-border rounded-full appearance-none cursor-pointer accent-canvas-accent"
        />
      </div>

      {/* Text color */}
      <div className="space-y-2">
        <label className="text-[11px] text-canvas-muted uppercase tracking-wider">
          텍스트 색상
        </label>
        <div className="flex flex-wrap gap-2">
          {TEXT_COLORS.map((color) => (
            <button
              key={color}
              onClick={() => updateStyle({ textColor: color })}
              className={`w-7 h-7 rounded-full border-2 transition-all duration-200 hover:scale-110 ${
                style.textColor === color
                  ? 'border-canvas-accent shadow-md shadow-canvas-accent/30 scale-110'
                  : 'border-canvas-border/50'
              }`}
              style={{ backgroundColor: color }}
              title={color}
            />
          ))}
          {/* Custom color */}
          <div className="relative w-7 h-7">
            <input
              type="color"
              value={style.textColor}
              onChange={(e) => updateStyle({ textColor: e.target.value })}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              title="커스텀 색상"
            />
            <div className="w-full h-full rounded-full border-2 border-canvas-border/50 bg-gradient-to-br from-red-500 via-green-500 to-blue-500 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Alignment */}
      <div className="space-y-2">
        <label className="text-[11px] text-canvas-muted uppercase tracking-wider">
          정렬
        </label>
        <div className="flex gap-1 p-1 rounded-lg bg-canvas-surface/80">
          {[
            { value: 'left', icon: (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="17" y1="10" x2="3" y2="10" />
                <line x1="21" y1="6" x2="3" y2="6" />
                <line x1="21" y1="14" x2="3" y2="14" />
                <line x1="17" y1="18" x2="3" y2="18" />
              </svg>
            )},
            { value: 'center', icon: (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="10" x2="6" y2="10" />
                <line x1="21" y1="6" x2="3" y2="6" />
                <line x1="21" y1="14" x2="3" y2="14" />
                <line x1="18" y1="18" x2="6" y2="18" />
              </svg>
            )},
            { value: 'right', icon: (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="21" y1="10" x2="7" y2="10" />
                <line x1="21" y1="6" x2="3" y2="6" />
                <line x1="21" y1="14" x2="3" y2="14" />
                <line x1="21" y1="18" x2="7" y2="18" />
              </svg>
            )},
          ].map(({ value, icon }) => (
            <button
              key={value}
              onClick={() => updateStyle({ textAlign: value as 'left' | 'center' | 'right' })}
              className={`flex-1 py-2 flex items-center justify-center rounded-md transition-all duration-200 ${
                style.textAlign === value
                  ? 'bg-canvas-accent/20 text-canvas-accent-light'
                  : 'text-canvas-muted hover:text-canvas-text'
              }`}
            >
              {icon}
            </button>
          ))}
        </div>
      </div>

      {/* Line height */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <label className="text-[11px] text-canvas-muted uppercase tracking-wider">
            줄 간격
          </label>
          <span className="text-[11px] text-canvas-accent-light">{style.lineHeight}</span>
        </div>
        <input
          type="range"
          min="1.2"
          max="3.0"
          step="0.1"
          value={style.lineHeight}
          onChange={(e) => updateStyle({ lineHeight: Number(e.target.value) })}
          className="w-full h-1.5 bg-canvas-border rounded-full appearance-none cursor-pointer accent-canvas-accent"
        />
      </div>

      {/* Text shadow toggle */}
      <div className="flex items-center justify-between">
        <label className="text-[11px] text-canvas-muted uppercase tracking-wider">
          텍스트 그림자
        </label>
        <button
          onClick={() => updateStyle({ textShadow: !style.textShadow })}
          className={`relative w-10 h-5 rounded-full transition-all duration-300 ${
            style.textShadow ? 'bg-canvas-accent' : 'bg-canvas-border'
          }`}
        >
          <div
            className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-300 ${
              style.textShadow ? 'translate-x-[22px]' : 'translate-x-0.5'
            }`}
          />
        </button>
      </div>

      {/* Reference toggle */}
      <div className="flex items-center justify-between">
        <label className="text-[11px] text-canvas-muted uppercase tracking-wider">
          장절 표시
        </label>
        <button
          onClick={() => updateStyle({ showReference: !style.showReference })}
          className={`relative w-10 h-5 rounded-full transition-all duration-300 ${
            style.showReference ? 'bg-canvas-accent' : 'bg-canvas-border'
          }`}
        >
          <div
            className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-300 ${
              style.showReference ? 'translate-x-[22px]' : 'translate-x-0.5'
            }`}
          />
        </button>
      </div>
    </div>
  )
}
