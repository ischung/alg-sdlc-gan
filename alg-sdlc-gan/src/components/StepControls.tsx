import type { PlayState } from '../types'

interface Props {
  playState: PlayState
  onPrev: () => void
  onNext: () => void
  onPlay: () => void
  onPause: () => void
  speed: number
  onSpeedChange: (v: number) => void
}

export function StepControls({
  playState,
  onPrev,
  onNext,
  onPlay,
  onPause,
  speed,
  onSpeedChange,
}: Props) {
  const isIdle = playState === 'idle'
  const isPlaying = playState === 'playing'

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <button
          onClick={onPrev}
          disabled={isIdle}
          aria-label="이전 스텝"
          className="rounded-md bg-slate-700 px-3 py-1.5 text-sm disabled:opacity-40"
        >
          ◀
        </button>

        {isPlaying ? (
          <button
            onClick={onPause}
            disabled={isIdle}
            aria-label="일시정지"
            className="rounded-md bg-indigo-600 px-3 py-1.5 text-sm disabled:opacity-40"
          >
            ⏸
          </button>
        ) : (
          <button
            onClick={onPlay}
            disabled={isIdle}
            aria-label="재생"
            className="rounded-md bg-indigo-600 px-3 py-1.5 text-sm disabled:opacity-40"
          >
            ▶
          </button>
        )}

        <button
          onClick={onNext}
          disabled={isIdle}
          aria-label="다음 스텝"
          className="rounded-md bg-slate-700 px-3 py-1.5 text-sm disabled:opacity-40"
        >
          ▶▶
        </button>
      </div>

      <label className="flex flex-col gap-1 text-sm text-slate-300">
        속도
        <input
          type="range"
          min={1}
          max={5}
          value={speed}
          disabled={isIdle || isPlaying}
          onChange={(e) => onSpeedChange(Number(e.target.value))}
          aria-label="재생 속도"
          className="accent-indigo-500 disabled:opacity-40"
        />
      </label>
    </div>
  )
}
