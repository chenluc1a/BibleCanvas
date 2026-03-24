'use client'

import { useState } from 'react'
import Header from '@/components/layout/Header'
import CanvasPreview from '@/components/editor/CanvasPreview'
import VersePanel from '@/components/editor/VersePanel'
import BackgroundPanel from '@/components/editor/BackgroundPanel'
import StylePanel from '@/components/editor/StylePanel'
import CalendarPanel from '@/components/editor/CalendarPanel'
import ExportPanel from '@/components/editor/ExportPanel'

const PANELS = [
  { key: 'verse', label: '말씀', icon: '📖', component: VersePanel },
  { key: 'background', label: '배경', icon: '🖼️', component: BackgroundPanel },
  { key: 'style', label: '스타일', icon: '✨', component: StylePanel },
  { key: 'calendar', label: '달력', icon: '📅', component: CalendarPanel },
  { key: 'export', label: '내보내기', icon: '📥', component: ExportPanel },
] as const

export default function EditorPage() {
  const [activePanel, setActivePanel] = useState<string>('verse')
  const [mobilePanel, setMobilePanel] = useState<string | null>(null)

  const ActivePanelComponent =
    PANELS.find((p) => p.key === activePanel)?.component ?? VersePanel
  const MobilePanelComponent =
    mobilePanel ? PANELS.find((p) => p.key === mobilePanel)?.component : null

  return (
    <div className="min-h-screen flex flex-col bg-canvas-bg bg-noise">
      <Header />

      {/* Desktop Layout (≥1024px) */}
      <div className="hidden lg:flex flex-1 max-w-[1920px] mx-auto w-full">
        {/* Left panel — Verse & Background */}
        <aside className="w-[320px] border-r border-canvas-border/50 overflow-y-auto p-4 space-y-6">
          <VersePanel />
          <div className="border-t border-canvas-border/30 pt-4">
            <BackgroundPanel />
          </div>
        </aside>

        {/* Center — Canvas Preview */}
        <main className="flex-1 flex items-center justify-center p-6 overflow-hidden">
          <div className="w-full max-w-lg">
            <CanvasPreview />
          </div>
        </main>

        {/* Right panel — Style, Calendar, Export */}
        <aside className="w-[300px] border-l border-canvas-border/50 overflow-y-auto p-4 space-y-6">
          <StylePanel />
          <div className="border-t border-canvas-border/30 pt-4">
            <CalendarPanel />
          </div>
          <div className="border-t border-canvas-border/30 pt-4">
            <ExportPanel />
          </div>
        </aside>
      </div>

      {/* Tablet Layout (768px–1023px) */}
      <div className="hidden md:flex lg:hidden flex-col flex-1">
        {/* Canvas */}
        <div className="flex-shrink-0 p-4 flex justify-center">
          <div className="w-full max-w-md">
            <CanvasPreview />
          </div>
        </div>

        {/* Tab bar */}
        <div className="sticky top-16 z-40 glass border-y border-canvas-border/50">
          <div className="flex">
            {PANELS.map((panel) => (
              <button
                key={panel.key}
                onClick={() => setActivePanel(panel.key)}
                className={`flex-1 py-3 text-xs font-medium flex flex-col items-center gap-1 transition-all duration-200 border-b-2 ${
                  activePanel === panel.key
                    ? 'border-canvas-accent text-canvas-accent-light'
                    : 'border-transparent text-canvas-muted hover:text-canvas-text'
                }`}
              >
                <span className="text-sm">{panel.icon}</span>
                {panel.label}
              </button>
            ))}
          </div>
        </div>

        {/* Active tab content */}
        <div className="flex-1 overflow-y-auto p-4 max-w-2xl mx-auto w-full">
          <ActivePanelComponent />
        </div>
      </div>

      {/* Mobile Layout (<768px) */}
      <div className="flex flex-col flex-1 md:hidden">
        {/* Canvas */}
        <div className="flex-1 flex items-center justify-center p-3">
          <div className="w-full max-w-sm">
            <CanvasPreview />
          </div>
        </div>

        {/* Bottom tab bar */}
        <nav className="sticky bottom-0 z-50 glass border-t border-canvas-border/50 safe-area-inset">
          <div className="flex">
            {PANELS.map((panel) => (
              <button
                key={panel.key}
                onClick={() =>
                  setMobilePanel(mobilePanel === panel.key ? null : panel.key)
                }
                className={`flex-1 py-3 pb-4 text-[10px] font-medium flex flex-col items-center gap-1 transition-all duration-200 ${
                  mobilePanel === panel.key
                    ? 'text-canvas-accent-light'
                    : 'text-canvas-muted'
                }`}
              >
                <span className="text-base">{panel.icon}</span>
                {panel.label}
              </button>
            ))}
          </div>
        </nav>

        {/* Mobile bottom sheet */}
        {mobilePanel && MobilePanelComponent && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-black/50 z-40 animate-fade-in"
              onClick={() => setMobilePanel(null)}
            />
            {/* Sheet */}
            <div className="fixed inset-x-0 bottom-0 z-50 bottom-sheet rounded-t-2xl glass max-h-[70vh] overflow-y-auto">
              {/* Handle */}
              <div className="flex justify-center pt-3 pb-2">
                <div className="w-10 h-1 rounded-full bg-canvas-border" />
              </div>
              <div className="px-4 pb-24">
                <MobilePanelComponent />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
