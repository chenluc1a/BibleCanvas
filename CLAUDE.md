# CLAUDE.md — Bible Canvas

> AI 컨텍스트 파일. 이 파일을 읽으면 프로젝트의 모든 맥락을 파악할 수 있다.

---

## 프로젝트 개요

**서비스명**: Bible Canvas  
**슬로건**: *Your Word. Your Canvas.* / *말씀이 배경이 되는 순간*  
**도메인 후보**: biblecanvas.kr / biblecanvas.app  
**카테고리**: 성경 말씀 배경화면 생성기 (웹 + 모바일 반응형)  
**타겟**: 한국 개신교 신자, SNS 활동 청년부, 소그룹 리더, 교회 미디어팀  

---

## 핵심 기능 목록

### Phase 1 — MVP (4주)
| 기능 | 설명 |
|---|---|
| 말씀 선택 | 절기·날짜 자동 추천 + 직접 입력 + 한국성경 검색 |
| 무료 이미지 배경 | Unsplash API 랜덤 추천 (카테고리: 자연/하늘/꽃/빛) |
| 사진 업로드 | 사용자 직접 사진 업로드 (JPEG/PNG/HEIC, 최대 10MB) |
| 스타일 설정 | 폰트 6종 + 텍스트 색상 + 그림자 + 정렬 |
| 달력 토글 | 월간 미니 달력 on/off + 위치 선택 |
| 다운로드 | 스토리(9:16) / 피드(1:1) / PC(16:9) / 카카오(640×640) |
| 공유 | 링크 공유 + 카카오톡 공유 + 인스타그램 스토리 |

### Phase 2 — v1.1 (MVP + 2주)
| 기능 | 설명 |
|---|---|
| AI 배경 생성 | Claude API → Stable Diffusion 또는 DALL-E 3 프롬프트 생성 |
| 절기 자동 감지 | 교회력 DB 기반 현재 절기 배너 |
| 즐겨찾기 | 로컬스토리지 기반 구절 저장 |
| 소그룹 공유 팩 | 같은 테마 이미지 묶음 다운로드 |

### Phase 3 — v2.0
| 기능 | 설명 |
|---|---|
| 회원 기능 | Supabase Auth (Google/카카오 소셜 로그인) |
| 나의 컬렉션 | 생성 이력 저장 |
| 커뮤니티 갤러리 | 공개 배경화면 갤러리 + 좋아요 |
| Pro 티어 | AI 생성 무제한 + 고해상도 + 워터마크 제거 |

---

## 기술 스택

```
Frontend:   Next.js 14 (App Router) + TypeScript
Styling:    Tailwind CSS + shadcn/ui 일부
Canvas:     Fabric.js (배경화면 편집) + html2canvas (PNG 렌더링)
Backend:    Next.js API Routes (서버리스)
DB:         Supabase (Phase 3부터)
Image API:  Unsplash API (무료 이미지)
AI:         Anthropic Claude API (구절 추천 + AI 프롬프트 생성)
Bible API:  공개 한국성경 API (또는 자체 JSON DB)
Storage:    Vercel Blob (업로드 이미지 임시 저장)
Deploy:     Vercel
Analytics:  Vercel Analytics
```

---

## 디렉토리 구조

