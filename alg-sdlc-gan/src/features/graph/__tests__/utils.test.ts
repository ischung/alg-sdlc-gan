import { describe, it, expect } from 'vitest'
import { validateGraphInput, normalizeCoordinates } from '../utils'

describe('validateGraphInput', () => {
  it('노드 1개 입력 시 에러를 반환한다', () => {
    const result = validateGraphInput([{ id: 'A', x: 0, y: 0 }], [], 'A')
    expect(result.valid).toBe(false)
  })

  it('존재하지 않는 시작 노드 입력 시 에러를 반환한다', () => {
    const nodes = [
      { id: 'A', x: 0, y: 0 },
      { id: 'B', x: 1, y: 1 },
    ]
    const result = validateGraphInput(nodes, [], 'Z')
    expect(result.valid).toBe(false)
  })

  it('유효한 그래프를 파싱한다', () => {
    const nodes = [
      { id: 'A', x: 0, y: 0 },
      { id: 'B', x: 1, y: 1 },
    ]
    const result = validateGraphInput(nodes, [{ from: 'A', to: 'B' }], 'A')
    expect(result.valid).toBe(true)
  })
})

describe('normalizeCoordinates', () => {
  it('노드 좌표를 0.0~1.0 범위로 변환한다', () => {
    const nodes = [
      { id: 'A', x: 0, y: 0 },
      { id: 'B', x: 100, y: 200 },
    ]
    const result = normalizeCoordinates(nodes)
    expect(result[0].x).toBe(0)
    expect(result[0].y).toBe(0)
    expect(result[1].x).toBe(1)
    expect(result[1].y).toBe(1)
  })
})
