// src/lib/bible-data.ts
// 핵심 구절 샘플 DB — 실제 배포 시 전체 성경 DB로 교체
import type { BibleVerse, ChurchSeason, VerseLang } from '@/types'

export const FEATURED_VERSES: BibleVerse[] = [
  // 사랑
  {
    id: 'jn-3-16', book: '요한복음', bookEn: 'John', chapter: 3, verse: 16,
    text: '하나님이 세상을 이처럼 사랑하사 독생자를 주셨으니 이는 그를 믿는 자마다 멸망하지 않고 영생을 얻게 하려 하심이라',
    textEn: 'For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.',
    translation: 'NKRV', tags: ['사랑', '구원', '영생'], season: '일반'
  },
  {
    id: 'jn-15-12', book: '요한복음', bookEn: 'John', chapter: 15, verse: 12,
    text: '내 계명은 곧 내가 너희를 사랑한 것같이 너희도 서로 사랑하라 하는 이것이니라',
    textEn: 'My command is this: Love each other as I have loved you.',
    translation: 'NKRV', tags: ['사랑', '계명'], season: '일반'
  },
  {
    id: '1co-13-4', book: '고린도전서', bookEn: '1 Corinthians', chapter: 13, verse: 4,
    text: '사랑은 오래 참고 사랑은 온유하며 시기하지 아니하며 사랑은 자랑하지 아니하며 교만하지 아니하며',
    textEn: 'Love is patient, love is kind. It does not envy, it does not boast, it is not proud.',
    translation: 'NKRV', tags: ['사랑', '덕목'], season: '일반'
  },
  // 위로
  {
    id: 'ps-23-1', book: '시편', bookEn: 'Psalms', chapter: 23, verse: 1,
    text: '여호와는 나의 목자시니 내게 부족함이 없으리로다',
    textEn: 'The LORD is my shepherd, I lack nothing.',
    translation: 'NKRV', tags: ['위로', '신뢰', '목자'], season: '일반'
  },
  {
    id: 'is-40-31', book: '이사야', bookEn: 'Isaiah', chapter: 40, verse: 31,
    text: '오직 여호와를 앙망하는 자는 새 힘을 얻으리니 독수리가 날개치며 올라감같을 것이요 달음박질하여도 곤비하지 아니하겠고 걸어가도 피곤하지 아니하리로다',
    textEn: 'But those who hope in the LORD will renew their strength. They will soar on wings like eagles; they will run and not grow weary, they will walk and not be faint.',
    translation: 'NKRV', tags: ['위로', '힘', '소망'], season: '일반'
  },
  {
    id: 'mt-11-28', book: '마태복음', bookEn: 'Matthew', chapter: 11, verse: 28,
    text: '수고하고 무거운 짐 진 자들아 다 내게로 오라 내가 너희를 쉬게 하리라',
    textEn: 'Come to me, all you who are weary and burdened, and I will give you rest.',
    translation: 'NKRV', tags: ['위로', '쉼', '초대'], season: '일반'
  },
  // 믿음 / 소망
  {
    id: 'jer-29-11', book: '예레미야', bookEn: 'Jeremiah', chapter: 29, verse: 11,
    text: '여호와의 말씀이니라 너희를 향한 나의 생각을 내가 아나니 평안이요 재앙이 아니니라 너희에게 미래와 희망을 주는 것이니라',
    textEn: '"For I know the plans I have for you," declares the LORD, "plans to prosper you and not to harm you, plans to give you hope and a future."',
    translation: 'NKRV', tags: ['소망', '미래', '계획'], season: '일반'
  },
  {
    id: 'ph-4-13', book: '빌립보서', bookEn: 'Philippians', chapter: 4, verse: 13,
    text: '내게 능력 주시는 자 안에서 내가 모든 것을 할 수 있느니라',
    textEn: 'I can do all this through him who gives me strength.',
    translation: 'NKRV', tags: ['능력', '믿음', '자신감'], season: '일반'
  },
  {
    id: 'ro-8-28', book: '로마서', bookEn: 'Romans', chapter: 8, verse: 28,
    text: '우리가 알거니와 하나님을 사랑하는 자 곧 그의 뜻대로 부르심을 입은 자들에게는 모든 것이 합력하여 선을 이루느니라',
    textEn: 'And we know that in all things God works for the good of those who love him, who have been called according to his purpose.',
    translation: 'NKRV', tags: ['섭리', '신뢰', '선'], season: '일반'
  },
  // 감사
  {
    id: '1th-5-18', book: '데살로니가전서', bookEn: '1 Thessalonians', chapter: 5, verse: 18,
    text: '범사에 감사하라 이것이 그리스도 예수 안에서 너희를 향하신 하나님의 뜻이니라',
    textEn: 'Give thanks in all circumstances; for this is God\'s will for you in Christ Jesus.',
    translation: 'NKRV', tags: ['감사', '뜻'], season: '추수감사절'
  },
  // 성탄
  {
    id: 'lk-2-11', book: '누가복음', bookEn: 'Luke', chapter: 2, verse: 11,
    text: '오늘 다윗의 동네에 너희를 위하여 구주가 나셨으니 곧 그리스도 주시니라',
    textEn: 'Today in the town of David a Savior has been born to you; he is the Messiah, the Lord.',
    translation: 'NKRV', tags: ['성탄', '구주', '탄생'], season: '성탄절'
  },
  // 부활
  {
    id: 'jn-11-25', book: '요한복음', bookEn: 'John', chapter: 11, verse: 25,
    text: '예수께서 이르시되 나는 부활이요 생명이니 나를 믿는 자는 죽어도 살겠고',
    textEn: 'Jesus said to her, "I am the resurrection and the life. The one who believes in me will live, even though they die."',
    translation: 'NKRV', tags: ['부활', '생명', '믿음'], season: '부활절'
  },
  // 새해
  {
    id: 'lm-3-23', book: '예레미야애가', bookEn: 'Lamentations', chapter: 3, verse: 23,
    text: '이것들이 아침마다 새로우니 주의 성실하심이 크시도소이다',
    textEn: 'They are new every morning; great is your faithfulness.',
    translation: 'NKRV', tags: ['새벽', '새해', '성실'], season: '일반'
  },
  {
    id: 'dt-31-6', book: '신명기', bookEn: 'Deuteronomy', chapter: 31, verse: 6,
    text: '강하고 담대하라 두려워하지 말라 그들 앞에서 떨지 말라 이는 네 하나님 여호와 그가 너와 함께 가시며 결코 너를 떠나지 아니하시며 버리지 아니하실 것임이니라',
    textEn: 'Be strong and courageous. Do not be afraid or terrified because of them, for the LORD your God goes with you; he will never leave you nor forsake you.',
    translation: 'NKRV', tags: ['용기', '동행', '새해'], season: '일반'
  },
]

