import { useState, useEffect, useRef } from 'react'
import { SortCanvas } from './SortCanvas'
import { StepControls } from '../../components/StepControls'
import { StepIndicator } from '../../components/StepIndicator'
import { computeSortSteps } from './engine'
import { validateSortInput } from './utils'
import type { SortAlgorithm } from './engine'

interface Props {
  algorithm: SortAlgorithm
}

export function SortPanel({ algorithm }: Props) {
  const [input, setInput] = useState('5,3,8,1,9,2')
  const [steps, setSteps] = useState<ReturnType<typeof computeSortSteps>>([])
  const [currentStep, setCurrentStep] = useState(0)
  const [playState, setPlayState] = useState<'idle' | 'playing' | 'paused' | 'done'>('idle')
  const [speed, setSpeed] = useState(3)
  const [error, setError] = useState<string | null>(null)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const handleStart = () => {
    const result = validateSortInput(input)
    if (!result.valid) {
      setError(result.error)
      return
    }
    setError(null)
    const s = computeSortSteps(result.array, algorithm)
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

  const isDone = playState === 'done'
  const currentStepData = steps[currentStep] ?? null

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={playState === 'playing'}
          placeholder="예: 5,3,8,1"
          className="flex-1 rounded-md bg-slate-700 px-3 py-1.5 text-sm text-white disabled:opacity-50"
          aria-label="정렬할 배열 입력"
        />
        <button
          onClick={handleStart}
          className="rounded-md bg-indigo-600 px-4 py-1.5 text-sm font-medium text-white hover:bg-indigo-500"
        >
          시작
        </button>
      </div>

      {error && <p className="text-sm text-red-400">{error}</p>}

      <SortCanvas step={currentStepData} />

      <div className="flex items-center justify-between">
        <StepControls
          playState={playState}
          onPrev={() => setCurrentStep((p) => Math.max(0, p - 1))}
          onNext={() => {
            setCurrentStep((p) => {
              const next = Math.min(p + 1, steps.length - 1)
              if (next === steps.length - 1) setPlayState('done')
              return next
            })
          }}
          onPlay={() => setPlayState('playing')}
          onPause={() => setPlayState('paused')}
          speed={speed}
          onSpeedChange={setSpeed}
        />
        <StepIndicator currentStep={currentStep} total={steps.length} />
      </div>

      {isDone && (
        <div className="flex items-center justify-between rounded-md bg-slate-700 px-4 py-2">
          <span className="text-sm text-green-400 font-medium">정렬 완료!</span>
          <button
            onClick={() => {
              setCurrentStep(0)
              setPlayState('paused')
            }}
            className="rounded-md bg-slate-600 px-3 py-1 text-sm text-white hover:bg-slate-500"
          >
            처음으로
          </button>
        </div>
      )}
    </div>
  )
}
