import { useState } from 'react'
import { AlgorithmSelector } from './components/AlgorithmSelector'
import { SortPanel } from './features/sort/SortPanel'
import { GraphPanel } from './features/graph/GraphPanel'
import type { Algorithm } from './types'

function App() {
  const [algorithm, setAlgorithm] = useState<Algorithm>(null)

  const isSortAlgo = algorithm === 'bubble' || algorithm === 'selection' || algorithm === 'insertion'
  const isGraphAlgo = algorithm === 'bfs' || algorithm === 'dfs'

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="mx-auto max-w-4xl p-4 flex flex-col gap-4">
        {/* AlgorithmSelector 영역 */}
        <div className="rounded-lg border border-slate-700 bg-slate-800 p-4">
          <AlgorithmSelector current={algorithm} onSelect={setAlgorithm} />
        </div>

        {/* 메인 콘텐츠 */}
        <div className="rounded-lg border border-slate-700 bg-slate-800 p-4">
          {isSortAlgo ? (
            <SortPanel algorithm={algorithm} />
          ) : isGraphAlgo ? (
            <GraphPanel algorithm={algorithm} />
          ) : (
            <div className="flex items-center justify-center h-40 text-slate-500 text-sm">
              위에서 알고리즘을 선택하세요
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default App
