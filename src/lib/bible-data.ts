// src/lib/bible-data.ts
// 핵심 구절 샘플 DB — 실제 배포 시 전체 성경 DB로 교체
import type { BibleVerse, ChurchSeason, VerseLang } from '@/types'

export const FEATURED_VERSES: BibleVerse[] = [
  // ─── 사랑 ─────────────────────────────────────────
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
  {
    id: '1jn-4-8', book: '요한일서', bookEn: '1 John', chapter: 4, verse: 8,
    text: '사랑하지 아니하는 자는 하나님을 알지 못하나니 이는 하나님은 사랑이심이라',
    textEn: 'Whoever does not love does not know God, because God is love.',
    translation: 'NKRV', tags: ['사랑', '하나님'], season: '일반'
  },
  {
    id: 'ro-5-8', book: '로마서', bookEn: 'Romans', chapter: 5, verse: 8,
    text: '우리가 아직 죄인 되었을 때에 그리스도께서 우리를 위하여 죽으심으로 하나님께서 우리에 대한 자기의 사랑을 확증하셨느니라',
    textEn: 'But God demonstrates his own love for us in this: While we were still sinners, Christ died for us.',
    translation: 'NKRV', tags: ['사랑', '구원', '은혜'], season: '사순절'
  },

  // ─── 위로 ─────────────────────────────────────────
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
  {
    id: 'is-41-10', book: '이사야', bookEn: 'Isaiah', chapter: 41, verse: 10,
    text: '두려워하지 말라 내가 너와 함께 함이라 놀라지 말라 나는 네 하나님이 됨이라 내가 너를 굳세게 하리라 참으로 너를 도와 주리라 참으로 나의 의로운 오른손으로 너를 붙들리라',
    textEn: 'So do not fear, for I am with you; do not be dismayed, for I am your God. I will strengthen you and help you; I will uphold you with my righteous right hand.',
    translation: 'NKRV', tags: ['위로', '두려움', '동행'], season: '일반'
  },
  {
    id: 'ps-46-10', book: '시편', bookEn: 'Psalms', chapter: 46, verse: 10,
    text: '이르시기를 너희는 가만히 있어 내가 하나님 됨을 알지어다 내가 뭇 나라 중에서 높임을 받으리라 내가 세계 중에서 높임을 받으리라 하시도다',
    textEn: 'He says, "Be still, and know that I am God; I will be exalted among the nations, I will be exalted in the earth."',
    translation: 'NKRV', tags: ['위로', '신뢰', '평안'], season: '일반'
  },

  // ─── 소망 / 믿음 ───────────────────────────────────
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
  {
    id: 'heb-11-1', book: '히브리서', bookEn: 'Hebrews', chapter: 11, verse: 1,
    text: '믿음은 바라는 것들의 실상이요 보이지 않는 것들의 증거니',
    textEn: 'Now faith is confidence in what we hope for and assurance about what we do not see.',
    translation: 'NKRV', tags: ['믿음', '소망'], season: '일반'
  },
  {
    id: 'pr-3-5', book: '잠언', bookEn: 'Proverbs', chapter: 3, verse: 5,
    text: '너는 마음을 다하여 여호와를 신뢰하고 네 명철을 의지하지 말라 너는 범사에 그를 인정하라 그리하면 네 길을 지도하시리라',
    textEn: 'Trust in the LORD with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.',
    translation: 'NKRV', tags: ['신뢰', '인도', '지혜'], season: '일반'
  },
  {
    id: 'ps-27-1', book: '시편', bookEn: 'Psalms', chapter: 27, verse: 1,
    text: '여호와는 나의 빛이요 나의 구원이시니 내가 누구를 두려워하리요 여호와는 내 생명의 능력이시니 내가 누구를 무서워하리요',
    textEn: 'The LORD is my light and my salvation — whom shall I fear? The LORD is the stronghold of my life — of whom shall I be afraid?',
    translation: 'NKRV', tags: ['믿음', '용기', '구원'], season: '일반'
  },

  // ─── 은혜 / 구원 ───────────────────────────────────
  {
    id: 'eph-2-8', book: '에베소서', bookEn: 'Ephesians', chapter: 2, verse: 8,
    text: '너희는 그 은혜에 의하여 믿음으로 말미암아 구원을 받았으니 이것은 너희에게서 난 것이 아니요 하나님의 선물이라',
    textEn: 'For it is by grace you have been saved, through faith — and this is not from yourselves, it is the gift of God.',
    translation: 'NKRV', tags: ['은혜', '구원', '믿음'], season: '일반'
  },
  {
    id: 'gal-2-20', book: '갈라디아서', bookEn: 'Galatians', chapter: 2, verse: 20,
    text: '내가 그리스도와 함께 십자가에 못 박혔나니 그런즉 이제는 내가 사는 것이 아니요 오직 내 안에 그리스도께서 사시는 것이라',
    textEn: 'I have been crucified with Christ and I no longer live, but Christ lives in me.',
    translation: 'NKRV', tags: ['십자가', '구원', '새삶'], season: '성금요일'
  },
  {
    id: '2co-5-17', book: '고린도후서', bookEn: '2 Corinthians', chapter: 5, verse: 17,
    text: '그런즉 누구든지 그리스도 안에 있으면 새로운 피조물이라 이전 것은 지나갔으니 보라 새 것이 되었도다',
    textEn: 'Therefore, if anyone is in Christ, the new creation has come: The old has gone, the new is here!',
    translation: 'NKRV', tags: ['새삶', '구원', '변화'], season: '부활절'
  },

  // ─── 감사 / 기쁨 ───────────────────────────────────
  {
    id: '1th-5-18', book: '데살로니가전서', bookEn: '1 Thessalonians', chapter: 5, verse: 18,
    text: '범사에 감사하라 이것이 그리스도 예수 안에서 너희를 향하신 하나님의 뜻이니라',
    textEn: 'Give thanks in all circumstances; for this is God\'s will for you in Christ Jesus.',
    translation: 'NKRV', tags: ['감사', '뜻'], season: '추수감사절'
  },
  {
    id: 'ph-4-4', book: '빌립보서', bookEn: 'Philippians', chapter: 4, verse: 4,
    text: '주 안에서 항상 기뻐하라 내가 다시 말하노니 기뻐하라',
    textEn: 'Rejoice in the Lord always. I will say it again: Rejoice!',
    translation: 'NKRV', tags: ['기쁨', '감사'], season: '일반'
  },
  {
    id: 'ps-37-4', book: '시편', bookEn: 'Psalms', chapter: 37, verse: 4,
    text: '또 여호와를 기뻐하라 그가 네 마음의 소원을 네게 이루어 주시리로다',
    textEn: 'Take delight in the LORD, and he will give you the desires of your heart.',
    translation: 'NKRV', tags: ['기쁨', '소망', '기도'], season: '일반'
  },
  {
    id: 'ro-12-12', book: '로마서', bookEn: 'Romans', chapter: 12, verse: 12,
    text: '소망 중에 즐거워하며 환난 중에 참으며 기도에 항상 힘쓰며',
    textEn: 'Be joyful in hope, patient in affliction, faithful in prayer.',
    translation: 'NKRV', tags: ['소망', '기쁨', '기도'], season: '일반'
  },

  // ─── 기도 / 말씀 ───────────────────────────────────
  {
    id: 'mt-6-33', book: '마태복음', bookEn: 'Matthew', chapter: 6, verse: 33,
    text: '그런즉 너희는 먼저 그의 나라와 그의 의를 구하라 그리하면 이 모든 것을 너희에게 더하시리라',
    textEn: 'But seek first his kingdom and his righteousness, and all these things will be given to you as well.',
    translation: 'NKRV', tags: ['기도', '신뢰', '우선순위'], season: '일반'
  },
  {
    id: 'jn-14-6', book: '요한복음', bookEn: 'John', chapter: 14, verse: 6,
    text: '예수께서 이르시되 내가 곧 길이요 진리요 생명이니 나로 말미암지 않고는 아버지께로 올 자가 없느니라',
    textEn: 'Jesus answered, "I am the way and the truth and the life. No one comes to the Father except through me."',
    translation: 'NKRV', tags: ['구원', '진리', '생명'], season: '일반'
  },
  {
    id: 'rv-3-20', book: '요한계시록', bookEn: 'Revelation', chapter: 3, verse: 20,
    text: '볼지어다 내가 문 밖에 서서 두드리노니 누구든지 내 음성을 듣고 문을 열면 내가 그에게로 들어가 그와 더불어 먹고 그는 나와 더불어 먹으리라',
    textEn: 'Here I am! I stand at the door and knock. If anyone hears my voice and opens the door, I will come in and eat with that person, and they with me.',
    translation: 'NKRV', tags: ['초대', '교제', '구원'], season: '일반'
  },
  {
    id: 'lk-1-37', book: '누가복음', bookEn: 'Luke', chapter: 1, verse: 37,
    text: '대저 하나님의 모든 말씀은 능하지 못하심이 없느니라',
    textEn: 'For no word from God will ever fail.',
    translation: 'NKRV', tags: ['믿음', '하나님', '능력'], season: '대림절'
  },

  // ─── 절기 ──────────────────────────────────────────
  {
    id: 'lk-2-11', book: '누가복음', bookEn: 'Luke', chapter: 2, verse: 11,
    text: '오늘 다윗의 동네에 너희를 위하여 구주가 나셨으니 곧 그리스도 주시니라',
    textEn: 'Today in the town of David a Savior has been born to you; he is the Messiah, the Lord.',
    translation: 'NKRV', tags: ['성탄', '구주', '탄생'], season: '성탄절'
  },
  {
    id: 'jn-11-25', book: '요한복음', bookEn: 'John', chapter: 11, verse: 25,
    text: '예수께서 이르시되 나는 부활이요 생명이니 나를 믿는 자는 죽어도 살겠고',
    textEn: 'Jesus said to her, "I am the resurrection and the life. The one who believes in me will live, even though they die."',
    translation: 'NKRV', tags: ['부활', '생명', '믿음'], season: '부활절'
  },

  // ─── 새해 / 용기 ───────────────────────────────────
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
  {
    id: 'jos-1-9', book: '여호수아', bookEn: 'Joshua', chapter: 1, verse: 9,
    text: '내가 네게 명령한 것이 아니냐 강하고 담대하라 두려워하지 말며 놀라지 말라 네가 어디로 가든지 네 하나님 여호와가 너와 함께 하느니라',
    textEn: 'Have I not commanded you? Be strong and courageous. Do not be afraid; do not be discouraged, for the LORD your God will be with you wherever you go.',
    translation: 'NKRV', tags: ['용기', '담대함', '동행'], season: '일반'
  },
  {
    id: 'ps-121-1', book: '시편', bookEn: 'Psalms', chapter: 121, verse: 1,
    text: '내가 산을 향하여 눈을 들리라 나의 도움이 어디서 올까 나의 도움은 천지를 만드신 여호와에게서로다',
    textEn: 'I lift up my eyes to the mountains — where does my help come from? My help comes from the LORD, the Maker of heaven and earth.',
    translation: 'NKRV', tags: ['도움', '신뢰', '창조주'], season: '일반'
  },
]

// 절기별 추천 구절
export const SEASON_VERSES: Record<ChurchSeason, string[]> = {
  '대림절':     ['lk-1-37', 'jn-3-16', 'is-40-31'],
  '성탄절':     ['lk-2-11', 'jn-3-16'],
  '주현절':     ['jn-14-6', 'jn-15-12'],
  '사순절':     ['mt-11-28', 'ps-23-1', 'ro-5-8'],
  '종려주일':   ['ps-23-1', 'ps-27-1'],
  '성목요일':   ['jn-15-12'],
  '성금요일':   ['ro-8-28', 'gal-2-20'],
  '부활절':     ['jn-11-25', '2co-5-17'],
  '성령강림절': ['ph-4-13', 'ro-8-28'],
  '추수감사절': ['1th-5-18', 'ro-8-28', 'ps-37-4'],
  '일반':       ['jn-3-16', 'ps-23-1', 'jer-29-11', 'ph-4-13', 'is-40-31', 'pr-3-5'],
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
