# Sprint Contract — Issue #18

> 이 문서는 Generator와 Evaluator가 **동일하게 참조하는 계약서**다.
> 한 번 잠그면 iteration 동안 변경되지 않는다.

## Issue
- 번호: #18
- 제목: [L3][UI/UX] 전역 반응형 레이아웃 + 접근성 (키보드 탐색, aria)
- 브랜치: feature/issue-15-16-graph-viz
- 잠금 시각: 2026-04-19T00:00:00+09:00

## Acceptance Criteria (원문)
- [ ] Playwright 뷰포트 768px: 좌측 InputPanel + 우측 Canvas 2-column 레이아웃 확인
- [ ] `←`/`→` 방향키로 이전/다음 스텝 이동 동작 확인
- [ ] 모든 버튼 `aria-label`, Canvas `role="img"` 속성 존재 확인
- [ ] 터치 타깃 44px 이상 확인

## Testable Criteria (TC)

| ID | 형식 | 본문 | 검증 방법 |
|----|------|------|-----------|
| TC-01 | given/when/then | Given 뷰포트 너비 768px이고 버블 정렬이 선택된 상태, when SortPanel을 렌더링하면, then `.grid.md:grid-cols-2` 요소가 visible이고 Canvas의 `boundingBox().x`가 InputPanel의 `boundingBox().x`보다 크다 | `npm run test:e2e -- --grep "뷰포트 768px"` |
| TC-02 | given/when/then | Given 뷰포트 너비 768px이고 BFS가 선택된 상태, when GraphPanel을 렌더링하면, then `.grid.md:grid-cols-2` 요소가 visible이고 Canvas의 `boundingBox().x`가 EdgeInput의 `boundingBox().x`보다 크다 | `npm run test:e2e -- --grep "그래프 BFS 2-column"` |
| TC-03 | given/when/then | Given 버블 정렬 시작 상태(active=true), when `ArrowRight` 키를 누르면, then `[aria-live="polite"]` 텍스트가 이전과 달라진다 (스텝 증가) (가정: Input/Textarea에 포커스가 없는 상태) | `npm run test:e2e -- --grep "방향키로 이전/다음"` |
| TC-04 | given/when/then | Given TC-03에서 ArrowRight를 1회 누른 상태, when `ArrowLeft` 키를 누르면, then `[aria-live="polite"]` 텍스트가 ArrowRight 이전 값으로 복원된다 | `npm run test:e2e -- --grep "방향키로 이전/다음"` |
| TC-05 | given/when/then | Given useKeyboardNav이 active=false로 호출된 상태, when `ArrowRight` 키를 누르면, then onNext 콜백이 호출되지 않는다 | `npm test -- useKeyboardNav` |
| TC-06 | given/when/then | Given 버블 정렬 시작 상태, when StepControls가 렌더링되면, then `aria-label="이전 스텝"`, `aria-label="다음 스텝"`, `aria-label="재생"` 속성을 가진 버튼이 각각 DOM에 존재한다 | `npm run test:e2e -- --grep "StepControls 버튼에 aria-label"` |
| TC-07 | given/when/then | Given 버블 정렬이 선택된 상태, when VisualizationCanvas(또는 canvas 엘리먼트)가 렌더링되면, then `role="img"` 속성이 canvas 엘리먼트에 존재한다 | `npm run test:e2e -- --grep "Canvas에 role"` |
| TC-08 | given/when/then | Given 버블 정렬 시작 상태, when `aria-label="이전 스텝"` 버튼의 boundingBox를 측정하면, then height가 44 이상이다 | `npm run test:e2e -- --grep "터치 타깃 44px"` |
| TC-09 | command→expected | `npm run build` | 종료 코드 0, stderr에 TypeScript 타입 에러 없음 |
| TC-10 | command→expected | `npm run test:e2e -- e2e/responsive-a11y.spec.ts` | 종료 코드 0, 6개 테스트 모두 passed |

## Non-goals

- 정렬 알고리즘 로직(버블/선택/삽입 정렬 엔진) 수정 — #12, #13, #14 범위 (추론)
- 그래프 BFS/DFS 엔진 로직 수정 — #15, #16 범위 (추론)
- 마우스/터치 드래그 인터랙션 구현 — 별도 이슈로 분리 필요 (추론)
- 다크모드 또는 테마 전환 기능 — 이슈 본문에 언급 없음 (추론)
- `src/features/sort/engine.ts`, `src/features/graph/engine.ts` 수정 금지

## Definition of Done

- [ ] 모든 TC Pass
- [ ] `npm run build` 종료 코드 0
- [ ] `npm test` 종료 코드 0
- [ ] Evaluator rubric 평균 ≥ 8.0 AND 각 항목 ≥ 6.0
- [ ] Non-goals 침범 없음
- [ ] 기존 테스트 파손 없음

## 해석 기록

- **AC1 (2-column 레이아웃)**: "좌측 InputPanel + 우측 Canvas"의 기준을 `boundingBox().x` 비교로 정의했다. CSS 클래스 존재 확인(TC-01/02)만으로는 실제 배치를 보장할 수 없으므로 좌표 비교를 병행한다. 정렬과 그래프 패널 각각에 대해 TC를 분리했다(TC-01, TC-02).
- **AC2 (방향키 이동)**: `[aria-live="polite"]` 텍스트 변화를 관찰 가능한 결과로 채택했다. `active=false` 시 무시 동작은 useKeyboardNav 단위 테스트(TC-05)로 검증한다. "Input/Textarea에 포커스 없음" 조건은 훅 내부 가드(`instanceof HTMLInputElement`) 기반이므로 전제로 명시했다.
- **AC3 (aria 속성)**: 버튼 aria-label(TC-06)과 Canvas role(TC-07)을 별도 TC로 분리했다. "모든 버튼"의 범위를 StepControls 내 이전/다음/재생 3개 버튼으로 한정했다(이슈 본문의 구현 파일 기준).
- **AC4 (터치 타깃 44px)**: WCAG 2.5.5 기준인 44×44px 중 height만 e2e로 측정한다(가정: width도 동일 클래스 적용). `min-h-[44px]`(Tailwind) 적용 버튼을 대표 샘플로 "이전 스텝" 버튼을 선택했다.
