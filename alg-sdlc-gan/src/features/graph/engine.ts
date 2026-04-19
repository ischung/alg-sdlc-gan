import type { GraphNode, GraphEdge, GraphStep } from '../../types'

export type GraphAlgorithm = 'bfs' | 'dfs'

export interface GraphInput {
  nodes: GraphNode[]
  edges: GraphEdge[]
}

export function computeGraphSteps(
  graph: GraphInput,
  startNode: string,
  algorithm: GraphAlgorithm
): GraphStep[] {
  if (algorithm === 'bfs') return computeBfsSteps(graph, startNode)
  return computeDfsSteps(graph, startNode)
}

function buildAdjList(edges: GraphEdge[]): Map<string, string[]> {
  const adj = new Map<string, string[]>()
  for (const { from, to } of edges) {
    if (!adj.has(from)) adj.set(from, [])
    if (!adj.has(to)) adj.set(to, [])
    adj.get(from)!.push(to)
    adj.get(to)!.push(from)
  }
  return adj
}

function computeBfsSteps(graph: GraphInput, startNode: string): GraphStep[] {
  const steps: GraphStep[] = []
  const adj = buildAdjList(graph.edges)
  graph.nodes.forEach((n) => { if (!adj.has(n.id)) adj.set(n.id, []) })

  const visited: string[] = []
  const queue: string[] = [startNode]
  const seen = new Set([startNode])

  steps.push({ visited: [], current: null, queue: [startNode], activeEdge: null })

  while (queue.length > 0) {
    const node = queue.shift()!
    visited.push(node)

    steps.push({
      visited: [...visited],
      current: node,
      queue: [...queue],
      activeEdge: null,
    })

    for (const neighbor of adj.get(node) ?? []) {
      if (!seen.has(neighbor)) {
        seen.add(neighbor)
        queue.push(neighbor)
        steps.push({
          visited: [...visited],
          current: node,
          queue: [...queue],
          activeEdge: [node, neighbor],
        })
      }
    }
  }

  steps.push({ visited: [...visited], current: null, queue: [], activeEdge: null })
  return steps
}

function computeDfsSteps(graph: GraphInput, startNode: string): GraphStep[] {
  const steps: GraphStep[] = []
  const adj = buildAdjList(graph.edges)
  graph.nodes.forEach((n) => { if (!adj.has(n.id)) adj.set(n.id, []) })

  const visited: string[] = []
  const seen = new Set<string>()

  function dfs(node: string, parentEdge: [string, string] | null) {
    seen.add(node)
    visited.push(node)
    steps.push({
      visited: [...visited],
      current: node,
      stack: [...visited],
      activeEdge: parentEdge,
    })

    for (const neighbor of adj.get(node) ?? []) {
      if (!seen.has(neighbor)) {
        steps.push({
          visited: [...visited],
          current: node,
          stack: [...visited],
          activeEdge: [node, neighbor],
        })
        dfs(neighbor, [node, neighbor])
      }
    }
  }

  steps.push({ visited: [], current: null, stack: [], activeEdge: null })
  dfs(startNode, null)
  steps.push({ visited: [...visited], current: null, stack: [], activeEdge: null })
  return steps
}
