import { useReducer } from 'react'
import type { VisualizerState, VisualizerAction } from '../types'

export const initialState: VisualizerState = {
  algorithm: null,
  playState: 'idle',
  currentStep: 0,
  sortSteps: [],
  graphSteps: [],
  inputValue: '',
  startNode: '',
  errorMessage: null,
}

export function visualizerReducer(
  state: VisualizerState,
  action: VisualizerAction
): VisualizerState {
  switch (action.type) {
    case 'SET_ALGORITHM':
      return { ...initialState, algorithm: action.payload }
    case 'SET_SORT_STEPS':
      return {
        ...state,
        sortSteps: action.payload,
        currentStep: 0,
        playState: 'paused',
        errorMessage: null,
      }
    case 'SET_GRAPH_STEPS':
      return {
        ...state,
        graphSteps: action.payload,
        currentStep: 0,
        playState: 'paused',
        errorMessage: null,
      }
    case 'SET_INPUT':
      return { ...state, inputValue: action.payload }
    case 'SET_START_NODE':
      return { ...state, startNode: action.payload }
    case 'NEXT_STEP': {
      const total =
        state.sortSteps.length || state.graphSteps.length
      const next = Math.min(state.currentStep + 1, total - 1)
      const isDone = next === total - 1
      return {
        ...state,
        currentStep: next,
        playState: isDone ? 'done' : state.playState,
      }
    }
    case 'PREV_STEP':
      return {
        ...state,
        currentStep: Math.max(state.currentStep - 1, 0),
        playState: state.playState === 'done' ? 'paused' : state.playState,
      }
    case 'PLAY':
      return { ...state, playState: 'playing' }
    case 'PAUSE':
      return { ...state, playState: 'paused' }
    case 'SET_ERROR':
      return { ...state, errorMessage: action.payload, playState: 'idle' }
    case 'RESET':
      return { ...initialState, algorithm: state.algorithm }
    default:
      return state
  }
}

export function useVisualizer() {
  return useReducer(visualizerReducer, initialState)
}