```
bible-canvas/
├── CLAUDE.md                    ← 이 파일
├── .env.local                   ← 환경변수 (git 제외)
├── .env.example                 ← 환경변수 템플릿
├── package.json
├── tailwind.config.ts
├── next.config.ts
│
├── public/
│   ├── fonts/                   ← 한국어 폰트 파일
│   └── og-image.png             ← OG 이미지
│
├── src/
│   ├── app/
│   │   ├── layout.tsx           ← Root layout (메타데이터 포함)
│   │   ├── page.tsx             ← 메인 에디터 페이지
│   │   ├── globals.css
│   │   └── api/
│   │       ├── verses/
│   │       │   └── route.ts     ← 말씀 추천 API (Claude 연동)
│   │       ├── unsplash/
│   │       │   └── route.ts     ← Unsplash 이미지 API 프록시
│   │       ├── ai-background/
│   │       │   └── route.ts     ← AI 배경 생성 API
│   │       └── share/
│   │           └── route.ts     ← 공유 링크 생성
│   │
│   ├── components/
│   │   ├── editor/
│   │   │   ├── CanvasPreview.tsx      ← 중앙 캔버스 미리보기
│   │   │   ├── VersePanel.tsx         ← 말씀 선택 패널
│   │   │   ├── BackgroundPanel.tsx    ← 배경 선택 패널
│   │   │   ├── StylePanel.tsx         ← 폰트/색상/정렬 패널
│   │   │   ├── CalendarPanel.tsx      ← 달력 설정 패널
│   │   │   └── ExportPanel.tsx        ← 다운로드/공유 패널
│   │   ├── ui/
│   │   │   ├── SizeSelector.tsx       ← 출력 사이즈 탭
│   │   │   ├── ImageUploader.tsx      ← 사진 업로드 드래그앤드롭
│   │   │   ├── ColorPicker.tsx        ← 색상 선택기
│   │   │   └── Toggle.tsx             ← 토글 스위치
│   │   └── layout/
│   │       ├── Header.tsx
│   │       └── MobileSidebar.tsx      ← 모바일 바텀시트
│   │
│   ├── hooks/
│   │   ├── useCanvas.ts               ← Fabric.js 캔버스 로직
│   │   ├── useUnsplash.ts             ← Unsplash API 훅
│   │   ├── useVerses.ts               ← 말씀 데이터 훅
│   │   └── useExport.ts               ← PNG 내보내기 훅
│   │
│   ├── lib/
│   │   ├── bible-data.ts              ← 한국 성경 구절 JSON DB
│   │   ├── church-calendar.ts         ← 교회력 절기 계산
│   │   ├── canvas-renderer.ts         ← 서버사이드 이미지 렌더링
│   │   ├── share.ts                   ← 공유 유틸
│   │   └── constants.ts              ← 전역 상수
│   │
│   ├── store/
│   │   └── editor.ts                  ← Zustand 전역 상태
│   │
│   └── types/
│       └── index.ts                   ← TypeScript 타입 정의
```

---

## 환경변수 (.env.local)

```bash
# Unsplash
UNSPLASH_ACCESS_KEY=your_key_here

# Anthropic (말씀 추천 + AI 배경)
ANTHROPIC_API_KEY=your_key_here

# Vercel Blob (이미지 업로드)
BLOB_READ_WRITE_TOKEN=your_key_here

# 공유 링크 베이스 URL
NEXT_PUBLIC_BASE_URL=https://biblecanvas.kr

# Kakao (공유)
NEXT_PUBLIC_KAKAO_JS_KEY=your_key_here
```

---

## 출력 사이즈 스펙

```typescript
export const OUTPUT_SIZES = {
  story:   { width: 1080, height: 1920, label: '스토리 (9:16)',    platform: 'Instagram/카카오' },
  feed:    { width: 1080, height: 1080, label: '피드 (1:1)',       platform: 'Instagram/Facebook' },
  pc:      { width: 1920, height: 1080, label: 'PC 바탕화면',      platform: 'Windows/Mac' },
  mobile:  { width: 1170, height: 2532, label: '모바일 배경 (iPhone 14)' },
  kakao:   { width:  640, height:  640, label: '카카오 프로필',    platform: 'KakaoTalk' },
  youtube: { width: 2560, height: 1440, label: 'YouTube 배너',     platform: 'YouTube' },
} as const
```

---

## 배경 이미지 소스 우선순위

