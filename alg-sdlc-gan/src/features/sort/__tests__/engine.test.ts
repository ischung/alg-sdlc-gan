import { describe, it, expect } from 'vitest'
import { computeSortSteps } from '../engine'

describe('computeSortSteps', () => {
  it('버블 정렬은 단계 배열을 반환한다', () => {
    const steps = computeSortSteps([3, 1, 2], 'bubble')
    expect(steps.length).toBeGreaterThan(0)
    const last = steps[steps.length - 1]
    expect(last.array).toEqual([1, 2, 3])
  })

  it('선택 정렬 단일 원소는 초기 스텝을 반환한다', () => {
    const steps = computeSortSteps([5], 'selection')
    expect(steps.length).toBeGreaterThan(0)
  })

  it('삽입 정렬 빈 배열은 스텝을 반환한다', () => {
    const steps = computeSortSteps([], 'insertion')
    expect(Array.isArray(steps)).toBe(true)
  })
})
