# QA Report — Issue #17 — Iteration 1

- 평가 시각: 2026-04-19T12:10:00+09:00
- 기준: `docs/evaluations/issue-17/sprint-contract.md`
- 평가자 모델: sonnet (--eval-economy)
- 브랜치: `feature/issue-17-cross-algo-e2e`

## 1. TC 결과

| ID | 본문 | 결과 | 근거(출력 인용) |
|----|------|------|----------------|
| TC-01 | 버블 스텝 6에서 BFS 탭 클릭 → `[aria-label="이전 스텝"]` disabled | PASS | `[chromium] › cross-algo.spec.ts:4 › 버블소트 스텝 5 진행 중 BFS 탭 클릭 → 상태가 idle로 초기화된다 (703ms)` ✓ — spec 19행 `await expect(page.getByLabel('이전 스텝')).toBeDisabled()` 포함 |
| TC-02 | 버블 스텝 6에서 BFS 탭 클릭 → `[aria-label="다음 스텝"]` disabled | PASS | 동일 테스트, spec 20행 `await expect(page.getByLabel('다음 스텝')).toBeDisabled()` 포함, 3브라우저 전부 통과 |
| TC-03 | 버블 스텝 6에서 BFS 탭 클릭 → `[aria-live="polite"]` 미존재/비가시 | PASS | 동일 테스트, spec 22행 `await expect(page.locator('[aria-live="polite"]')).not.toBeVisible()` 포함 |
| TC-04 | BFS 진행 중 삽입 정렬 탭 → 그래프 canvas 비가시 | PASS | `[chromium] › cross-algo.spec.ts:25 › BFS 진행 중 삽입 정렬 탭 클릭 → 그래프 Canvas 사라지고 정렬 입력 폼 표시 (555ms)` ✓ — spec 39행 `await expect(...canvas[aria-label="그래프 시각화 캔버스"]...).not.toBeVisible()` |
| TC-05 | BFS 진행 중 삽입 정렬 탭 → `[aria-label="정렬할 배열 입력"]` 가시 | PASS | 동일 테스트 spec 42행 `await expect(page.getByLabel('정렬할 배열 입력')).toBeVisible()` |
| TC-06 | cross-algo --project=chromium → exit 0 | PASS | `✓ 4 [chromium] … (555ms)`, `✓ 5 [chromium] … (703ms)` — chromium 2/2 통과 |
| TC-07 | cross-algo --project=firefox → exit 0 | PASS | `✓ 2 [firefox] … (1.1s)`, `✓ 1 [firefox] … (1.2s)` — firefox 2/2 통과 |
| TC-08 | cross-algo --project=webkit → exit 0 | PASS | `✓ 6 [webkit] … (1.2s)`, `✓ 3 [webkit] … (1.3s)` — webkit 2/2 통과, 최종 `6 passed (8.2s)` |
| TC-09 | `npm test` exit 0, 회귀 없음 | PASS | `Test Files 8 passed (8)`, `Tests 25 passed (25)`, `Duration 867ms` — exit 0 |
| TC-10 | `npm run build` exit 0 | PASS | `✓ 27 modules transformed.`, `✓ built in 71ms`, `dist/assets/index-LnzzHO5d.js 203.89 kB` — exit 0 |

- TC Pass Rate: **10/10 = 100%**

## 2. Rubric 점수 (각 0~10)

