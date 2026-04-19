import type { Algorithm } from '../types'

type SortAlgo = 'bubble' | 'selection' | 'insertion'
type GraphAlgo = 'bfs' | 'dfs'

const SORT_TABS: { id: SortAlgo; label: string }[] = [
  { id: 'bubble', label: '버블 정렬' },
  { id: 'selection', label: '선택 정렬' },
  { id: 'insertion', label: '삽입 정렬' },
]

const GRAPH_TABS: { id: GraphAlgo; label: string }[] = [
  { id: 'bfs', label: 'BFS' },
  { id: 'dfs', label: 'DFS' },
]

interface Props {
  current: Algorithm
  onSelect: (algo: Algorithm) => void
}

export function AlgorithmSelector({ current, onSelect }: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      <span className="text-sm text-slate-400 self-center mr-2">정렬:</span>
      {SORT_TABS.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onSelect(tab.id)}
          aria-label={`${tab.label} 선택`}
          aria-pressed={current === tab.id}
          className={`rounded-md px-3 py-1 text-sm font-medium transition-colors ${
            current === tab.id
              ? 'bg-indigo-600 text-white'
              : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
          }`}
        >
          {tab.label}
        </button>
      ))}
      <span className="text-sm text-slate-400 self-center ml-4 mr-2">그래프:</span>
      {GRAPH_TABS.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onSelect(tab.id)}
          aria-label={`${tab.label} 선택`}
          aria-pressed={current === tab.id}
          className={`rounded-md px-3 py-1 text-sm font-medium transition-colors ${
            current === tab.id
              ? 'bg-indigo-600 text-white'
              : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}
