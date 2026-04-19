import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { StepControls } from '../StepControls'

const noop = () => {}

describe('StepControls', () => {
  it('playState가 idle이면 모든 버튼이 비활성화된다', () => {
    render(
      <StepControls
        playState="idle"
        onPrev={noop}
        onNext={noop}
        onPlay={noop}
        onPause={noop}
        speed={3}
        onSpeedChange={noop}
      />
    )
    const buttons = screen.getAllByRole('button')
    buttons.forEach((btn) => expect(btn).toHaveProperty('disabled', true))
  })

  it('재생 중에는 재생 버튼 대신 일시정지 버튼이 표시된다', () => {
    render(
      <StepControls
        playState="playing"
        onPrev={noop}
        onNext={noop}
        onPlay={noop}
        onPause={noop}
        speed={3}
        onSpeedChange={noop}
      />
    )
    expect(screen.getByLabelText('일시정지')).toBeDefined()
  })

  it('이전 스텝 버튼 클릭 시 onPrev가 호출된다', () => {
    const onPrev = vi.fn()
    render(
      <StepControls
        playState="paused"
        onPrev={onPrev}
        onNext={noop}
        onPlay={noop}
        onPause={noop}
        speed={3}
        onSpeedChange={noop}
      />
    )
    fireEvent.click(screen.getByLabelText('이전 스텝'))
    expect(onPrev).toHaveBeenCalledOnce()
  })
})
