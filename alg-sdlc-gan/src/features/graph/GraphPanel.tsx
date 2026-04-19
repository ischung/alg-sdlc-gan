import { useState, useEffect, useRef, useCallback } from 'react'
import { GraphCanvas } from './GraphCanvas'
import { StepControls } from '../../components/StepControls'
import { StepIndicator } from '../../components/StepIndicator'
import { computeGraphSteps } from './engine'
import { normalizeCoordinates } from './utils'
import { useKeyboardNav } from '../../hooks/useKeyboardNav'
import type { GraphNode, GraphEdge } from '../../types'
import type { GraphAlgorithm } from './engine'

interface Props {
  algorithm: GraphAlgorithm
}

function parseEdgeInput(raw: string): { nodes: GraphNode[]; edges: GraphEdge[] } | null {
  const parts = raw.split(',').map((s) => s.trim()).filter(Boolean)
  if (parts.length === 0) return null

  const edgeSet: GraphEdge[] = []
  const nodeIds = new Set<string>()

  for (const part of parts) {
    const m = part.match(/^([A-Za-z0-9]+)-([A-Za-z0-9]+)$/)
    if (!m) return null
    edgeSet.push({ from: m[1], to: m[2] })
    nodeIds.add(m[1])
    nodeIds.add(m[2])
  }

  const rawNodes: GraphNode[] = [...nodeIds].map((id, i) => ({
    id,
    x: Math.cos((2 * Math.PI * i) / nodeIds.size),
    y: Math.sin((2 * Math.PI * i) / nodeIds.size),
  }))

  return { nodes: normalizeCoordinates(rawNodes), edges: edgeSet }
}

export function GraphPanel({ algorithm }: Props) {
  const [edgeInput, setEdgeInput] = useState('A-B,B-C,C-D,A-D')
  const [startNode, setStartNode] = useState('A')
  const [steps, setSteps] = useState<ReturnType<typeof computeGraphSteps>>([])
  const [currentStep, setCurrentStep] = useState(0)
  const [playState, setPlayState] = useState<'idle' | 'playing' | 'paused' | 'done'>('idle')
  const [speed, setSpeed] = useState(3)
  const [error, setError] = useState<string | null>(null)
  const [graphData, setGraphData] = useState<{ nodes: GraphNode[]; edges: GraphEdge[] } | null>(null)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const handleStart = () => {
    const parsed = parseEdgeInput(edgeInput)
    if (!parsed) {
      setError('형식 오류: "A-B,B-C" 형태로 입력하세요.')
      return
    }
    if (!parsed.nodes.find((n) => n.id === startNode)) {
      setError(`시작 노드 '${startNode}'이(가) 그래프에 없어요.`)
      return
    }
    setError(null)
    const s = computeGraphSteps(parsed, startNode, algorithm)
    setGraphData(parsed)
    setSteps(s)
    setCurrentStep(0)
    setPlayState('paused')
  }

  useEffect(() => {
    if (playState !== 'playing') {
      if (timerRef.current) clearInterval(timerRef.current)
      return
    }
    const delay = Math.max(100, 600 - speed * 100)
    timerRef.current = setInterval(() => {
      setCurrentStep((prev) => {
        const next = prev + 1
        if (next >= steps.length - 1) {
          setPlayState('done')
          clearInterval(timerRef.current!)
          return steps.length - 1
        }
        return next
      })
    }, delay)
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [playState, speed, steps.length])

  const handlePrev = useCallback(() => setCurrentStep((p) => Math.max(0, p - 1)), [])
  const handleNext = useCallback(() => {
    setCurrentStep((p) => {
      const next = Math.min(p + 1, steps.length - 1)
      if (next === steps.length - 1) setPlayState('done')
      return next
    })
  }, [steps.length])

  useKeyboardNav(handlePrev, handleNext, playState !== 'idle')

  const isDone = playState === 'done'
  const currentStepData = graphData ? (steps[currentStep] ?? null) : null

  return (
    <div className="flex flex-col gap-4">
      {/* 2-column layout at md+ */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* 좌측: 입력 + 컨트롤 */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <input
              type="text"
              value={edgeInput}
              onChange={(e) => setEdgeInput(e.target.value)}
              disabled={playState === 'playing'}
              placeholder="예: A-B,B-C,C-A"
              className="flex-1 rounded-md bg-slate-700 px-3 py-2.5 text-sm text-white disabled:opacity-50"
              aria-label="그래프 엣지 입력"
            />
            <input
              type="text"
              value={startNode}
              onChange={(e) => setStartNode(e.target.value)}
              disabled={playState === 'playing'}
              placeholder="시작 노드"
              className="w-24 rounded-md bg-slate-700 px-3 py-2.5 text-sm text-white disabled:opacity-50"
              aria-label="시작 노드 입력"
            />
            <button
              onClick={handleStart}
              aria-label="탐색 시작"
              className="rounded-md bg-indigo-600 px-4 py-2.5 min-h-[44px] text-sm font-medium text-white hover:bg-indigo-500"
            >
              시작
            </button>
          </div>

          {error && <p className="text-sm text-red-400">{error}</p>}

          <StepControls
            playState={playState}
            onPrev={handlePrev}
            onNext={handleNext}
            onPlay={() => setPlayState('playing')}
            onPause={() => setPlayState('paused')}
            speed={speed}
            onSpeedChange={setSpeed}
          />
          <StepIndicator currentStep={currentStep} total={steps.length} />

          {isDone && (
            <div className="flex items-center justify-between rounded-md bg-slate-700 px-4 py-2">
              <span className="text-sm text-green-400 font-medium">탐색 완료!</span>
              <button
                onClick={() => {
                  setCurrentStep(0)
                  setPlayState('paused')
                }}
                aria-label="처음으로 돌아가기"
                className="rounded-md bg-slate-600 px-3 py-2.5 min-h-[44px] text-sm text-white hover:bg-slate-500"
              >
                처음으로
              </button>
            </div>
          )}
        </div>

        {/* 우측: Canvas */}
        <div className="flex items-start justify-center min-w-0">
          <GraphCanvas
            nodes={graphData?.nodes ?? []}
            edges={graphData?.edges ?? []}
            step={currentStepData}
          />
        </div>
      </div>
    </div>
  )
}
