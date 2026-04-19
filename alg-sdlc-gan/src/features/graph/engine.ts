import type { GraphNode, GraphEdge, GraphStep } from '../../types'

export type GraphAlgorithm = 'bfs' | 'dfs'

export interface GraphInput {
  nodes: GraphNode[]
  edges: GraphEdge[]
}

export function computeGraphSteps(
  _graph: GraphInput,
  _startNode: string,
  _algorithm: GraphAlgorithm
): GraphStep[] {
  return []
}
