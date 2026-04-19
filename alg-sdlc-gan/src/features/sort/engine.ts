import type { SortStep } from '../../types'

export type SortAlgorithm = 'bubble' | 'selection' | 'insertion'

export function computeSortSteps(
  _array: number[],
  _algorithm: SortAlgorithm
): SortStep[] {
  return []
}
