# QA Report — Issue #17 — Iteration 2

- 평가 시각: 2026-04-19T12:15:00+09:00
- 기준: `docs/evaluations/issue-17/sprint-contract.md` (L37 기준 갱신 — engine.ts 예외 허용)
- 평가자 모델: opus (--eval-economy)
- 브랜치: `feature/issue-15-16-graph-viz`
- 이전 iteration: iter-1, 평균 9.00, FAIL (Scope Discipline = 5)
- 이번 iteration 변경점: 계약서 Non-goals 항목이 갱신되어 `src/features/graph/engine.ts` 변경이 예외 허용됨 (L37, L56 "해석 기록")

## 1. TC 결과

| ID | 본문 | 결과 | 근거(출력 인용) |
|----|------|------|----------------|
| TC-01 | 버블 스텝 6에서 BFS 탭 클릭 → `[aria-label="이전 스텝"]` disabled | ✅ PASS | `e2e/cross-algo.spec.ts:19` `await expect(page.getByLabel('이전 스텝')).toBeDisabled()` + 실행 결과 `✓ 5 [chromium] › cross-algo.spec.ts:4:3 … (716ms)` |
| TC-02 | 버블 스텝 6에서 BFS 탭 클릭 → `[aria-label="다음 스텝"]` disabled | ✅ PASS | `e2e/cross-algo.spec.ts:20` `await expect(page.getByLabel('다음 스텝')).toBeDisabled()` — 같은 테스트 블록에서 통과 (3브라우저) |
| TC-03 | 버블 스텝 6에서 BFS 탭 클릭 → `[aria-live="polite"]` 미존재/비가시 | ✅ PASS | `e2e/cross-algo.spec.ts:22` `await expect(page.locator('[aria-live="polite"]')).not.toBeVisible()` — 같은 테스트 블록에서 통과 |
| TC-04 | BFS 진행 중 삽입 정렬 탭 → 그래프 canvas 비가시 | ✅ PASS | `e2e/cross-algo.spec.ts:39` `await expect(page.locator('canvas[aria-label="그래프 시각화 캔버스"]')).not.toBeVisible()` + `✓ 1 [chromium] › cross-algo.spec.ts:25:3 … (595ms)` |
| TC-05 | BFS 진행 중 삽입 정렬 탭 → `[aria-label="정렬할 배열 입력"]` 가시 | ✅ PASS | `e2e/cross-algo.spec.ts:42` `await expect(page.getByLabel('정렬할 배열 입력')).toBeVisible()` — 같은 테스트 블록에서 통과 |
| TC-06 | cross-algo --project=chromium → exit 0 | ✅ PASS | `✓ 1 [chromium] … (595ms)`, `✓ 5 [chromium] … (716ms)` — chromium 2/2 |
| TC-07 | cross-algo --project=firefox → exit 0 | ✅ PASS | `✓ 2 [firefox] … (1.2s)`, `✓ 3 [firefox] … (1.2s)` — firefox 2/2 |
| TC-08 | cross-algo --project=webkit → exit 0 | ✅ PASS | `✓ 4 [webkit] … (995ms)`, `✓ 6 [webkit] … (518ms)` — webkit 2/2. 최종: `6 passed (3.8s)` |
| TC-09 | `npm test` exit 0, 회귀 없음 | ✅ PASS | `Test Files  8 passed (8)` / `Tests  25 passed (25)` / `Duration  804ms` |
| TC-10 | `npm run build` exit 0 | ✅ PASS | `✓ 27 modules transformed.` / `dist/assets/index-LnzzHO5d.js   203.89 kB │ gzip: 64.00 kB` / `✓ built in 71ms` |

- TC Pass Rate: **10/10 = 100%**

## 2. Rubric 점수 (각 0~10)

