// src/app/api/verses/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { getChurchSeason } from '@/lib/church-calendar'
import { getVersesBySeason, FEATURED_VERSES } from '@/lib/bible-data'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { mood, keyword, date } = body

    const targetDate = date ? new Date(date) : new Date()
    const seasonInfo = getChurchSeason(targetDate)
    const seasonVerses = getVersesBySeason(seasonInfo.season)

    // keyword 검색은 로컬 DB에서 처리
    if (keyword) {
      const filtered = FEATURED_VERSES.filter(v =>
        v.text.includes(keyword) ||
        v.tags.some(t => t.includes(keyword)) ||
        v.book.includes(keyword)
      )
      return NextResponse.json({
        verses: filtered.slice(0, 5),
        season: seasonInfo.season,
        message: `'${keyword}' 관련 말씀입니다`
      })
    }

    // mood 기반 추천: Claude API 사용 (API 키가 있을 때만)
    if (mood && process.env.ANTHROPIC_API_KEY) {
      try {
        const verseTexts = FEATURED_VERSES.map(v =>
          `[${v.id}] ${v.book} ${v.chapter}:${v.verse} — ${v.text}`
        ).join('\n')

        const res = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': process.env.ANTHROPIC_API_KEY,
            'anthropic-version': '2023-06-01',
          },
          body: JSON.stringify({
            model: 'claude-sonnet-4-20250514',
            max_tokens: 500,
            messages: [{
              role: 'user',
              content: `다음 성경 구절 목록에서 "${mood}" 분위기/상황에 가장 적합한 구절 3개를 골라주세요.
절기: ${seasonInfo.season}

구절 목록:
${verseTexts}

응답은 반드시 다음 JSON 형식으로만 해주세요:
{"ids": ["id1", "id2", "id3"], "reason": "선택 이유 한 문장"}`
            }]
          }),
        })

        if (res.ok) {
          const data = await res.json()
          const text = data.content?.[0]?.type === 'text' ? data.content[0].text : ''
          const parsed = JSON.parse(text)
          const selected = parsed.ids
            .map((id: string) => FEATURED_VERSES.find(v => v.id === id))
            .filter(Boolean)

          return NextResponse.json({
            verses: selected,
            season: seasonInfo.season,
            message: parsed.reason
          })
        }
      } catch (aiError) {
        console.warn('[verses API] AI 추천 실패, 절기 기반으로 대체:', aiError)
      }
    }

    // mood가 있지만 AI 불가능 → 태그 기반 필터링
    if (mood) {
      const filtered = FEATURED_VERSES.filter(v =>
        v.tags.some(t => t.includes(mood))
      )
      if (filtered.length > 0) {
        return NextResponse.json({
          verses: filtered.slice(0, 5),
          season: seasonInfo.season,
          message: `'${mood}' 분위기에 어울리는 말씀입니다`
        })
      }
    }

    // 기본: 절기별 추천
    return NextResponse.json({
      verses: seasonVerses,
      season: seasonInfo.season,
      message: seasonInfo.label + '에 어울리는 말씀을 준비했습니다'
    })

  } catch (error) {
    console.error('[verses API]', error)
    return NextResponse.json({ error: '말씀 추천 중 오류가 발생했습니다' }, { status: 500 })
  }
}
