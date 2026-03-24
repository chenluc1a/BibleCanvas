// src/lib/constants.ts
import type { OutputSizeSpec, FontOption, PresetTheme } from '@/types'

export const OUTPUT_SIZES: Record<string, OutputSizeSpec> = {
  story: {
    width: 1080, height: 1920,
    label: '인스타 스토리', platform: 'Instagram / 카카오',
    ratio: '9:16'
  },
  feed: {
    width: 1080, height: 1080,
    label: '인스타 피드', platform: 'Instagram / Facebook',
    ratio: '1:1'
  },
  pc: {
    width: 1920, height: 1080,
    label: 'PC 바탕화면', platform: 'Windows / macOS',
    ratio: '16:9'
  },
  mobile: {
    width: 1170, height: 2532,
    label: '모바일 배경', platform: 'iPhone 14 기준',
    ratio: '19.5:9'
  },
  kakao: {
    width: 640, height: 640,
    label: '카카오 프로필', platform: 'KakaoTalk',
    ratio: '1:1'
  },
  youtube: {
    width: 2560, height: 1440,
    label: 'YouTube 배너', platform: 'YouTube',
    ratio: '16:9'
  },
}

export const FONTS: FontOption[] = [
  { id: 'noto-serif-kr',  label: '노토 세리프',  family: "'Noto Serif KR', serif",       type: 'serif' },
  { id: 'nanum-myeongjo', label: '나눔명조',     family: "'Nanum Myeongjo', serif",       type: 'serif' },
  { id: 'kopub-batang',   label: 'KoPub바탕',   family: "'KoPub Batang', serif",         type: 'serif' },
  { id: 'noto-sans-kr',   label: '노토 산스',    family: "'Noto Sans KR', sans-serif",    type: 'sans-serif' },
  { id: 'nanum-gothic',   label: '나눔고딕',     family: "'Nanum Gothic', sans-serif",    type: 'sans-serif' },
  { id: 'gowun-dodum',    label: '고운돋움',     family: "'Gowun Dodum', sans-serif",     type: 'sans-serif' },
]

export const PRESET_THEMES: PresetTheme[] = [
  {
    id: 'early-spring',
    label: '이른 봄',
    thumbnail: '/presets/early-spring-thumb.jpg',
    backgroundUrl: '/presets/early-spring.jpg',
    defaultTextColor: '#F5F0E8',
  },
  {
    id: 'dawn-mist',
    label: '새벽 안개',
    thumbnail: '/presets/dawn-mist-thumb.jpg',
    backgroundUrl: '/presets/dawn-mist.jpg',
    defaultTextColor: '#F0EBE3',
  },
  {
    id: 'evening-prayer',
    label: '저녁 기도',
    thumbnail: '/presets/evening-prayer-thumb.jpg',
    backgroundUrl: '/presets/evening-prayer.jpg',
    defaultTextColor: '#EDE4D8',
  },
  {
    id: 'deep-forest',
    label: '깊은 숲',
    thumbnail: '/presets/deep-forest-thumb.jpg',
    backgroundUrl: '/presets/deep-forest.jpg',
    defaultTextColor: '#E8F0EC',
  },
  {
    id: 'linen-light',
    label: '린넨 빛',
    thumbnail: '/presets/linen-light-thumb.jpg',
    backgroundUrl: '/presets/linen-light.jpg',
    defaultTextColor: '#3A2E24',
  },
  {
    id: 'pure-white',
    label: '새하얀',
    thumbnail: '/presets/pure-white-thumb.jpg',
    backgroundUrl: '/presets/pure-white.jpg',
    defaultTextColor: '#2C3E2D',
  },
]

export const UNSPLASH_CATEGORIES = [
  { id: 'nature',    label: '자연',    query: 'peaceful nature landscape' },
  { id: 'sky',       label: '하늘',    query: 'beautiful sky clouds sunrise' },
  { id: 'flower',    label: '꽃·식물', query: 'gentle flowers blooming spring' },
  { id: 'light',     label: '빛·안개', query: 'golden light fog morning' },
  { id: 'sea',       label: '바다·강', query: 'calm ocean river water reflection' },
  { id: 'mountain',  label: '산·들판', query: 'mountain meadow pastoral peaceful' },
]

export const DEFAULT_STYLE = {
  fontFamily: "'Noto Serif KR', serif",
  fontSize: 36,
  textColor: '#FFFFFF',
  textAlign: 'center' as const,
  textShadow: true,
  shadowBlur: 12,
  lineHeight: 1.8,
  showReference: true,
}

export const DEFAULT_CALENDAR = {
  show: true,
  position: 'top-right' as const,
  showToday: true,
  showSunday: true,
  opacity: 0.85,
}

export const APP_NAME = 'Bible Canvas'
export const APP_SLOGAN_EN = 'Your Word. Your Canvas.'
export const APP_SLOGAN_KR = '말씀이 배경이 되는 순간'
export const APP_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://biblecanvas.kr'
