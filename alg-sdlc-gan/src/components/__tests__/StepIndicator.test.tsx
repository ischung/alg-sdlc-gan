import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { StepIndicator } from '../StepIndicator'

describe('StepIndicator', () => {
  it('currentStep=2, total=10이면 "스텝 3 / 10"을 표시한다', () => {
    render(<StepIndicator currentStep={2} total={10} />)
    expect(screen.getByText('스텝 3 / 10')).toBeDefined()
  })

  it('total=0이면 아무것도 렌더링하지 않는다', () => {
    const { container } = render(<StepIndicator currentStep={0} total={0} />)
    expect(container.firstChild).toBeNull()
  })
})
