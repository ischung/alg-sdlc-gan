import type { SortStep } from '../../types'

export type SortAlgorithm = 'bubble' | 'selection' | 'insertion'

export function computeSortSteps(
  array: number[],
  _algorithm: SortAlgorithm
): SortStep[] {
  return []
}
