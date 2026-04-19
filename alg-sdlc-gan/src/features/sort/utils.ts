const MAX_ARRAY_SIZE = 20
const MIN_VALUE = -999
const MAX_VALUE = 999

export interface ValidateResult {
  valid: true
  array: number[]
}

export interface InvalidateResult {
  valid: false
  error: string
}

export type ValidationResult = ValidateResult | InvalidateResult

export function validateSortInput(raw: string): ValidationResult {
  if (!raw.trim()) {
    return { valid: false, error: '배열을 입력해주세요.' }
  }

  const parts = raw.split(',').map((s) => s.trim())

  if (parts.length > MAX_ARRAY_SIZE) {
    return {
      valid: false,
      error: `최대 ${MAX_ARRAY_SIZE}개까지 입력할 수 있어요.`,
    }
  }

  const nums: number[] = []
  for (const part of parts) {
    if (!/^-?\d+$/.test(part)) {
      return { valid: false, error: `'${part}'은(는) 숫자가 아니에요.` }
    }
    const n = Number(part)
    if (n < MIN_VALUE || n > MAX_VALUE) {
      return {
        valid: false,
        error: `값은 ${MIN_VALUE}~${MAX_VALUE} 범위여야 해요.`,
      }
    }
    nums.push(n)
  }

  return { valid: true, array: nums }
}

export function copyArray<T>(arr: T[]): T[] {
  return [...arr]
}
