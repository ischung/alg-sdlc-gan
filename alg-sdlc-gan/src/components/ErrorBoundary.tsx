import { Component, type ReactNode } from 'react'

interface Props {
  children: ReactNode
  onReset?: () => void
}

interface State {
  hasError: boolean
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  handleReset = () => {
    this.setState({ hasError: false })
    this.props.onReset?.()
  }

  render() {
    if (this.state.hasError) {
      return <ErrorMessage onReset={this.handleReset} />
    }
    return this.props.children
  }
}

interface ErrorMessageProps {
  onReset?: () => void
}

export function ErrorMessage({ onReset }: ErrorMessageProps) {
  return (
    <div
      role="alert"
      className="flex flex-col items-center justify-center gap-4 rounded-lg bg-slate-800 p-8 text-center"
    >
      <p className="text-lg text-slate-200">
        앗, 문제가 생겼어요! 다시 시도해볼까요?
      </p>
      <button
        onClick={onReset}
        className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500"
        aria-label="다시 시작"
      >
        다시 시작
      </button>
    </div>
  )
}
