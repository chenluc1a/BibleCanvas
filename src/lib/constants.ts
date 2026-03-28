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

// Unsplash 썸네일/배경 URL 빌더
const usp = (id: string, tw: number, th: number) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${tw}&h=${th}&q=80`
const usbg = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1920&q=85`

export const PRESET_THEMES: PresetTheme[] = [
  // ─── 로컬 프리셋 ───────────────────────────────────────────────
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
  // ─── Unsplash 무료 사진 ────────────────────────────────────────
  {
    id: 'mountain-sunrise',
    label: '산 일출',
    thumbnail: usp('1464822759023-fed622ff2c3b', 400, 300),
    backgroundUrl: usbg('1464822759023-fed622ff2c3b'),
    defaultTextColor: '#FFF8E8',
  },
  {
    id: 'misty-mountains',
    label: '안개 산',
    thumbnail: usp('1506905925346-21bda4d32df4', 400, 300),
    backgroundUrl: usbg('1506905925346-21bda4d32df4'),
    defaultTextColor: '#E8F0F5',
  },
  {
    id: 'calm-ocean',
    label: '잔잔한 바다',
    thumbnail: usp('1507525428034-b723cf961d3e', 400, 300),
    backgroundUrl: usbg('1507525428034-b723cf961d3e'),
    defaultTextColor: '#F0F8FF',
  },
  {
    id: 'starry-night',
    label: '별밤',
    thumbnail: usp('1419242902214-272b3f66ee7a', 400, 300),
    backgroundUrl: usbg('1419242902214-272b3f66ee7a'),
    defaultTextColor: '#E8EEFF',
  },
  {
    id: 'golden-wheat',
    label: '황금 밀밭',
    thumbnail: usp('1475924156734-496f6cac6ec1', 400, 300),
    backgroundUrl: usbg('1475924156734-496f6cac6ec1'),
    defaultTextColor: '#FFF8E0',
  },
  {
    id: 'cherry-blossom',
    label: '벚꽃',
    thumbnail: usp('1498429089284-41f8cf3ffd39', 400, 300),
    backgroundUrl: usbg('1498429089284-41f8cf3ffd39'),
    defaultTextColor: '#5A1A3A',
  },
  {
    id: 'forest-light',
    label: '숲 빛줄기',
    thumbnail: usp('1448375240586-882707db888b', 400, 300),
    backgroundUrl: usbg('1448375240586-882707db888b'),
    defaultTextColor: '#F0F8EC',
  },
  {
    id: 'autumn-trees',
    label: '가을 단풍',
    thumbnail: usp('1508739773434-c26b3d09e071', 400, 300),
    backgroundUrl: usbg('1508739773434-c26b3d09e071'),
    defaultTextColor: '#FFF5E8',
  },
]

// 기본 배경화면 (말씀 없이 사용 가능한 단색/그라데이션)
export const PLAIN_PRESETS: PresetTheme[] = [
  {
    id: 'solid-dark',
    label: '미드나잇',
    thumbnail: '',
    backgroundUrl: '',
    defaultTextColor: '#E8E8F0',
    gradient: 'linear-gradient(135deg, #0A0A0F 0%, #1A1A2E 50%, #16213E 100%)',
  },
  {
    id: 'warm-beige',
    label: '웜 베이지',
    thumbnail: '',
    backgroundUrl: '',
    defaultTextColor: '#3A2E24',
    gradient: 'linear-gradient(135deg, #FAF3E8 0%, #F0E6D4 50%, #E8DCC8 100%)',
  },
  {
    id: 'ocean-blue',
    label: '오션 블루',
    thumbnail: '',
    backgroundUrl: '',
    defaultTextColor: '#F0F8FF',
    gradient: 'linear-gradient(180deg, #0C2340 0%, #1A4B7A 40%, #2E86AB 70%, #5DB7DE 100%)',
  },
  {
    id: 'sunset-gold',
    label: '선셋 골드',
    thumbnail: '',
    backgroundUrl: '',
    defaultTextColor: '#FFFFFF',
    gradient: 'linear-gradient(180deg, #1A0A2E 0%, #5C2D82 30%, #D4587A 60%, #F7941D 90%, #FFD700 100%)',
  },
  {
    id: 'forest-green',
    label: '포레스트',
    thumbnail: '',
    backgroundUrl: '',
    defaultTextColor: '#E8F0EC',
    gradient: 'linear-gradient(180deg, #0D1B0E 0%, #1A3A1C 30%, #2E5A30 60%, #4A7C4C 100%)',
  },
  {
    id: 'soft-pink',
    label: '소프트 핑크',
    thumbnail: '',
    backgroundUrl: '',
    defaultTextColor: '#4A2040',
    gradient: 'linear-gradient(135deg, #FFF0F5 0%, #FFD6E7 30%, #FFC0CB 60%, #FFB3D9 100%)',
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
  textPosition: 'center' as const,
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
  opacity: 0.55,   // 배경 alpha 직접 값 (0=투명, 1=불투명)
  size: 'md' as const,
}

export const APP_NAME = 'Bible Canvas'
export const APP_SLOGAN_EN = 'Your Word. Your Canvas.'
export const APP_SLOGAN_KR = '말씀이 배경이 되는 순간'
export const APP_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://biblecanvas.kr'