1. **사용자 직접 업로드** — JPEG/PNG/HEIC, 최대 10MB, Vercel Blob에 임시 저장
2. **Unsplash 무료 이미지** — 카테고리: `nature`, `sky`, `light`, `flower`, `landscape`
3. **AI 생성 배경** (Phase 2) — Claude로 분위기 프롬프트 생성 → DALL-E 3 API 호출
4. **프리셋 테마** — 번들된 감성 배경 6종 (이른봄/새벽안개/저녁기도/깊은숲/린넨빛/새하얀)

---

## 한국 성경 데이터 구조

```typescript
interface BibleVerse {
  id: string
  book: string          // "요한복음"
  bookEn: string        // "John"
  chapter: number       // 3
  verse: number         // 16
  text: string          // "하나님이 세상을 이처럼 사랑하사..."
  translation: string   // "개역개정" | "새번역" | "공동번역"
  tags: string[]        // ["사랑", "구원", "은혜"]
  season?: string       // "사순절" | "성탄" | "추수감사"
}
```

---

## 교회력 절기 목록 (church-calendar.ts)

```typescript
// 주요 절기 계산 로직
// - 부활절: 서방 교회 계산법 (Gregorian)
// - 사순절: 부활절 46일 전
// - 성탄절: 12/25 고정
// - 대림절: 성탄절 전 4번째 일요일부터
// - 추수감사절: 11월 셋째 주 일요일 (한국 교회 관습)
// - 성령강림절: 부활절 후 50일
```

---

## API 엔드포인트 스펙

### POST /api/verses
말씀 추천 (Claude API 사용)
```typescript
// Request
{ mood?: string, season?: string, date?: string, keyword?: string }

// Response
{ verses: BibleVerse[], season: string, message: string }
```

### GET /api/unsplash
Unsplash 이미지 검색
```typescript
// Query params
?query=nature&count=9&orientation=portrait

// Response
{ images: UnsplashImage[] }
```

### POST /api/ai-background
AI 배경 프롬프트 생성 (Phase 2)
```typescript
// Request
{ verse: string, mood: string, style: string }

// Response
{ imageUrl: string, prompt: string }
```

### POST /api/share
공유 링크 생성
```typescript
// Request
{ canvasState: CanvasState }

// Response
{ shareUrl: string, expiresAt: string }
```

---

## 전역 상태 (Zustand)

```typescript
interface EditorState {
  // 말씀
  verse: BibleVerse | null
  customText: string

  // 배경
  backgroundType: 'preset' | 'unsplash' | 'upload' | 'ai'
  backgroundUrl: string
  backgroundPresets: PresetTheme[]

  // 스타일
  fontFamily: string
  fontSize: number
  textColor: string
  textAlign: 'left' | 'center' | 'right'
  textShadow: boolean

  // 달력
  showCalendar: boolean
  calendarPosition: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
  showToday: boolean

  // 출력
  outputSize: keyof typeof OUTPUT_SIZES

  // Actions
  setVerse: (v: BibleVerse) => void
  setBackground: (type: string, url: string) => void
  setStyle: (style: Partial<StyleState>) => void
  resetAll: () => void
}
```

---

## 컴포넌트 레이아웃 (반응형)

```
Desktop (≥1024px):
┌──────────────────────────────────────────────────┐
│  Header: Bible Canvas logo + 슬로건 + Share btn   │
├───────────┬──────────────────────┬───────────────┤
│ 왼쪽 패널  │   중앙 캔버스 미리보기  │  오른쪽 패널  │
│ (320px)   │   (flex-1, 중앙정렬)   │  (300px)      │
│           │                      │               │
│ - 말씀선택 │   [실제 비율 미리보기]  │ - 스타일      │
│ - 배경설정 │                      │ - 달력         │
│           │   [사이즈 탭]          │ - 내보내기     │
└───────────┴──────────────────────┴───────────────┘

Tablet (768px–1023px):
┌────────────────────────────┐
│  Header                    │
├────────────────────────────┤
│  캔버스 미리보기 (상단)       │
├────────┬───────────────────┤
│ 탭 네비게이션 (말씀/배경/스타일/내보내기) │
├────────────────────────────┤
│  활성 탭 패널 내용             │
└────────────────────────────┘

Mobile (< 768px):
┌────────────────────────────┐
│  Header (compact)          │
├────────────────────────────┤
│  캔버스 미리보기 (전체 너비)   │
├────────────────────────────┤
│  바텀 탭바 (5개 아이콘)       │
└────────────────────────────┘
→ 각 탭 클릭 시 바텀시트(Bottom Sheet) 슬라이드업
```

