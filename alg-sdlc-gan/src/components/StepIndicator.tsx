interface Props {
  currentStep: number
  total: number
}

export function StepIndicator({ currentStep, total }: Props) {
  if (total === 0) return null
  return (
    <p className="text-sm text-slate-400" aria-live="polite">
      스텝 {currentStep + 1} / {total}
    </p>
  )
}
