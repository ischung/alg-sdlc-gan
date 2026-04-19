import { describe, it, expect } from 'vitest'
import { validateSortInput, copyArray } from '../utils'

describe('validateSortInput', () => {
  it('유효 입력을 파싱한다', () => {
    const result = validateSortInput('5,3,8,1')
    expect(result).toEqual({ valid: true, array: [5, 3, 8, 1] })
  })

  it('빈 입력에 에러를 반환한다', () => {
    const result = validateSortInput('  ')
    expect(result.valid).toBe(false)
  })

  it('문자 포함 시 에러를 반환한다', () => {
    const result = validateSortInput('1,a,3')
    expect(result.valid).toBe(false)
  })

  it('범위 초과 시 에러를 반환한다', () => {
    const result = validateSortInput('1,1000,3')
    expect(result.valid).toBe(false)
  })
})

describe('copyArray', () => {
  it('반환 배열이 원본과 참조가 다르다', () => {
    const original = [1, 2, 3]
    const copy = copyArray(original)
    expect(copy).toEqual(original)
    expect(copy).not.toBe(original)
  })
})
