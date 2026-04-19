import { describe, it, expect } from 'vitest'
import { computeGraphSteps } from '../engine'

describe('computeGraphSteps', () => {
  it('더미 구현은 빈 배열을 반환한다', () => {
    const graph = { nodes: [{ id: 'A', x: 0, y: 0 }], edges: [] }
    expect(computeGraphSteps(graph, 'A', 'bfs')).toEqual([])
    expect(computeGraphSteps(graph, 'A', 'dfs')).toEqual([])
  })
})
