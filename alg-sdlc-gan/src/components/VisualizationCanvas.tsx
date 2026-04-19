import { useRef, useEffect } from 'react'

function drawFrame(ctx: CanvasRenderingContext2D, width: number, height: number) {
  ctx.fillStyle = '#0f172a'
  ctx.fillRect(0, 0, width, height)
  ctx.fillStyle = '#94a3b8'
  ctx.font = '16px monospace'
  ctx.textAlign = 'center'
  ctx.fillText('캔버스 준비 완료', width / 2, height / 2)
}

interface Props {
  width?: number
  height?: number
}

export function VisualizationCanvas({ width = 600, height = 400 }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    drawFrame(ctx, width, height)
  }, [width, height])

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      role="img"
      aria-label="알고리즘 시각화 캔버스"
      className="rounded-lg"
    />
  )
}
