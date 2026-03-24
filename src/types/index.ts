// src/types/index.ts

export interface BibleVerse {
  id: string
  book: string
  bookEn: string
  chapter: number
  verse: number
  text: string
  translation: 'KRV' | 'NKRV' | 'NLT'  // 개역한글 | 개역개정 | 새번역
  tags: string[]
  season?: ChurchSeason
}

export type ChurchSeason =
  | '대림절' | '성탄절' | '주현절'
  | '사순절' | '종려주일' | '성목요일'
  | '성금요일' | '부활절' | '성령강림절'
  | '추수감사절' | '일반'

export type BackgroundType = 'preset' | 'unsplash' | 'upload' | 'ai'

export type BackgroundFit = 'cover' | 'contain' | 'fill' | 'fit-width' | 'fit-height'

export type OutputSize = 'story' | 'feed' | 'pc' | 'mobile' | 'kakao' | 'youtube'

export interface OutputSizeSpec {
  width: number
  height: number
  label: string
  platform: string
  ratio: string
}

export interface PresetTheme {
  id: string
  label: string
  thumbnail: string
  backgroundUrl: string
  defaultTextColor: string
  season?: ChurchSeason
  gradient?: string
}

export interface UnsplashImage {
  id: string
  url: string
  thumbUrl: string
  authorName: string
  authorUrl: string
  downloadUrl: string
}

export interface FontOption {
  id: string
  label: string
  family: string
  type: 'serif' | 'sans-serif'
}

export type TextAlign = 'left' | 'center' | 'right'

export type CalendarPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'

export interface StyleState {
  fontFamily: string
  fontSize: number
  textColor: string
  textAlign: TextAlign
  textShadow: boolean
  shadowBlur: number
  lineHeight: number
  showReference: boolean
}

export interface CalendarState {
  show: boolean
  position: CalendarPosition
  showToday: boolean
  showSunday: boolean
  opacity: number
}

export interface CanvasState {
  verse: BibleVerse | null
  customText: string
  backgroundType: BackgroundType
  backgroundUrl: string
  backgroundFit: BackgroundFit
  style: StyleState
  calendar: CalendarState
  outputSize: OutputSize
}

export interface ShareData {
  id: string
  canvasState: CanvasState
  imageUrl: string
  createdAt: string
  expiresAt: string
}

// API Response Types
export interface VerseRecommendResponse {
  verses: BibleVerse[]
  season: ChurchSeason
  message: string
}

export interface UnsplashSearchResponse {
  images: UnsplashImage[]
  total: number
}

export interface AIBackgroundResponse {
  imageUrl: string
  prompt: string
}

export interface ShareLinkResponse {
  shareUrl: string
  shortCode: string
  expiresAt: string
}