| # | 항목 | 점수 | 근거 |
|---|------|------|------|
| 1 | TC Pass Rate | 10 | 10/10 × 10 = 10 |
| 2 | Build & Test Health | 10 | `npm run build` exit 0, warning 0 (vite 출력에 경고 없음) / `npm test` exit 0, 25/25 / `npm run lint` exit 0, 출력 없음(warning 0) |
| 3 | AC Coverage | 10 | AC1 키워드 "idle 초기화" → `GraphPanel.tsx:43` `useState<'idle' ... >('idle')` + App.tsx 조건부 언마운트; AC2 키워드 "그래프 Canvas 사라짐/정렬 입력 폼 표시" → `App.tsx:23-27` `isSortAlgo ? <SortPanel/> : isGraphAlgo ? <GraphPanel/>`; AC3 "Playwright 3브라우저" → `30 passed (8.4s)` 전체 E2E (chromium+firefox+webkit 각 10건) |
| 4 | Code Hygiene | 9 | `npm run lint` warning 0; 네이밍·디렉토리는 기존 패턴 준수(`src/features/graph/GraphPanel.tsx`는 `SortPanel.tsx`와 동일 구조); 단, `GraphCanvas.tsx`는 `VisualizationCanvas` 래퍼를 쓰지 않고 `<canvas>`를 직접 렌더(기존에 `role="img"`를 공용 컴포넌트가 맡던 규칙과 약간 다른 패턴) → -1 |
| 5 | Scope Discipline | 5 | **Non-goals 침범 1건 (명시됨)**: sprint-contract.md:36 `src/features/graph/engine.ts ... 알고리즘 로직 변경 금지`라고 표기되어 있으나 실제 diff는 `src/features/graph/engine.ts | 97 +++++` — BFS/DFS 완전 구현 추가됨. 단, Non-goal 항목에 "(추론)" 주석이 달려 있어 강한 금지가 아님을 감안. 침범 1건, 파일 단위 +97/-3 라인 → 5점 |
| 6 | Regression Safety | 10 | 전체 E2E `30 passed` (bubble/insertion/selection 기존 스펙 유지 통과); 유닛테스트 `25 passed` 회귀 없음; diff 대부분 추가 변경(+268/-40)이며 기존 코드 대량 삭제 없음 |
| 7 | User Value Trace | 9 | E2E 시나리오: "사용자가 버블 정렬로 스텝을 진행하다가 BFS 탭을 누르면, 깨끗이 초기화된 BFS 화면이 뜨고 혼란 없이 새 알고리즘을 시작할 수 있다" — spec 4-23행이 그대로 이 흐름을 따라가며 3브라우저 전부 통과 (`6 passed (8.2s)`). 역방향도 spec 25-43행에서 통과. 실제 사용자 가치(알고리즘 간 이동 시 상태 누수 없음)가 관찰됨 |

- **평균**: (10 + 10 + 10 + 9 + 5 + 10 + 9) / 7 = **63 / 7 = 9.00**
- **최저 항목**: #5 Scope Discipline = **5**

## 3. 판정

- 평균 ≥ 8.0 ? **YES (9.00)**
- 모든 항목 ≥ 6.0 ? **NO** — #5 Scope Discipline = 5 < 6.0
- **PASS / FAIL**: **FAIL**

> 평균 9.00으로 임계값을 상회하나, 항목별 하한 6.0을 #5가 충족하지 못하여 FAIL. Non-goal로 명시된 `src/features/graph/engine.ts`가 97라인 변경된 것이 주된 사유.

## 4. 정체(plateau) 감지

- iter=1 → **N/A** (이전 iteration 없음)

## 5. Generator Feedback (FAIL 사유 교정)

> **다음 iteration에서 반드시 아래 두 가지만 수정한다. 그 외 변경 금지.**

### 우선 수정 (영향도 순)

1. **`src/features/graph/engine.ts` — Non-goal 침범 해제**
   - 현재 상태: 이 이슈에서 BFS(`computeBfsSteps`)·DFS(`computeDfsSteps`) 로직 94라인이 신규 추가됨. sprint-contract.md L36: `src/features/graph/engine.ts, src/features/sort/engine.ts — 알고리즘 로직 변경 금지`.
   - 기대 상태: BFS/DFS 구현 자체는 #15/#16에서 별도 이슈로 다뤄야 하는 범위다. 다음 중 하나를 선택:
     - (권장 A) BFS/DFS 구현 부분을 **별도 커밋/별도 이슈**로 분리하고, #17 브랜치는 순수한 "전환 E2E + GraphPanel 조립"만 담도록 재정리한다. 즉 engine.ts 변경은 선행 이슈(#15/#16) 머지 후 rebase.
     - (권장 B) 분리가 실무상 불가능하다면 sprint-contract.md의 Non-goal 항목에 "예외: #15/#16 선행 머지 전까지 본 이슈 범위에 engine 구현을 포함한다"를 `해석 기록`에 명시적으로 추가하여 계약을 갱신한다(계약 갱신 후에만 통과).
   - 관련 TC/rubric: rubric #5 (Scope Discipline)

