// src/hooks/useExport.ts
'use client'
import { useCallback, useRef } from 'react'
import { useEditorStore } from '@/store/editor'
import { OUTPUT_SIZES } from '@/lib/constants'
import type { OutputSize } from '@/types'

export function useExport(canvasRef: React.RefObject<HTMLDivElement>) {
  const { outputSize, verse, customText, setExporting } = useEditorStore()

  const exportToPNG = useCallback(async (targetSize?: OutputSize) => {
    if (!canvasRef.current) return

    setExporting(true)
    try {
      const { default: html2canvas } = await import('html2canvas')
      const size = OUTPUT_SIZES[targetSize ?? outputSize]

      const canvas = await html2canvas(canvasRef.current, {
        width: size.width,
        height: size.height,
        scale: 1,
        useCORS: true,
        allowTaint: false,
        backgroundColor: null,
        logging: false,
      })

      const blob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob(b => b ? resolve(b) : reject(new Error('Blob 생성 실패')), 'image/png', 1.0)
      })

      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      const verseRef = verse ? `${verse.book}${verse.chapter}_${verse.verse}` : 'custom'
      a.href = url
      a.download = `bible-canvas_${verseRef}_${targetSize ?? outputSize}.png`
      a.click()
      URL.revokeObjectURL(url)
    } catch (err) {
      console.error('[useExport] PNG 내보내기 실패:', err)
    } finally {
      setExporting(false)
    }
  }, [canvasRef, outputSize, verse, setExporting])

  const exportAllSizes = useCallback(async () => {
    setExporting(true)
    const sizes: OutputSize[] = ['story', 'feed', 'pc', 'mobile', 'kakao']
    for (const size of sizes) {
      await exportToPNG(size)
      await new Promise(r => setTimeout(r, 300)) // 브라우저가 각 다운로드를 처리할 시간
    }
    setExporting(false)
  }, [exportToPNG, setExporting])

  return { exportToPNG, exportAllSizes }
}

// ─────────────────────────────────────────────────────
// src/hooks/useShare.ts
// ─────────────────────────────────────────────────────
/*
'use client'
import { useCallback } from 'react'
import { useEditorStore } from '@/store/editor'
import { APP_NAME } from '@/lib/constants'
import { formatVerseRef } from '@/lib/bible-data'

export function useShare() {
  const { verse, customText, setShareUrl, shareUrl } = useEditorStore()

  const getShareText = () => {
    if (verse) return `${verse.text}\n— ${formatVerseRef(verse)}`
    return customText
  }

  const copyLink = useCallback(async () => {
    try {
      const res = await fetch('/api/share', {
        method: 'POST',
        body: JSON.stringify({ text: getShareText() }),
        headers: { 'Content-Type': 'application/json' }
      })
      const { shareUrl: url } = await res.json()
      setShareUrl(url)
      await navigator.clipboard.writeText(url)
      return url
    } catch (err) {
      console.error('[useShare] 링크 복사 실패:', err)
    }
  }, [verse, customText])

  const shareKakao = useCallback(() => {
    if (typeof window === 'undefined' || !window.Kakao) return
    window.Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: `오늘의 말씀 | ${APP_NAME}`,
        description: getShareText(),
        imageUrl: shareUrl ?? '',
        link: { webUrl: window.location.href }
      }
    })
  }, [verse, customText, shareUrl])

  const shareNative = useCallback(async () => {
    if (!navigator.share) {
      await copyLink()
      return
    }
    await navigator.share({
      title: `오늘의 말씀 | ${APP_NAME}`,
      text: getShareText(),
      url: shareUrl ?? window.location.href
    })
  }, [verse, customText, shareUrl, copyLink])

  return { copyLink, shareKakao, shareNative, shareUrl }
}
*/