// 절기별 추천 구절
export const SEASON_VERSES: Record<ChurchSeason, string[]> = {
  '대림절':     ['jn-3-16', 'is-40-31'],
  '성탄절':     ['lk-2-11'],
  '주현절':     ['jn-15-12'],
  '사순절':     ['mt-11-28', 'ps-23-1'],
  '종려주일':   ['ps-23-1'],
  '성목요일':   ['jn-15-12'],
  '성금요일':   ['ro-8-28'],
  '부활절':     ['jn-11-25'],
  '성령강림절': ['ph-4-13'],
  '추수감사절': ['1th-5-18', 'ro-8-28'],
  '일반':       ['jn-3-16', 'ps-23-1', 'jer-29-11', 'ph-4-13', 'is-40-31'],
}

export function getVerseById(id: string): BibleVerse | undefined {
  return FEATURED_VERSES.find(v => v.id === id)
}

export function getVersesBySeason(season: ChurchSeason): BibleVerse[] {
  const ids = SEASON_VERSES[season] ?? SEASON_VERSES['일반']
  return ids.map(id => getVerseById(id)).filter(Boolean) as BibleVerse[]
}

export function getVersesByTags(tags: string[]): BibleVerse[] {
  return FEATURED_VERSES.filter(v => tags.some(t => v.tags.includes(t)))
}

export function formatVerseRef(verse: BibleVerse, lang: VerseLang = 'ko'): string {
  if (lang === 'en') {
    return `${verse.bookEn} ${verse.chapter}:${verse.verse}`
  }
  return `${verse.book} ${verse.chapter}:${verse.verse}`
}
