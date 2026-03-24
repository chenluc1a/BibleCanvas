'use client'

import { APP_NAME, APP_SLOGAN_EN, APP_SLOGAN_KR } from '@/lib/constants'
import { useTheme } from '@/components/ThemeProvider'

export default function Header() {
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="sticky top-0 z-50 glass border-b" style={{ borderColor: 'var(--canvas-border)' }}>
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo + Slogan */}
        <div className="flex items-center gap-3">
          {/* Logo icon */}
          <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-canvas-accent to-canvas-accent-light flex items-center justify-center shadow-lg" style={{ boxShadow: '0 4px 12px var(--glow-color)' }}>
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
            <p className="hidden sm:block text-[10px] tracking-wider uppercase leading-tight" style={{ color: 'var(--canvas-muted)' }}>
              {APP_SLOGAN_EN}
            </p>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <span className="hidden md:block text-xs italic" style={{ color: 'var(--canvas-muted)' }}>
            {APP_SLOGAN_KR}
          </span>
          <div className="w-px h-6 hidden md:block" style={{ backgroundColor: 'var(--canvas-border)' }} />

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="relative w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-105"
            style={{
              backgroundColor: theme === 'dark' ? 'rgba(124,106,239,0.1)' : 'rgba(108,92,231,0.1)',
              border: `1px solid ${theme === 'dark' ? 'rgba(124,106,239,0.2)' : 'rgba(108,92,231,0.15)'}`,
            }}
            title={theme === 'dark' ? '라이트 모드' : '다크 모드'}
            aria-label="테마 전환"
          >
            {/* Sun icon */}
            <svg
              width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              className="theme-toggle-icon absolute"
              style={{
                opacity: theme === 'dark' ? 1 : 0,
                transform: theme === 'dark' ? 'rotate(0deg) scale(1)' : 'rotate(90deg) scale(0.5)',
                color: 'var(--canvas-accent-light)',
              }}
            >
              <circle cx="12" cy="12" r="5" />
              <line x1="12" y1="1" x2="12" y2="3" />
              <line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" />
              <line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </svg>
            {/* Moon icon */}
            <svg
              width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              className="theme-toggle-icon absolute"
              style={{
                opacity: theme === 'light' ? 1 : 0,
                transform: theme === 'light' ? 'rotate(0deg) scale(1)' : 'rotate(-90deg) scale(0.5)',
                color: 'var(--canvas-accent-light)',
              }}
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          </button>

          <button
            className="px-3 py-1.5 text-xs rounded-lg transition-all duration-200"
            style={{
              backgroundColor: 'rgba(124,106,239,0.1)',
              color: 'var(--canvas-accent-light)',
              border: '1px solid rgba(124,106,239,0.2)',
            }}
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
