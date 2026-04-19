function App() {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="mx-auto max-w-6xl p-4">
        {/* AlgorithmSelector 영역 */}
        <div
          id="algorithm-selector"
          className="mb-4 rounded-lg border border-slate-700 bg-slate-800 p-4"
        />

        <div className="flex flex-col gap-4 md:flex-row">
          {/* VisualizationCanvas 영역 */}
          <div
            id="visualization-canvas"
            className="flex-1 rounded-lg border border-slate-700 bg-slate-800 p-4"
          />

          {/* StepControls 영역 */}
          <div
            id="step-controls"
            className="rounded-lg border border-slate-700 bg-slate-800 p-4 md:w-64"
          />
        </div>
      </div>
    </div>
  )
}

export default App