---

## 폰트 목록

```typescript
export const FONTS = [
  { id: 'noto-serif-kr',  label: '노토 세리프',  family: "'Noto Serif KR', serif" },
  { id: 'nanum-myeongjo', label: '나눔명조',     family: "'Nanum Myeongjo', serif" },
  { id: 'kopub-batang',   label: 'KoPub바탕',   family: "'KoPub Batang', serif" },
  { id: 'noto-sans-kr',   label: '노토 산스',    family: "'Noto Sans KR', sans-serif" },
  { id: 'nanum-gothic',   label: '나눔고딕',     family: "'Nanum Gothic', sans-serif" },
  { id: 'gowun-dodum',    label: '고운돋움',     family: "'Gowun Dodum', sans-serif" },
]
```

---

## 슬로건 후보

| 슬로건 | 언어 | 분위기 |
|---|---|---|
| *Your Word. Your Canvas.* | 영문 | 감각적, 크리에이티브 |
| *말씀이 배경이 되는 순간* | 한국어 | 서정적, 감성적 |
| *오늘의 말씀으로 하루를 채우다* | 한국어 | 일상적, 따뜻함 |
| *Scripture, Designed.* | 영문 | 미니멀, 세련 |
| *믿음을 담은 한 장면* | 한국어 | 신앙적, 시적 |

**채택**: *Your Word. Your Canvas.* (영문) + *말씀이 배경이 되는 순간* (한국어 부제)

---

## 공유 기능 스펙

```typescript
// 1. 카카오톡 공유
kakao.Share.sendDefault({
  objectType: 'feed',
  content: {
    title: '오늘의 말씀 | Bible Canvas',
    description: verse.text,
    imageUrl: generatedImageUrl,
    link: { webUrl: shareUrl }
  }
})

// 2. 인스타그램 스토리 (Web Share API)
navigator.share({ title, text, url })

// 3. 링크 복사 (Clipboard API)
navigator.clipboard.writeText(shareUrl)

// 4. 이미지 직접 다운로드
// html2canvas → blob → <a download>
```

---

## 개발 우선순위 (스프린트 계획)

### Sprint 1 (1주차): 핵심 루프
- [ ] Next.js 14 프로젝트 세팅
- [ ] 기본 레이아웃 (3-column desktop + 탭 mobile)
- [ ] CanvasPreview 컴포넌트 (Fabric.js)
- [ ] 말씀 직접 입력 + 텍스트 렌더링
- [ ] 프리셋 배경 6종

### Sprint 2 (2주차): 이미지 & 스타일
- [ ] Unsplash API 연동 + 랜덤 추천
- [ ] 사용자 이미지 업로드 (드래그앤드롭)
- [ ] 폰트 6종 + 색상/정렬/그림자
- [ ] 달력 컴포넌트 토글

### Sprint 3 (3주차): 내보내기 & 공유
- [ ] 다운로드 (6개 사이즈 PNG)
- [ ] 카카오톡 공유
- [ ] 링크 공유 (URL 생성)
- [ ] 반응형 완성 (모바일 바텀시트)

### Sprint 4 (4주차): 말씀 추천 & 마무리
- [ ] Claude API 말씀 추천
- [ ] 절기 자동 감지 배너
- [ ] 성능 최적화 + 배포
- [ ] AI 배경 생성 (Phase 2 preview)

---

## 코딩 컨벤션

