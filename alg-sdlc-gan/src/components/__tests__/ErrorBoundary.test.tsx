import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { ErrorBoundary, ErrorMessage } from '../ErrorBoundary'

function Thrower(): null {
  throw new Error('test error')
}

describe('ErrorBoundary', () => {
  it('하위 컴포넌트 throw 시 에러 메시지 UI를 렌더링한다', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {})
    render(
      <ErrorBoundary>
        <Thrower />
      </ErrorBoundary>
    )
    expect(screen.getByRole('alert')).toBeDefined()
    expect(screen.getByText(/앗, 문제가 생겼어요/)).toBeDefined()
    spy.mockRestore()
  })

  it('다시 시작 버튼 클릭 시 onReset이 호출된다', () => {
    const onReset = vi.fn()
    render(<ErrorMessage onReset={onReset} />)
    fireEvent.click(screen.getByText('다시 시작'))
    expect(onReset).toHaveBeenCalledOnce()
  })
})
