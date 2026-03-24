// src/app/api/verses/route.ts
import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { getChurchSeason } from '@/lib/church-calendar'
import { getVersesBySeason, FEATURED_VERSES } from '@/lib/bible-data'

const client = new Anthropic()

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

    // mood 기반 추천: Claude API 사용
    if (mood) {
      const verseTexts = FEATURED_VERSES.map(v =>
        `[${v.id}] ${v.book} ${v.chapter}:${v.verse} — ${v.text}`
      ).join('\n')

      const message = await client.messages.create({
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
      })

      const text = message.content[0].type === 'text' ? message.content[0].text : ''
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

// ─────────────────────────────────────────────────────
// src/app/api/unsplash/route.ts  (인라인)
// ─────────────────────────────────────────────────────
/*
import { createApi } from 'unsplash-js'
import { NextRequest, NextResponse } from 'next/server'

const unsplash = createApi({ accessKey: process.env.UNSPLASH_ACCESS_KEY! })

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const query = searchParams.get('query') ?? 'peaceful nature'
  const count = Number(searchParams.get('count') ?? 9)
  const orientation = (searchParams.get('orientation') ?? 'portrait') as 'portrait' | 'landscape' | 'squarish'

  try {
    const result = await unsplash.photos.getRandom({ query, count, orientation })
    if (result.errors) throw new Error(result.errors[0])

    const images = (Array.isArray(result.response) ? result.response : [result.response]).map(p => ({
      id: p.id,
      url: p.urls.regular,
      thumbUrl: p.urls.thumb,
      authorName: p.user.name,
      authorUrl: p.user.links.html,
      downloadUrl: p.links.download_location,
    }))

    return NextResponse.json({ images })
  } catch (error) {
    return NextResponse.json({ error: 'Unsplash 이미지 로드 실패' }, { status: 500 })
  }
}
*/
