import { describe, it, expect } from 'vitest'
import { visualizerReducer, initialState } from '../visualizerReducer'

describe('visualizerReducer', () => {
  it('초기 상태가 idle이다', () => {
    expect(initialState.playState).toBe('idle')
    expect(initialState.algorithm).toBeNull()
    expect(initialState.currentStep).toBe(0)
  })

  it('RESET 액션 시 초기 상태로 돌아온다', () => {
    const modified = {
      ...initialState,
      algorithm: 'bubble' as const,
      playState: 'playing' as const,
      currentStep: 5,
      inputValue: '3,1,2',
    }
    const result = visualizerReducer(modified, { type: 'RESET' })
    expect(result.playState).toBe('idle')
    expect(result.currentStep).toBe(0)
    expect(result.inputValue).toBe('')
    expect(result.algorithm).toBe('bubble')
  })

  it('SET_ALGORITHM 시 상태가 초기화되고 algorithm만 변경된다', () => {
    const result = visualizerReducer(initialState, {
      type: 'SET_ALGORITHM',
      payload: 'selection',
    })
    expect(result.algorithm).toBe('selection')
    expect(result.playState).toBe('idle')
  })

  it('모든 VisualizerAction 타입이 TypeScript 오류 없이 컴파일된다', () => {
    const actions = [
      { type: 'SET_ALGORITHM' as const, payload: 'bubble' as const },
      { type: 'SET_INPUT' as const, payload: '1,2,3' },
      { type: 'SET_START_NODE' as const, payload: 'A' },
      { type: 'NEXT_STEP' as const },
      { type: 'PREV_STEP' as const },
      { type: 'PLAY' as const },
      { type: 'PAUSE' as const },
      { type: 'SET_ERROR' as const, payload: 'error' },
      { type: 'RESET' as const },
    ]
    let state = initialState
    for (const action of actions) {
      state = visualizerReducer(state, action)
    }
    expect(state).toBeDefined()
  })
})
