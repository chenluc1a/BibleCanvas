'use client'

import { APP_NAME, APP_SLOGAN_EN, APP_SLOGAN_KR } from '@/lib/constants'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 glass border-b border-canvas-border/50">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo + Slogan */}
        <div className="flex items-center gap-3">
          {/* Logo icon */}
          <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-canvas-accent to-canvas-accent-light flex items-center justify-center shadow-lg shadow-canvas-accent/20">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
              <path d="M12 6v7" />
              <path d="M9 10h6" />
            </svg>
          </div>

          <div className="flex flex-col">
            <h1 className="text-lg font-bold tracking-tight text-gradient leading-tight">
              {APP_NAME}
            </h1>
            <p className="hidden sm:block text-[10px] text-canvas-muted tracking-wider uppercase leading-tight">
              {APP_SLOGAN_EN}
            </p>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <span className="hidden md:block text-xs text-canvas-muted italic">
            {APP_SLOGAN_KR}
          </span>
          <div className="w-px h-6 bg-canvas-border hidden md:block" />
          <button
            className="px-3 py-1.5 text-xs rounded-lg bg-canvas-accent/10 text-canvas-accent-light border border-canvas-accent/20 hover:bg-canvas-accent/20 transition-all duration-200"
            title="공유"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block mr-1">
              <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
              <polyline points="16 6 12 2 8 6" />
              <line x1="12" y1="2" x2="12" y2="15" />
            </svg>
            공유
          </button>
        </div>
      </div>
    </header>
  )
}