- **언어**: TypeScript strict mode
- **컴포넌트**: 함수형 컴포넌트 + React hooks
- **스타일**: Tailwind utility-first, CSS 모듈은 복잡한 애니메이션만
- **상태**: Zustand (전역), useState (로컬 UI 상태)
- **API**: Next.js Route Handlers (서버 컴포넌트 우선)
- **에러**: Sentry 연동 (배포 후)
- **커밋**: Gitmoji 컨벤션 (`✨ feat:`, `🐛 fix:`, `📝 docs:`)
- **브랜치**: `main` (프로덕션), `dev` (개발), `feat/*` (기능)

---

## 주요 참고 라이브러리 버전

```json
{
  "next": "14.x",
  "react": "18.x",
  "typescript": "5.x",
  "tailwindcss": "3.x",
  "fabric": "5.x",
  "html2canvas": "1.x",
  "zustand": "4.x",
  "@anthropic-ai/sdk": "latest",
  "unsplash-js": "7.x"
}
```

---

## 체크리스트 (배포 전)

- [ ] Lighthouse 성능 90+ (모바일)
- [ ] 한국어 폰트 최적화 (subset)
- [ ] OG 이미지 설정 (소셜 공유 미리보기)
- [ ] robots.txt / sitemap.xml
- [ ] 환경변수 Vercel 설정
- [ ] CORS 설정 (Unsplash API)
- [ ] 이미지 업로드 용량 제한 (10MB)
- [ ] 모바일 Safari 테스트 (HEIC 업로드)

---

*Last updated: 2026-03-25 | Bible Canvas MVP 설계*

# CLAUDE.md — Project AI Instructions

> Claude가 이 프로젝트에서 코드 작업, 커밋 메시지 생성, PR 작성 시 참고하는 지침 문서입니다.

---

## 🧵 Git Commit Convention

### 형식

```
<이모지> <타입>(<스코프>): <한국어 요약>

<본문>

<푸터>
```

### 타입 & 이모지 매핑

| 이모지 | 타입       | 설명                            |
|--------|------------|---------------------------------|
| ✨     | feat       | 새로운 기능 추가                |
| 🐛     | fix        | 버그 수정                       |
| 💡     | chore      | 주석, 포맷 등 자잘한 수정       |
| 📝     | docs       | 문서 수정                       |
| 🚚     | build      | 빌드/패키지 관련 수정           |
| ✅     | test       | 테스트 코드 추가/수정           |
| ♻️     | refactor   | 기능 변화 없는 리팩터링         |
| 🚑     | hotfix     | 긴급 수정                       |
| ⚙️     | ci         | CI/CD 변경                      |
| 🔧     | config     | 설정 파일 수정                  |
| 🗑️     | remove     | 불필요 파일/코드 삭제           |
| 🔒     | security   | 보안 관련 수정                  |
| 🚀     | deploy     | 배포 관련 커밋                  |
| 🧩     | style      | 코드 스타일 변경                |
| 🎨     | ui         | UI/템플릿/CSS 변경              |
| 🔄     | sync       | 코드/데이터 동기화              |
| 🔥     | clean      | 코드/로그 정리                  |
| 🧠     | perf       | 성능 개선                       |

### 규칙

- 제목은 **한국어**, 50자 이내, 마침표 없음
- 본문 각 줄 72자 이내, 변경 이유 서술
- 하나의 커밋 = 하나의 타입
- 이모지 **필수** (생략 금지)
- Breaking Change → 푸터에 `BREAKING CHANGE:` 명시
- 이슈 연결 → `Fixes #N` 또는 `Refs #N`

### 예시

```
✨ feat(products): 상품 상세페이지 추가

- Bootstrap 기반 product_detail.html 추가
- views.py에서 Product 더미데이터 연결

Fixes #12
```

---

## 📌 Claude에게 요청할 때

커밋 메시지 작성을 요청할 경우, Claude는 위 컨벤션에 따라 메시지를 생성합니다.

프롬프트 예시:
> "변경된 내용을 보고 CLAUDE.md 커밋 컨벤션에 맞게 커밋 메시지 작성해줘."