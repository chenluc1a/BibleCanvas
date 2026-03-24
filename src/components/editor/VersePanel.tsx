'use client'

import { useState } from 'react'
import { useEditorStore } from '@/store/editor'
import { FEATURED_VERSES, formatVerseRef, getVersesByTags } from '@/lib/bible-data'
import { getChurchSeason, getMonthVerseTheme } from '@/lib/church-calendar'
import type { BibleVerse } from '@/types'

const TAGS = ['사랑', '위로', '소망', '믿음', '감사', '용기', '구원', '능력']

export default function VersePanel() {
  const { verse, customText, verseLang, setVerse, setCustomText, clearVerse, setVerseLang } = useEditorStore()
  const [mode, setMode] = useState<'recommend' | 'search' | 'custom'>('recommend')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTag, setSelectedTag] = useState<string | null>(null)

  const seasonInfo = getChurchSeason()
  const themeMessage = getMonthVerseTheme()

  const getFilteredVerses = (): BibleVerse[] => {
    if (selectedTag) {
      return getVersesByTags([selectedTag])
    }
    if (searchQuery.trim()) {
      return FEATURED_VERSES.filter(
        (v) =>
          v.text.includes(searchQuery) ||
          v.book.includes(searchQuery) ||
          v.tags.some((t) => t.includes(searchQuery))
      )
    }
    return FEATURED_VERSES.slice(0, 6)
  }

  const filteredVerses = getFilteredVerses()

  return (
    <div className="space-y-4 animate-fade-in">
      {/* Season banner */}
      <div className="glass rounded-xl p-3 border border-canvas-accent/10">
        <div className="flex items-center gap-2 mb-1">
          <div
            className="w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: seasonInfo.color }}
          />
          <span className="text-xs font-medium text-canvas-accent-light">
            {seasonInfo.label}
          </span>
        </div>
        <p className="text-[11px] text-canvas-muted">{themeMessage}</p>
      </div>

      {/* Mode tabs */}
      <div className="flex gap-1 p-1 rounded-lg bg-canvas-surface/80">
        {[
          { key: 'recommend', label: '추천', icon: '✨' },
          { key: 'search', label: '검색', icon: '🔍' },
          { key: 'custom', label: '직접 입력', icon: '✏️' },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setMode(tab.key as typeof mode)}
            className={`flex-1 py-2 px-2 text-xs rounded-md transition-all duration-200 ${
              mode === tab.key
                ? 'bg-canvas-accent/20 text-canvas-accent-light shadow-sm'
                : 'text-canvas-muted hover:text-canvas-text'
            }`}
          >
            <span className="mr-1">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Custom text input */}
      {mode === 'custom' && (
        <div className="space-y-2 panel-enter">
          <textarea
            value={customText}
            onChange={(e) => setCustomText(e.target.value)}
            placeholder="말씀이나 원하는 문구를 입력해주세요..."
            className="w-full h-32 p-3 rounded-xl bg-canvas-surface border border-canvas-border text-sm text-canvas-text placeholder:text-canvas-muted/50 resize-none focus:outline-none focus:border-canvas-accent/40 transition-colors"
          />
          <p className="text-[10px] text-canvas-muted text-right">
            {customText.length} / 200
          </p>
        </div>
      )}

      {/* Search input */}
      {mode === 'search' && (
        <div className="relative panel-enter">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="구절, 책명, 키워드로 검색..."
            className="w-full py-2.5 px-4 pr-10 rounded-xl bg-canvas-surface border border-canvas-border text-sm text-canvas-text placeholder:text-canvas-muted/50 focus:outline-none focus:border-canvas-accent/40 transition-colors"
          />
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-canvas-muted"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </div>
      )}

      {/* Tags */}
      {mode !== 'custom' && (
        <div className="flex flex-wrap gap-1.5">
          {TAGS.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
              className={`px-2.5 py-1 text-[11px] rounded-full border transition-all duration-200 ${
                selectedTag === tag
                  ? 'bg-canvas-accent/20 border-canvas-accent/40 text-canvas-accent-light'
                  : 'border-canvas-border text-canvas-muted hover:border-canvas-accent/20 hover:text-canvas-text'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      )}

      {/* Verse list */}
      {mode !== 'custom' && (
        <div className="space-y-2 max-h-[calc(100vh-500px)] overflow-y-auto pr-1">
          {filteredVerses.length === 0 ? (
            <div className="text-center py-8 text-canvas-muted text-sm">
              검색 결과가 없습니다
            </div>
          ) : (
            filteredVerses.map((v) => (
              <button
                key={v.id}
                onClick={() => setVerse(v)}
                className={`verse-card w-full text-left p-3 rounded-xl border transition-all duration-200 ${
                  verse?.id === v.id
                    ? 'bg-canvas-accent/10 border-canvas-accent/30'
                    : 'bg-canvas-surface/50 border-canvas-border hover:border-canvas-accent/20'
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <span className="text-[11px] font-medium text-canvas-accent-light">
                    {formatVerseRef(v)}
                  </span>
                  {verse?.id === v.id && (
                    <span className="text-[10px] bg-canvas-accent/20 text-canvas-accent-light px-1.5 py-0.5 rounded-md">
                      선택됨
                    </span>
                  )}
                </div>
                <p className="text-xs text-canvas-text/80 leading-relaxed line-clamp-3">
                  {v.text}
                </p>
                <div className="flex gap-1 mt-2">
                  {v.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="text-[9px] px-1.5 py-0.5 rounded bg-canvas-border/50 text-canvas-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </button>
            ))
          )}
        </div>
      )}

      {/* Language toggle — 구절 선택 시 영어/한글 전환 */}
      {verse && verse.textEn && (
        <div className="flex items-center justify-between p-2 rounded-xl bg-canvas-surface/60 border border-canvas-border/40">
          <span className="text-[11px] text-canvas-muted">말씀 언어</span>
          <div className="flex gap-1 p-0.5 rounded-lg bg-canvas-border/30">
            {(['ko', 'en'] as const).map((lang) => (
              <button
                key={lang}
                onClick={() => setVerseLang(lang)}
                className={`px-2.5 py-1 text-[11px] rounded-md font-medium transition-all duration-200 ${
                  verseLang === lang
                    ? 'bg-canvas-accent/20 text-canvas-accent-light'
                    : 'text-canvas-muted hover:text-canvas-text'
                }`}
              >
                {lang === 'ko' ? '한국어' : 'English'}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Clear button */}
      {(verse || customText) && (
        <button
          onClick={clearVerse}
          className="w-full py-2 text-xs text-canvas-muted hover:text-red-400 transition-colors rounded-lg border border-canvas-border/50 hover:border-red-400/30"
        >
          말씀 초기화
        </button>
      )}
    </div>
  )
}
