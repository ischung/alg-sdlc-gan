import type { GraphNode, GraphEdge } from '../../types'

export interface GraphParseResult {
  valid: true
  nodes: GraphNode[]
  edges: GraphEdge[]
}

export interface GraphParseError {
  valid: false
  error: string
}

export type GraphValidationResult = GraphParseResult | GraphParseError

export function validateGraphInput(
  nodes: GraphNode[],
  edges: GraphEdge[],
  startNode: string
): GraphValidationResult {
  if (nodes.length < 2) {
    return { valid: false, error: '노드는 최소 2개 이상 필요해요.' }
  }

  const nodeIds = new Set(nodes.map((n) => n.id))

  for (const edge of edges) {
    if (!nodeIds.has(edge.from) || !nodeIds.has(edge.to)) {
      return {
        valid: false,
        error: `엣지 참조 노드(${edge.from}, ${edge.to}) 중 존재하지 않는 노드가 있어요.`,
      }
    }
  }

  if (!nodeIds.has(startNode)) {
    return { valid: false, error: `시작 노드 '${startNode}'이(가) 존재하지 않아요.` }
  }

  return { valid: true, nodes, edges }
}

export function normalizeCoordinates(nodes: GraphNode[]): GraphNode[] {
  if (nodes.length === 0) return []

  const xs = nodes.map((n) => n.x)
  const ys = nodes.map((n) => n.y)
  const minX = Math.min(...xs)
  const maxX = Math.max(...xs)
  const minY = Math.min(...ys)
  const maxY = Math.max(...ys)

  const rangeX = maxX - minX || 1
  const rangeY = maxY - minY || 1

  return nodes.map((n) => ({
    ...n,
    x: (n.x - minX) / rangeX,
    y: (n.y - minY) / rangeY,
  }))
}
