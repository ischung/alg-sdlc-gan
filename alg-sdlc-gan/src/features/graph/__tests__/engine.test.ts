import { describe, it, expect } from 'vitest'
import { computeGraphSteps } from '../engine'

describe('computeGraphSteps', () => {
  const graph = {
    nodes: [
      { id: 'A', x: 0, y: 0 },
      { id: 'B', x: 1, y: 0 },
      { id: 'C', x: 0.5, y: 1 },
    ],
    edges: [
      { from: 'A', to: 'B' },
      { from: 'B', to: 'C' },
    ],
  }

  it('BFS는 모든 노드를 방문하는 단계를 반환한다', () => {
    const steps = computeGraphSteps(graph, 'A', 'bfs')
    expect(steps.length).toBeGreaterThan(0)
    const last = steps[steps.length - 1]
    expect(last.visited).toContain('A')
    expect(last.visited).toContain('B')
    expect(last.visited).toContain('C')
  })

  it('DFS는 모든 노드를 방문하는 단계를 반환한다', () => {
    const steps = computeGraphSteps(graph, 'A', 'dfs')
    expect(steps.length).toBeGreaterThan(0)
    const last = steps[steps.length - 1]
    expect(last.visited).toContain('A')
  })
})
