<p align="center">
  <img src="https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js" />
  <img src="https://img.shields.io/badge/TypeScript-5.4-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" />
  <img src="https://img.shields.io/badge/Zustand-4.5-F0B90B?style=for-the-badge" />
</p>

<h1 align="center">✝️ Bible Canvas</h1>
<h3 align="center"><em>Your Word. Your Canvas.</em></h3>
<p align="center">말씀이 배경이 되는 순간 — 성경 구절로 아름다운 배경화면을 만들어보세요.</p>

---

## link : https://bible-canvas-sigma.vercel.app/

## 📸 미리보기

> 성경 말씀을 선택하고, 배경 이미지와 스타일을 설정한 뒤, 다양한 사이즈로 다운로드하세요.

---

## ✨ 주요 기능

### Phase 1 — MVP (현재)
- 📖 **말씀 선택** — 절기 자동 추천 + 키워드 검색 + 직접 입력
- 🖼️ **배경 이미지** — 6종 감성 프리셋 배경 + 사용자 사진 업로드
- ✏️ **스타일 설정** — 한국어 폰트 6종, 크기, 색상, 정렬, 줄간격, 그림자
- 📅 **달력 오버레이** — 월간 미니 달력 on/off, 위치·투명도 조절
- 📥 **다운로드** — 6개 사이즈 (스토리/피드/PC/모바일/카카오/유튜브)
- 📱 **반응형** — Desktop 3-column / Tablet 탭 / Mobile 바텀시트

### Phase 2 — v1.1 (예정)
- 🤖 AI 배경 생성 (Claude + DALL-E 3)
- ⛪ 절기 자동 감지 배너
- ⭐ 즐겨찾기 (로컬스토리지)
- 📦 소그룹 공유 팩

### Phase 3 — v2.0 (예정)
- 🔐 회원 기능 (Google/카카오 소셜 로그인)
- 💾 나의 컬렉션
- 🌐 커뮤니티 갤러리
- 💎 Pro 티어

---

## 🛠️ 기술 스택

| 영역 | 기술 |
|---|---|
| **Framework** | Next.js 14 (App Router) |
| **Language** | TypeScript 5 (strict mode) |
| **Styling** | Tailwind CSS 3 + 커스텀 다크 테마 |
| **State** | Zustand 4 (persist 미들웨어) |
| **Export** | html2canvas |
| **Bible Data** | 자체 JSON DB (14개 핵심 구절 + 절기 매핑) |
| **Calendar** | 교회력 절기 자동 계산 (서방 교회 부활절 알고리즘) |
| **Deploy** | Vercel |

---

## 🚀 시작하기

### 요구사항
- Node.js 18+ (20 LTS 권장)
- npm 9+

### 설치 & 실행

```bash
# 1. 레포지토리 클론
git clone https://github.com/chenluc1a/BibleCanvas.git
cd BibleCanvas

# 2. 환경변수 설정
cp .env.example .env.local
# .env.local 파일을 열어 API 키를 입력하세요

# 3. 의존성 설치
npm install

# 4. 개발 서버 실행
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 을 열어주세요.

### 환경변수

| 변수 | 설명 | 필수 여부 |
|---|---|---|
| `UNSPLASH_ACCESS_KEY` | Unsplash API 키 | Phase 2 |
| `ANTHROPIC_API_KEY` | Claude API 키 (말씀 추천) | Phase 2 |
| `BLOB_READ_WRITE_TOKEN` | Vercel Blob 토큰 | Phase 2 |
| `NEXT_PUBLIC_BASE_URL` | 공개 URL | ✅ |
| `NEXT_PUBLIC_KAKAO_JS_KEY` | 카카오톡 공유 키 | Phase 2 |

---

## 📁 프로젝트 구조

```
bible-canvas/
├── CLAUDE.md                         # AI 컨텍스트 문서
├── .env.example                      # 환경변수 템플릿
├── next.config.mjs                   # Next.js 설정
├── tailwind.config.ts                # Tailwind 커스텀 설정
├── public/
│   ├── fonts/                        # 한국어 폰트 파일
│   └── presets/                      # 프리셋 배경 이미지 6종
├── src/
│   ├── app/
│   │   ├── layout.tsx                # Root layout + 메타데이터
│   │   ├── page.tsx                  # 메인 에디터 페이지
│   │   ├── globals.css               # 전역 스타일 + 디자인 시스템
│   │   └── api/verses/route.ts       # 말씀 추천 API
│   ├── components/
│   │   ├── editor/                   # 에디터 패널 컴포넌트
│   │   │   ├── CanvasPreview.tsx     # 캔버스 미리보기
│   │   │   ├── VersePanel.tsx        # 말씀 선택
│   │   │   ├── BackgroundPanel.tsx   # 배경 설정
│   │   │   ├── StylePanel.tsx        # 스타일 설정
│   │   │   ├── CalendarPanel.tsx     # 달력 설정
│   │   │   └── ExportPanel.tsx       # 내보내기
│   │   └── layout/
│   │       └── Header.tsx            # 헤더
│   ├── hooks/
│   │   └── useExport.ts              # PNG 내보내기 훅
│   ├── lib/
│   │   ├── bible-data.ts             # 성경 구절 DB
│   │   ├── church-calendar.ts        # 교회력 절기 계산
│   │   └── constants.ts              # 전역 상수
│   ├── store/
│   │   └── editor.ts                 # Zustand 전역 상태
│   └── types/
│       └── index.ts                  # TypeScript 타입
```

---

## 📜 스크립트

| 명령어 | 설명 |
|---|---|
| `npm run dev` | 개발 서버 (http://localhost:3000) |
| `npm run build` | 프로덕션 빌드 |
| `npm run start` | 프로덕션 서버 |
| `npm run lint` | ESLint 검사 |
| `npm run type-check` | TypeScript 타입 검사 |

---

## 🔀 Git 컨벤션

### 커밋 메시지

```
<이모지> <타입>(<스코프>): <한국어 요약>
```

| 이모지 | 타입 | 설명 |
|---|---|---|
| ✨ | feat | 새로운 기능 추가 |
| 🐛 | fix | 버그 수정 |
| 📝 | docs | 문서 수정 |
| 🎨 | ui | UI/CSS 변경 |
| ♻️ | refactor | 리팩터링 |
| 🔧 | config | 설정 파일 수정 |
| 🧠 | perf | 성능 개선 |
| ✅ | test | 테스트 추가/수정 |

### 브랜치 전략

| 브랜치 | 용도 |
|---|---|
| `main` | 프로덕션 (자동 배포) |
| `dev` | 개발 통합 |
| `feat/*` | 기능 개발 |

---

## 🎨 디자인 시스템

| 토큰 | 값 | 용도 |
|---|---|---|
| `canvas-bg` | `#0A0A0F` | 배경 |
| `canvas-surface` | `#14141F` | 카드/패널 배경 |
| `canvas-border` | `#1E1E2E` | 테두리 |
| `canvas-accent` | `#7C6AEF` | 강조 (보라) |
| `canvas-accent-light` | `#9B8CFB` | 강조 (밝은 보라) |
| `canvas-muted` | `#6B6B80` | 비활성 텍스트 |
| `canvas-text` | `#E8E8F0` | 기본 텍스트 |

- **글래스모피즘**: `.glass` / `.glass-subtle` 유틸리티 클래스
- **애니메이션**: `animate-fade-in`, `animate-slide-up`, `animate-glow`

---

## 📝 라이선스

MIT License

---

<p align="center">
  <strong>Bible Canvas</strong> — <em>말씀이 배경이 되는 순간</em> ✝️
</p>
