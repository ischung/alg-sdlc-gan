export type Algorithm =
  | 'bubble'
  | 'selection'
  | 'insertion'
  | 'bfs'
  | 'dfs'
  | null

export type PlayState = 'idle' | 'playing' | 'paused' | 'done'

export interface SortStep {
  array: number[]
  comparing: [number, number] | null
  swapped: [number, number] | null
  sorted: number[]
}

export interface GraphNode {
  id: string
  x: number
  y: number
}

export interface GraphEdge {
  from: string
  to: string
}

export interface GraphStep {
  visited: string[]
  current: string | null
  queue?: string[]
  stack?: string[]
  activeEdge: [string, string] | null
}

export interface VisualizerState {
  algorithm: Algorithm
  playState: PlayState
  currentStep: number
  sortSteps: SortStep[]
  graphSteps: GraphStep[]
  inputValue: string
  startNode: string
  errorMessage: string | null
}

export type VisualizerAction =
  | { type: 'SET_ALGORITHM'; payload: Algorithm }
  | { type: 'SET_SORT_STEPS'; payload: SortStep[] }
  | { type: 'SET_GRAPH_STEPS'; payload: GraphStep[] }
  | { type: 'SET_INPUT'; payload: string }
  | { type: 'SET_START_NODE'; payload: string }
  | { type: 'NEXT_STEP' }
  | { type: 'PREV_STEP' }
  | { type: 'PLAY' }
  | { type: 'PAUSE' }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'RESET' }