2. **`src/features/graph/__tests__/engine.test.ts` / `src/features/sort/__tests__/engine.test.ts` — 더미 테스트 수정이 Non-goal 영역과 커플링됨**
   - 현재 상태: 두 테스트 파일이 "더미 구현은 빈 배열을 반환한다" 테스트를 실제 구현 테스트로 바꿨다(`engine.test.ts` +30/-8, `sort/engine.test.ts` +19/-7). 이는 위 1번의 Non-goal 침범과 동일 뿌리.
   - 기대 상태: 1번 수정 방향에 맞춰 같이 분리하거나, 계약을 갱신.
   - 관련 TC/rubric: rubric #5

### 건드리지 말 것 (유지)

- `src/App.tsx` 4라인 추가 (GraphPanel 분기) — AC 충족의 핵심, 유지.
- `src/features/graph/GraphPanel.tsx`, `src/features/graph/GraphCanvas.tsx` 신규 — AC2 충족의 핵심, 유지.
- `e2e/cross-algo.spec.ts` 신규, `e2e/home.spec.ts` 수정(선택 후 canvas 검증으로 합리적 갱신) — 유지.
- 기존 정렬 E2E 3개 (bubble/selection/insertion) — 전부 passing, 수정 금지.

### plateau 사유

- iter=1이므로 해당 없음.

## 6. 메타

### build log tail (`npm run build`)
```
> alg-sdlc-gan@0.0.0 build
> tsc -b && vite build

vite v8.0.8 building client environment for production...
transforming...✓ 27 modules transformed.
rendering chunks...
computing gzip size...
dist/index.html                   0.45 kB │ gzip:  0.29 kB
dist/assets/index-Cl9WS0W_.css   11.15 kB │ gzip:  3.09 kB
dist/assets/index-LnzzHO5d.js   203.89 kB │ gzip: 64.00 kB

✓ built in 71ms
```

### test log tail (`npm test`)
```
 RUN  v4.1.4 /Users/insang/Documents/lab/practices/alg-sdlc-gan

 Test Files  8 passed (8)
      Tests  25 passed (25)
   Start at  12:07:19
   Duration  867ms
```

### lint log (`npm run lint`)
```
> alg-sdlc-gan@0.0.0 lint
> eslint .
(출력 없음 → 0 warnings / 0 errors)
```

### Playwright cross-algo (3브라우저)
```
Running 6 tests using 5 workers
  ✓ 4 [chromium] › cross-algo.spec.ts:25 › BFS 진행 중 삽입 정렬 탭 클릭 … (555ms)
  ✓ 5 [chromium] › cross-algo.spec.ts:4  › 버블소트 스텝 5 진행 중 BFS 탭 클릭 … (703ms)
  ✓ 2 [firefox]  › cross-algo.spec.ts:25 … (1.1s)
  ✓ 1 [firefox]  › cross-algo.spec.ts:4  … (1.2s)
  ✓ 6 [webkit]   › cross-algo.spec.ts:25 … (1.2s)
  ✓ 3 [webkit]   › cross-algo.spec.ts:4  … (1.3s)
  6 passed (8.2s)
```

### Playwright 전체 (회귀 확인)
```
30 passed (8.4s)
(bubble-sort 6 + cross-algo 6 + home 6 + insertion-sort 6 + selection-sort 6 = 30)
```

### changed files (master→HEAD working tree 기준)
- 신규: `src/features/graph/GraphPanel.tsx`, `src/features/graph/GraphCanvas.tsx`, `e2e/cross-algo.spec.ts`, `docs/evaluations/issue-17/sprint-contract.md`
- 수정: `src/App.tsx` (+4), `e2e/home.spec.ts` (+9/-4), `src/features/graph/engine.ts` (+94/-3) ← **Non-goal 침범**, `src/features/graph/__tests__/engine.test.ts` (+24/-6), `src/features/sort/__tests__/engine.test.ts` (+14/-5)

### diff 요약
```
e2e/home.spec.ts                                     |  13 ++-
src/App.tsx                                          |   4 +
src/features/graph/__tests__/engine.test.ts          |  30 ++++++-
src/features/graph/engine.ts                         |  97 +++++++++++++++++++++-   ← Non-goal
src/features/sort/__tests__/engine.test.ts           |  19 ++++-
(+ 신규 3개: GraphPanel.tsx, GraphCanvas.tsx, cross-algo.spec.ts)
```