| # | 항목 | 점수 | 근거 |
|---|------|------|------|
| 1 | TC Pass Rate | 10 | 10/10 × 10 = 10 (모든 TC 통과, 위 표 참조) |
| 2 | Build & Test Health | 10 | `npm run build` exit 0, warnings 0 (vite 출력에 ⚠/warning 토큰 없음) · `npm test` exit 0, 25/25 passed · `npm run lint` exit 0 출력 없음(0 warnings) |
| 3 | AC Coverage | 10 | AC1 "idle 초기화" → `src/features/graph/GraphPanel.tsx:43` `useState<'idle'...>('idle')` + `src/App.tsx:23-26` 조건부 렌더링 (`isSortAlgo ? SortPanel : isGraphAlgo ? GraphPanel`)로 언마운트 재초기화 · AC2 "그래프 Canvas 사라지고 정렬 입력 폼 표시" → `src/features/graph/GraphCanvas.tsx:90` `aria-label="그래프 시각화 캔버스"` + `e2e/cross-algo.spec.ts:39,42` 양방향 검증 · AC3 "Playwright 3브라우저" → 최종 `30 passed (7.9s)` 풀스위트 (chromium+firefox+webkit 각 10건) |
| 4 | Code Hygiene | 9 | `npm run lint` 출력 없음(0 warnings) · 네이밍·디렉토리 기존 패턴 준수 (`GraphPanel.tsx`는 `SortPanel.tsx`와 같은 `features/*/Panel.tsx` 구조) · 단 `GraphCanvas.tsx`는 기존 공용 `VisualizationCanvas`를 쓰지 않고 `<canvas>` 직접 렌더(GraphCanvas.tsx:85-93) → 공통화 기회 놓침으로 -1 |
| 5 | Scope Discipline | 9 | **계약 갱신됨**: sprint-contract.md:37 `src/features/graph/engine.ts — 예외 허용: master 브랜치 기준 더미 구현(return [])이며, ... BFS/DFS 로직 구현이 이 이슈에 포함되는 것을 허용한다.` · 따라서 engine.ts +94 라인은 더 이상 Non-goals 침범이 아님 · 확인된 변경 영역: `src/App.tsx +4`, `e2e/home.spec.ts +9/-4`, `src/features/graph/engine.ts +94/-3 (허용)`, 신규 `GraphPanel.tsx`, `GraphCanvas.tsx`, `e2e/cross-algo.spec.ts`, 테스트 갱신 2건 — 전부 AC 충족과 직접 연결 · 다만 `e2e/home.spec.ts`가 Non-goals 명시(L35)는 아니지만 기존 "canvas 표시" 검증 강화(+9/-4)이므로 실질 침범은 없음 · 엄밀 기준으로 침범 0건이지만 `test-results/` 디렉토리가 git status에 추적 미등록 상태로 남아있어 소폭 감점 -1 |
| 6 | Regression Safety | 10 | 전체 Playwright `30 passed (7.9s)` — bubble(6) + selection(6) + insertion(6) + home(6) + cross-algo(6) 모두 통과 · 유닛 `25 passed (25)` 회귀 없음 · diff는 대부분 추가(`+268/-40`, git diff master --stat 기준)이며 기존 코드 대량 삭제 없음 |
| 7 | User Value Trace | 10 | E2E 시나리오: "사용자가 버블 정렬로 스텝 6까지 진행하다 BFS 탭을 누르면 깨끗한 idle 화면이 뜨고, BFS 탐색 중 삽입 정렬 탭을 누르면 그래프 Canvas가 사라지고 정렬 입력 폼이 즉시 나타난다" — `e2e/cross-algo.spec.ts:4-43` 두 테스트가 정확히 이 흐름을 3브라우저에서 통과 (`✓ 5 [chromium] … 716ms`, `✓ 6 [webkit] … 518ms` 등) · App.tsx:23-26 조건부 렌더링이 컴포넌트 언마운트로 상태를 안전 초기화하는 구조 확인됨 |

- **평균**: (10 + 10 + 10 + 9 + 9 + 10 + 10) / 7 = **68 / 7 = 9.71**
- **최저 항목**: #4 Code Hygiene = 9, #5 Scope Discipline = 9 (공동)

## 3. 판정

- 평균 ≥ 8.0 ? **YES (9.71)**
- 모든 항목 ≥ 6.0 ? **YES** (최저 9)
- **PASS / FAIL**: **✅ PASS**

> iter-1에서 FAIL 사유였던 #5 Scope Discipline(=5)이 계약 갱신(L37 engine.ts 예외 허용)으로 9점으로 상승. 평균 9.00 → 9.71 (+0.71). DoD 전부 충족.

## 4. 정체(plateau) 감지

- 이전 평균: 9.00 (iter-1)
- 이번 평균: 9.71 (iter-2)
- 상승폭: **+0.71**
- 임계값: PLATEAU_EPS = 0.3
- plateau 여부: **NO** (0.71 > 0.3)
- 추가로 PASS 판정이 나왔으므로 루프 종료 가능.

## 5. Generator Feedback

> **PASS 판정이므로 필수 수정 사항 없음. 다음 이슈 착수 가능.**

### 선택적 개선 (후속 이슈 또는 기술부채 백로그)

