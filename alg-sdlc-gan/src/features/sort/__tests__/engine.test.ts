import { describe, it, expect } from 'vitest'
import { computeSortSteps } from '../engine'

describe('computeSortSteps', () => {
  it('더미 구현은 빈 배열을 반환한다', () => {
    expect(computeSortSteps([3, 1, 2], 'bubble')).toEqual([])
    expect(computeSortSteps([5], 'selection')).toEqual([])
    expect(computeSortSteps([], 'insertion')).toEqual([])
  })
})
