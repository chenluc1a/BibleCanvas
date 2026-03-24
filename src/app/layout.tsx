import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Bible Canvas — Your Word. Your Canvas.',
  description: '말씀이 배경이 되는 순간. 성경 구절로 아름다운 배경화면을 만들어보세요.',
  keywords: ['성경', '배경화면', '말씀', '바이블', '캔버스', 'Bible', 'wallpaper'],
  openGraph: {
    title: 'Bible Canvas — Your Word. Your Canvas.',
    description: '말씀이 배경이 되는 순간. 성경 구절로 아름다운 배경화면을 만들어보세요.',
    type: 'website',
    locale: 'ko_KR',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body className="min-h-screen bg-canvas-bg text-canvas-text antialiased">
        {children}
      </body>
    </html>
  )
}
