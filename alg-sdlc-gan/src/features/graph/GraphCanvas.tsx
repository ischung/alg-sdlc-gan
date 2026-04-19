import { useRef, useEffect } from 'react'
import type { GraphNode, GraphEdge, GraphStep } from '../../types'

interface Props {
  nodes: GraphNode[]
  edges: GraphEdge[]
  step: GraphStep | null
  width?: number
  height?: number
}

export function GraphCanvas({ nodes, edges, step, width = 600, height = 360 }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.fillStyle = '#0f172a'
    ctx.fillRect(0, 0, width, height)

    if (nodes.length === 0) {
      ctx.fillStyle = '#94a3b8'
      ctx.font = '14px monospace'
      ctx.textAlign = 'center'
      ctx.fillText('그래프를 입력하고 시작 버튼을 누르세요', width / 2, height / 2)
      return
    }

    const padX = 60
    const padY = 60
    const nodePositions = new Map(
      nodes.map((n) => [
        n.id,
        { x: padX + n.x * (width - padX * 2), y: padY + n.y * (height - padY * 2) },
      ])
    )

    // Draw edges
    for (const edge of edges) {
      const from = nodePositions.get(edge.from)
      const to = nodePositions.get(edge.to)
      if (!from || !to) continue

      const isActive =
        step?.activeEdge &&
        ((step.activeEdge[0] === edge.from && step.activeEdge[1] === edge.to) ||
          (step.activeEdge[0] === edge.to && step.activeEdge[1] === edge.from))

      ctx.beginPath()
      ctx.setLineDash(isActive ? [6, 4] : [])
      ctx.strokeStyle = isActive ? '#f97316' : '#475569'
      ctx.lineWidth = isActive ? 2 : 1
      ctx.moveTo(from.x, from.y)
      ctx.lineTo(to.x, to.y)
      ctx.stroke()
      ctx.setLineDash([])
    }

    // Draw nodes
    for (const node of nodes) {
      const pos = nodePositions.get(node.id)
      if (!pos) continue

      const isVisited = step?.visited.includes(node.id)
      const isCurrent = step?.current === node.id

      ctx.beginPath()
      ctx.arc(pos.x, pos.y, 20, 0, Math.PI * 2)
      ctx.fillStyle = isCurrent ? '#f97316' : isVisited ? '#22c55e' : '#475569'
      ctx.fill()

      ctx.fillStyle = '#f8fafc'
      ctx.font = 'bold 13px monospace'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(node.id, pos.x, pos.y)
      ctx.textBaseline = 'alphabetic'
    }
  }, [nodes, edges, step, width, height])

  return (
    <div className="min-w-0 w-full">
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        role="img"
        aria-label="그래프 시각화 캔버스"
        className="rounded-lg max-w-full"
        style={{ width: '100%', maxWidth: `${width}px` }}
      />
    </div>
  )
}
