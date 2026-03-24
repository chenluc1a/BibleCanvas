// src/store/editor.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type {
  BibleVerse, BackgroundType, OutputSize,
  StyleState, CalendarState, CanvasState
} from '@/types'
import {
  DEFAULT_STYLE, DEFAULT_CALENDAR,
  PRESET_THEMES
} from '@/lib/constants'

interface EditorStore extends CanvasState {
  // Derived UI state
  isExporting: boolean
  isSharing: boolean
  shareUrl: string | null
  activePanel: 'verse' | 'background' | 'style' | 'calendar' | 'export'

  // Actions — Verse
  setVerse: (verse: BibleVerse) => void
  setCustomText: (text: string) => void
  clearVerse: () => void

  // Actions — Background
  setBackgroundPreset: (id: string) => void
  setBackgroundUnsplash: (url: string, downloadUrl: string) => void
  setBackgroundUpload: (url: string) => void
  setBackgroundAI: (url: string) => void

  // Actions — Style
  updateStyle: (partial: Partial<StyleState>) => void
  resetStyle: () => void

  // Actions — Calendar
  updateCalendar: (partial: Partial<CalendarState>) => void

  // Actions — Output
  setOutputSize: (size: OutputSize) => void

  // Actions — UI
  setActivePanel: (panel: EditorStore['activePanel']) => void
  setExporting: (v: boolean) => void
  setShareUrl: (url: string | null) => void
  resetAll: () => void
}

const initialState: Omit<EditorStore,
  'setVerse' | 'setCustomText' | 'clearVerse' |
  'setBackgroundPreset' | 'setBackgroundUnsplash' | 'setBackgroundUpload' | 'setBackgroundAI' |
  'updateStyle' | 'resetStyle' | 'updateCalendar' |
  'setOutputSize' | 'setActivePanel' | 'setExporting' | 'setShareUrl' | 'resetAll'
> = {
  verse: null,
  customText: '',
  backgroundType: 'preset',
  backgroundUrl: PRESET_THEMES[0].backgroundUrl,
  style: DEFAULT_STYLE,
  calendar: DEFAULT_CALENDAR,
  outputSize: 'story',
  isExporting: false,
  isSharing: false,
  shareUrl: null,
  activePanel: 'verse',
}

export const useEditorStore = create<EditorStore>()(
  persist(
    (set, get) => ({
      ...initialState,

      setVerse: (verse) => {
        const preset = PRESET_THEMES.find(p => p.season === verse.season)
        set({
          verse,
          customText: '',
          ...(preset && get().backgroundType === 'preset'
            ? { backgroundUrl: preset.backgroundUrl, style: { ...get().style, textColor: preset.defaultTextColor } }
            : {}
          )
        })
      },

      setCustomText: (text) => set({ customText: text, verse: null }),

      clearVerse: () => set({ verse: null, customText: '' }),

      setBackgroundPreset: (id) => {
        const theme = PRESET_THEMES.find(t => t.id === id)
        if (!theme) return
        set({
          backgroundType: 'preset',
          backgroundUrl: theme.backgroundUrl,
          style: { ...get().style, textColor: theme.defaultTextColor }
        })
      },

      setBackgroundUnsplash: (url, _downloadUrl) => set({
        backgroundType: 'unsplash',
        backgroundUrl: url,
      }),

      setBackgroundUpload: (url) => set({
        backgroundType: 'upload',
        backgroundUrl: url,
      }),

      setBackgroundAI: (url) => set({
        backgroundType: 'ai',
        backgroundUrl: url,
      }),

      updateStyle: (partial) => set(state => ({
        style: { ...state.style, ...partial }
      })),

      resetStyle: () => set({ style: DEFAULT_STYLE }),

      updateCalendar: (partial) => set(state => ({
        calendar: { ...state.calendar, ...partial }
      })),

      setOutputSize: (size) => set({ outputSize: size }),

      setActivePanel: (panel) => set({ activePanel: panel }),

      setExporting: (v) => set({ isExporting: v }),

      setShareUrl: (url) => set({ shareUrl: url }),

      resetAll: () => set(initialState),
    }),
    {
      name: 'bible-canvas-editor',
      partialize: (state) => ({
        verse: state.verse,
        customText: state.customText,
        backgroundType: state.backgroundType,
        backgroundUrl: state.backgroundUrl,
        style: state.style,
        calendar: state.calendar,
        outputSize: state.outputSize,
      }),
    }
  )
)
