import { useRef, useEffect } from 'react'
import type { SortStep } from '../../types'

interface Props {
  step: SortStep | null
  width?: number
  height?: number
}

export function SortCanvas({ step, width = 600, height = 360 }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.fillStyle = '#0f172a'
    ctx.fillRect(0, 0, width, height)

    if (!step || step.array.length === 0) {
      ctx.fillStyle = '#94a3b8'
      ctx.font = '14px monospace'
      ctx.textAlign = 'center'
      ctx.fillText('배열을 입력하고 시작 버튼을 누르세요', width / 2, height / 2)
      return
    }

    const arr = step.array
    const n = arr.length
    const max = Math.max(...arr.map(Math.abs), 1)
    const barW = Math.floor((width - 40) / n) - 2
    const padX = 20

    arr.forEach((val, i) => {
      const barH = Math.max(4, Math.floor((Math.abs(val) / max) * (height - 60)))
      const x = padX + i * (barW + 2)
      const y = height - 30 - barH

      if (step.sorted.includes(i)) {
        ctx.fillStyle = '#22c55e'
      } else if (step.swapped && (step.swapped[0] === i || step.swapped[1] === i)) {
        ctx.fillStyle = '#ef4444'
      } else if (step.comparing && (step.comparing[0] === i || step.comparing[1] === i)) {
        ctx.fillStyle = '#f97316'
      } else {
        ctx.fillStyle = '#6366f1'
      }

      ctx.fillRect(x, y, barW, barH)

      ctx.fillStyle = '#cbd5e1'
      ctx.font = '10px monospace'
      ctx.textAlign = 'center'
      ctx.fillText(String(val), x + barW / 2, height - 12)
    })
  }, [step, width, height])

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      role="img"
      aria-label="정렬 시각화 캔버스"
      className="rounded-lg"
    />
  )
}