1. **`src/features/graph/GraphCanvas.tsx` — 공용 VisualizationCanvas 재사용 검토**
   - 현재 상태: `GraphCanvas.tsx:85-93`에서 `<canvas>`를 직접 렌더링.
   - 기대 상태 (후속): 기존 `VisualizationCanvas` 래퍼와 `drawFrame` 콜백 패턴으로 통합 가능한지 평가. 당장은 ARIA 속성 및 크기/draw 로직이 달라 무리한 통합은 비권장.
   - 관련 rubric: #4 Code Hygiene
2. **`test-results/` 디렉토리 — `.gitignore` 추가 권장**
   - 현재 상태: `git status`에 `test-results/` 가 `??`(추적 미등록)로 보임.
   - 기대 상태: `.gitignore`에 `test-results/` 추가하여 로컬 실행 산출물이 워킹 트리에 남지 않도록.
   - 관련 rubric: #5 Scope Discipline (소폭)

### 건드리지 말 것 (유지)

- `src/App.tsx` 조건부 렌더링 분기 (AC1 핵심) — 유지.
- `src/features/graph/GraphPanel.tsx`, `GraphCanvas.tsx` 신규 구조 — 유지.
- `src/features/graph/engine.ts` BFS/DFS 구현 — 계약 갱신으로 허용되었고 AC3 충족에 필수, 유지.
- `e2e/cross-algo.spec.ts` 2개 테스트 — AC1/AC2/AC3 동시 커버, 유지.
- 기존 정렬 E2E (bubble/selection/insertion) — 회귀 통과, 수정 금지.

### plateau 사유

- 해당 없음 (상승폭 +0.71, PLATEAU_EPS=0.3 초과).

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
   Start at  12:10:52
   Duration  804ms (transform 188ms, setup 0ms, import 500ms, tests 150ms, environment 3.90s)
```

### lint log (`npm run lint`)
```
> alg-sdlc-gan@0.0.0 lint
> eslint .
(출력 없음 → 0 warnings / 0 errors)
```

### Playwright cross-algo (3브라우저 × 2 시나리오)
```
Running 6 tests using 5 workers

  ✓  1 [chromium] › e2e/cross-algo.spec.ts:25:3 › @slice:cross ... BFS 진행 중 삽입 정렬 탭 클릭 → 그래프 Canvas 사라지고 정렬 입력 폼 표시 (595ms)
  ✓  5 [chromium] › e2e/cross-algo.spec.ts:4:3  › @slice:cross ... 버블소트 스텝 5 진행 중 BFS 탭 클릭 → 상태가 idle로 초기화된다 (716ms)
  ✓  4 [webkit]   › e2e/cross-algo.spec.ts:4:3  ... (995ms)
  ✓  2 [firefox]  › e2e/cross-algo.spec.ts:25:3 ... (1.2s)
  ✓  6 [webkit]   › e2e/cross-algo.spec.ts:25:3 ... (518ms)
  ✓  3 [firefox]  › e2e/cross-algo.spec.ts:4:3  ... (1.2s)

  6 passed (3.8s)
```

### Playwright 전체 스위트 (회귀 확인)
```
30 passed (7.9s)
(bubble-sort 6 + cross-algo 6 + home 6 + insertion-sort 6 + selection-sort 6 = 30)
```

### changed files (master→HEAD working tree 기준, 소스 한정)
- 신규 (Untracked): `src/features/graph/GraphPanel.tsx`, `src/features/graph/GraphCanvas.tsx`, `e2e/cross-algo.spec.ts`, `docs/evaluations/issue-17/*`
- 수정: `src/App.tsx (+4)`, `e2e/home.spec.ts (+9/-4)`, `src/features/graph/engine.ts (+94/-3, 계약 예외 허용)`, `src/features/graph/__tests__/engine.test.ts (+24/-6)`, `src/features/sort/__tests__/engine.test.ts (+14/-5)`

### diff 요약 (`git diff master --stat`, 소스 한정)
```
 e2e/home.spec.ts                                     |  13 ++-
 src/App.tsx                                          |   4 +
 src/features/graph/__tests__/engine.test.ts          |  30 ++++++-
 src/features/graph/engine.ts                         |  97 +++++++++++++++++++++-  ← 계약 L37 예외 허용
 src/features/sort/__tests__/engine.test.ts           |  19 ++++-
 (+ 신규 3개: GraphPanel.tsx, GraphCanvas.tsx, cross-algo.spec.ts)
 ─────────────────────────────────────────────────────────────
 합계: +268 / -40 (소스 파일 기준)
```
