import type { SortStep } from '../../types'
import { copyArray } from './utils'

export type SortAlgorithm = 'bubble' | 'selection' | 'insertion'

export function computeSortSteps(
  _array: number[],
  algorithm: SortAlgorithm
): SortStep[] {
  switch (algorithm) {
    case 'bubble':
      return computeBubbleSteps(_array)
    case 'selection':
      return computeSelectionSteps(_array)
    case 'insertion':
      return computeInsertionSteps(_array)
  }
}

function computeBubbleSteps(input: number[]): SortStep[] {
  const arr = copyArray(input)
  const steps: SortStep[] = []
  const sorted: number[] = []
  const n = arr.length

  steps.push({ array: copyArray(arr), comparing: null, swapped: null, sorted: [] })

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - 1 - i; j++) {
      steps.push({
        array: copyArray(arr),
        comparing: [j, j + 1],
        swapped: null,
        sorted: copyArray(sorted),
      })

      if (arr[j] > arr[j + 1]) {
        ;[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
        steps.push({
          array: copyArray(arr),
          comparing: null,
          swapped: [j, j + 1],
          sorted: copyArray(sorted),
        })
      }
    }
    sorted.unshift(n - 1 - i)
  }
  sorted.unshift(0)

  steps.push({ array: copyArray(arr), comparing: null, swapped: null, sorted: [...Array(n).keys()] })
  return steps
}

function computeSelectionSteps(input: number[]): SortStep[] {
  const arr = copyArray(input)
  const steps: SortStep[] = []
  const sorted: number[] = []
  const n = arr.length

  steps.push({ array: copyArray(arr), comparing: null, swapped: null, sorted: [] })

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i
    for (let j = i + 1; j < n; j++) {
      steps.push({
        array: copyArray(arr),
        comparing: [minIdx, j],
        swapped: null,
        sorted: copyArray(sorted),
      })
      if (arr[j] < arr[minIdx]) minIdx = j
    }
    if (minIdx !== i) {
      ;[arr[i], arr[minIdx]] = [arr[minIdx], arr[i]]
      steps.push({
        array: copyArray(arr),
        comparing: null,
        swapped: [i, minIdx],
        sorted: copyArray(sorted),
      })
    }
    sorted.push(i)
  }
  sorted.push(n - 1)

  steps.push({ array: copyArray(arr), comparing: null, swapped: null, sorted: [...Array(n).keys()] })
  return steps
}

function computeInsertionSteps(input: number[]): SortStep[] {
  const arr = copyArray(input)
  const steps: SortStep[] = []
  const n = arr.length

  steps.push({ array: copyArray(arr), comparing: null, swapped: null, sorted: [0] })

  for (let i = 1; i < n; i++) {
    let j = i
    steps.push({
      array: copyArray(arr),
      comparing: [i, j - 1],
      swapped: null,
      sorted: [...Array(i).keys()],
    })

    while (j > 0 && arr[j - 1] > arr[j]) {
      ;[arr[j - 1], arr[j]] = [arr[j], arr[j - 1]]
      steps.push({
        array: copyArray(arr),
        comparing: null,
        swapped: [j - 1, j],
        sorted: [...Array(i).keys()],
      })
      j--
    }
  }

  steps.push({ array: copyArray(arr), comparing: null, swapped: null, sorted: [...Array(n).keys()] })
  return steps
}
