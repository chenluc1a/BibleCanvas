// src/lib/church-calendar.ts
import type { ChurchSeason } from '@/types'

/** 서방 교회 부활절 계산 (Anonymous Gregorian algorithm) */
export function getEasterDate(year: number): Date {
  const a = year % 19
  const b = Math.floor(year / 100)
  const c = year % 100
  const d = Math.floor(b / 4)
  const e = b % 4
  const f = Math.floor((b + 8) / 25)
  const g = Math.floor((b - f + 1) / 3)
  const h = (19 * a + b - d - g + 15) % 30
  const i = Math.floor(c / 4)
  const k = c % 4
  const l = (32 + 2 * e + 2 * i - h - k) % 7
  const m = Math.floor((a + 11 * h + 22 * l) / 451)
  const month = Math.floor((h + l - 7 * m + 114) / 31) - 1 // 0-indexed
  const day = ((h + l - 7 * m + 114) % 31) + 1
  return new Date(year, month, day)
}

export interface ChurchCalendarInfo {
  season: ChurchSeason
  label: string
  daysRemaining?: number
  color: string  // 전례색
}

export function getChurchSeason(date: Date = new Date()): ChurchCalendarInfo {
  const year = date.getFullYear()
  const month = date.getMonth() // 0-indexed
  const day = date.getDate()

  const easter = getEasterDate(year)
  const easterTime = easter.getTime()
  const dateTime = date.getTime()
  const msPerDay = 86400000

  // 부활절 기준 일수 차이
  const daysFromEaster = Math.round((dateTime - easterTime) / msPerDay)

  // 성탄절 기준
  const christmas = new Date(year, 11, 25) // 12/25
  const daysFromChristmas = Math.round((dateTime - christmas.getTime()) / msPerDay)

  // 대림절 시작: 성탄절 전 4번째 일요일
  const adventStart = getAdventStart(year)
  const daysFromAdvent = Math.round((dateTime - adventStart.getTime()) / msPerDay)

  // 추수감사절: 11월 셋째 주 일요일
  const thanksgiving = getKoreanThanksgiving(year)
  const isThanksgivingWeek = Math.abs(Math.round((dateTime - thanksgiving.getTime()) / msPerDay)) <= 3

  // 절기 판단 순서
  if (daysFromEaster === 0) {
    return { season: '부활절', label: '부활주일', color: '#FFFFFF', daysRemaining: 0 }
  }
  if (daysFromEaster > 0 && daysFromEaster < 49) {
    return { season: '부활절', label: '부활절기', color: '#FFFFFF', daysRemaining: 49 - daysFromEaster }
  }
  if (daysFromEaster === 49) {
    return { season: '성령강림절', label: '성령강림주일', color: '#FF0000', daysRemaining: 0 }
  }
  if (daysFromEaster === -7) {
    return { season: '종려주일', label: '종려주일', color: '#8B0000', daysRemaining: 0 }
  }
  if (daysFromEaster === -3) {
    return { season: '성목요일', label: '성목요일', color: '#8B0000', daysRemaining: 0 }
  }
  if (daysFromEaster === -2) {
    return { season: '성금요일', label: '성금요일', color: '#000000', daysRemaining: 0 }
  }
  if (daysFromEaster < 0 && daysFromEaster >= -46) {
    const remaining = Math.abs(daysFromEaster)
    return { season: '사순절', label: `사순절 (D-${remaining})`, color: '#800080', daysRemaining: remaining }
  }
  if (daysFromAdvent >= 0 && daysFromAdvent < 28) {
    return { season: '대림절', label: '대림절기', color: '#800080', daysRemaining: 28 - daysFromAdvent }
  }
  if (daysFromChristmas >= 0 && daysFromChristmas < 12) {
    return { season: '성탄절', label: '성탄절기', color: '#FFFFFF', daysRemaining: 0 }
  }
  if (month === 0 && day <= 19) {
    return { season: '주현절', label: '주현절기', color: '#008000', daysRemaining: 19 - day }
  }
  if (isThanksgivingWeek) {
    return { season: '추수감사절', label: '추수감사절', color: '#FFA500', daysRemaining: 0 }
  }

  return { season: '일반', label: '연중 주일', color: '#008000' }
}

function getAdventStart(year: number): Date {
  const christmas = new Date(year, 11, 25)
  const christmasDay = christmas.getDay() // 0=Sun
  const daysToLastSunday = christmasDay === 0 ? 0 : christmasDay
  const lastSundayBeforeChristmas = new Date(year, 11, 25 - daysToLastSunday)
  const adventStart = new Date(lastSundayBeforeChristmas)
  adventStart.setDate(adventStart.getDate() - 21) // 3 more Sundays back
  return adventStart
}

function getKoreanThanksgiving(year: number): Date {
  // 11월 셋째 주 일요일
  const nov1 = new Date(year, 10, 1)
  const firstSunday = nov1.getDay() === 0 ? 1 : 8 - nov1.getDay()
  return new Date(year, 10, firstSunday + 14)
}

export function getMonthVerseTheme(date: Date = new Date()): string {
  const season = getChurchSeason(date)
  const themes: Record<ChurchSeason, string> = {
    '대림절': '기다림과 소망의 말씀을 준비했습니다',
    '성탄절': '기쁜 성탄의 말씀을 준비했습니다',
    '주현절': '빛과 계시의 말씀을 준비했습니다',
    '사순절': '회개와 묵상의 말씀을 준비했습니다',
    '종려주일': '주님의 예루살렘 입성을 기념하는 말씀입니다',
    '성목요일': '최후의 만찬을 묵상하는 말씀입니다',
    '성금요일': '십자가의 사랑을 묵상하는 말씀입니다',
    '부활절': '부활의 기쁨과 새 생명의 말씀입니다',
    '성령강림절': '성령님의 임재와 능력의 말씀입니다',
    '추수감사절': '감사와 풍성함의 말씀을 준비했습니다',
    '일반': '오늘 하루를 위한 말씀을 준비했습니다',
  }
  return themes[season.season]
}
