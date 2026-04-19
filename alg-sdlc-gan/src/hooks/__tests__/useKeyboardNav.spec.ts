import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useKeyboardNav } from '../useKeyboardNav'

describe('useKeyboardNav', () => {
  let onPrev: () => void
  let onNext: () => void

  beforeEach(() => {
    onPrev = vi.fn() as () => void
    onNext = vi.fn() as () => void
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('active=true일 때 ArrowRight 키를 누르면 onNext가 호출된다', () => {
    renderHook(() => useKeyboardNav(onPrev, onNext, true))

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }))

    expect(onNext).toHaveBeenCalledOnce()
    expect(onPrev).not.toHaveBeenCalled()
  })

  it('active=true일 때 ArrowLeft 키를 누르면 onPrev가 호출된다', () => {
    renderHook(() => useKeyboardNav(onPrev, onNext, true))

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true }))

    expect(onPrev).toHaveBeenCalledOnce()
    expect(onNext).not.toHaveBeenCalled()
  })

  it('active=false일 때 ArrowRight를 눌러도 onNext가 호출되지 않는다', () => {
    renderHook(() => useKeyboardNav(onPrev, onNext, false))

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }))

    expect(onNext).not.toHaveBeenCalled()
    expect(onPrev).not.toHaveBeenCalled()
  })

  it('active=false일 때 ArrowLeft를 눌러도 onPrev가 호출되지 않는다', () => {
    renderHook(() => useKeyboardNav(onPrev, onNext, false))

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true }))

    expect(onPrev).not.toHaveBeenCalled()
    expect(onNext).not.toHaveBeenCalled()
  })

  it('HTMLInputElement에 포커스된 상태에서 ArrowRight를 누르면 onNext가 호출되지 않는다', () => {
    renderHook(() => useKeyboardNav(onPrev, onNext, true))

    // input 요소를 타겟으로 이벤트 발생
    const input = document.createElement('input')
    document.body.appendChild(input)
    input.focus()

    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }))

    expect(onNext).not.toHaveBeenCalled()

    document.body.removeChild(input)
  })

  it('HTMLTextAreaElement에 포커스된 상태에서 ArrowLeft를 누르면 onPrev가 호출되지 않는다', () => {
    renderHook(() => useKeyboardNav(onPrev, onNext, true))

    const textarea = document.createElement('textarea')
    document.body.appendChild(textarea)
    textarea.focus()

    textarea.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true }))

    expect(onPrev).not.toHaveBeenCalled()

    document.body.removeChild(textarea)
  })
})
