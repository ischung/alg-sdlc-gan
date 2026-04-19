# Sprint Contract — Issue #17

> 이 문서는 Generator와 Evaluator가 **동일하게 참조하는 계약서**다.
> 한 번 잠그면 iteration 동안 변경되지 않는다.

## Issue
- 번호: #17
- 제목: [L3][Test] 알고리즘 전환 교차 E2E (정렬→그래프 전환 후 상태 초기화 확인)
- 브랜치: feature/issue-15-16-graph-viz
- 잠금 시각: 2026-04-19T00:00:00+09:00

## Acceptance Criteria (원문)

- [ ] 버블소트 스텝 5 진행 중 BFS 탭 클릭 → visualizerState가 `idle`로 초기화됨
- [ ] BFS 진행 중 삽입 정렬 탭 클릭 → 그래프 Canvas가 사라지고 정렬 입력 폼이 표시됨
- [ ] Playwright 교차 시나리오 통과 (Chromium, Firefox, WebKit)

## Testable Criteria (TC)

| ID | 형식 | 본문 | 검증 방법 |
|----|------|------|-----------|
| TC-01 | given/when/then | Given 버블 정렬이 선택되고 시작 버튼을 눌러 스텝 6/N 상태일 때, when BFS 탭을 클릭하면, then `[aria-label="이전 스텝"]` 버튼이 disabled 상태이다 | `npx playwright test e2e/cross-algo.spec.ts -g "버블소트 스텝 5"` |
| TC-02 | given/when/then | Given 버블 정렬이 선택되고 시작 버튼을 눌러 스텝 6/N 상태일 때, when BFS 탭을 클릭하면, then `[aria-label="다음 스텝"]` 버튼이 disabled 상태이다 (가정: idle 상태는 steps.length=0이므로 StepControls가 prev/next를 비활성화함) | `npx playwright test e2e/cross-algo.spec.ts -g "버블소트 스텝 5"` |
| TC-03 | given/when/then | Given 버블 정렬이 선택되고 스텝 6/N 상태일 때, when BFS 탭을 클릭하면, then `[aria-live="polite"]` StepIndicator 요소가 DOM에 존재하지 않거나 비가시 상태이다 (가정: StepIndicator는 total=0이면 null을 반환하여 DOM에 미포함됨) | `npx playwright test e2e/cross-algo.spec.ts -g "버블소트 스텝 5"` |
| TC-04 | given/when/then | Given BFS 탭이 선택되고 시작 버튼을 눌러 탐색이 진행 중일 때, when 삽입 정렬 탭을 클릭하면, then `canvas[aria-label="그래프 시각화 캔버스"]`가 DOM에서 비가시 또는 미존재 상태이다 | `npx playwright test e2e/cross-algo.spec.ts -g "BFS 진행 중 삽입 정렬"` |
| TC-05 | given/when/then | Given BFS 탭이 선택되고 시작 버튼을 눌러 탐색이 진행 중일 때, when 삽입 정렬 탭을 클릭하면, then `[aria-label="정렬할 배열 입력"]` 입력 폼이 가시 상태이다 | `npx playwright test e2e/cross-algo.spec.ts -g "BFS 진행 중 삽입 정렬"` |
| TC-06 | command→expected | `npx playwright test e2e/cross-algo.spec.ts --project=chromium` → exit code 0, 모든 테스트 passed | 명령 실행 |
| TC-07 | command→expected | `npx playwright test e2e/cross-algo.spec.ts --project=firefox` → exit code 0, 모든 테스트 passed | 명령 실행 |
| TC-08 | command→expected | `npx playwright test e2e/cross-algo.spec.ts --project=webkit` → exit code 0, 모든 테스트 passed | 명령 실행 |
| TC-09 | command→expected | `npm test` → exit code 0 (기존 단위 테스트 전체 통과, 회귀 없음) | 명령 실행 |
| TC-10 | command→expected | `npm run build` → exit code 0 (TypeScript 컴파일 및 Vite 빌드 성공) | 명령 실행 |

## Non-goals

- `e2e/bubble-sort.spec.ts`, `e2e/selection-sort.spec.ts`, `e2e/insertion-sort.spec.ts` — 단일 알고리즘 E2E는 이미 완료된 이슈(#12~#14) 범위이므로 수정 금지 (기존 동작 보존만 허용)
- `src/features/sort/engine.ts` — 정렬 알고리즘 로직 변경 금지 (기존 구현 완료)
- `src/features/graph/engine.ts` — **예외 허용**: master 브랜치 기준 더미 구현(`return []`)이며, 선행 이슈 #15/#16 브랜치가 미머지 상태. GraphPanel의 정상 작동 및 E2E 실행을 위해 BFS/DFS 로직 구현이 이 이슈에 포함되는 것을 허용한다.
- DFS 탭 → 정렬 전환, 또는 정렬 ↔ 정렬 전환 시나리오 — AC에 명시되지 않은 조합; 추가 이슈로 분리 (추론)
- 전환 애니메이션(transition), 로딩 스피너 등 UX 개선 — 이번 이슈 범위 밖 (추론)

## Definition of Done

- [ ] 모든 TC Pass
- [ ] `npm run build` 종료 코드 0
- [ ] `npm test` 종료 코드 0
- [ ] Evaluator rubric 평균 ≥ 8.0 AND 각 항목 ≥ 6.0
- [ ] Non-goals 침범 없음
- [ ] 기존 테스트 파손 없음

## 해석 기록

- **AC1 "visualizerState가 `idle`로 초기화됨"**: `visualizerState`는 코드 내부 변수명이 아니라 개념적 표현이다. `SortPanel`과 `GraphPanel`은 각자의 `playState` useState를 보유하며, 알고리즘 전환 시 App.tsx가 조건부 렌더링(`isSortAlgo` / `isGraphAlgo`)으로 컴포넌트를 언마운트한다. 새로 마운트된 컴포넌트는 항상 `playState = 'idle'`로 시작하므로, "idle 초기화"의 관찰 가능한 증거는 **StepControls의 prev/next 버튼 disabled + StepIndicator DOM 미존재**로 해석하였다. (TC-01, TC-02, TC-03)
- **AC2 "그래프 Canvas가 사라지고 정렬 입력 폼이 표시됨"**: `canvas[aria-label="그래프 시각화 캔버스"]`의 비가시와 `[aria-label="정렬할 배열 입력"]`의 가시를 독립 TC(TC-04, TC-05)로 분리하여 어느 쪽이 실패했는지 명확히 판별할 수 있게 하였다.
- **AC3 "Playwright 교차 시나리오 통과 (Chromium, Firefox, WebKit)"**: 브라우저별로 TC를 분리(TC-06~TC-08)하여 특정 브라우저에서만 발생하는 실패를 추적할 수 있도록 하였다.
- **"BFS 진행 중"의 해석**: cross-algo.spec.ts 구현을 보면 `시작` 버튼을 누른 뒤 canvas가 visible인 상태를 "진행 중"으로 정의하고 있다. 이 계약도 동일하게 따른다.
- **engine.ts 예외 처리 (계약 갱신)**: 선행 이슈 #15/#16이 master에 미머지 상태이므로 master의 `src/features/graph/engine.ts`는 더미 구현(`return []`)이다. GraphPanel 컴포넌트가 정상 작동하고 E2E 시나리오를 실행하기 위해서는 실제 BFS/DFS 구현이 필수적이다. 따라서 Non-goals에서 engine.ts 제한을 완화하여 이 이슈 범위에 포함하는 것으로 계약을 갱신한다.
