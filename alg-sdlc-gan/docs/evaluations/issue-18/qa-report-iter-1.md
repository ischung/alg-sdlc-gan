# QA Report — Issue #18 — Iteration 1

- 평가 시각: 2026-04-19T12:22:00+09:00
- 기준: `docs/evaluations/issue-18/sprint-contract.md`
- 평가자 모델: opus
- 브랜치: `feature/issue-18-responsive-a11y`

## 1. TC 결과

| ID | 본문 요약 | 결과 | 근거(출력 인용) |
|----|-----------|------|-----------------|
| TC-01 | 뷰포트 768px SortPanel 2-column + canvas.x > input.x | ✅ PASS | Playwright: `[chromium/firefox/webkit] › 뷰포트 768px에서 2-column 레이아웃 확인` — 실패 목록에 없음 (passed in 3 browsers). |
| TC-02 | 뷰포트 768px GraphPanel 2-column + canvas.x > edgeInput.x | ✅ PASS | Playwright: `그래프 BFS 2-column 레이아웃 확인` — 실패 목록에 없음 (passed in 3 browsers). |
| TC-03 | ArrowRight 후 aria-live 텍스트 변화 | ❌ FAIL | `[chromium/firefox/webkit] › e2e/responsive-a11y.spec.ts:24:3 › 방향키로 이전/다음 스텝 이동` — `<canvas role="img" width="600" ...> subtree intercepts pointer events`; `시작` 버튼 click 타임아웃 30000ms. |
| TC-04 | ArrowLeft 후 aria-live 이전 값 복원 | ❌ FAIL | TC-03과 동일 테스트 블록에서 `시작` 클릭 자체가 실패 → ArrowLeft assertion까지 도달 못함. |
| TC-05 | `npm test -- useKeyboardNav` (active=false 시 onNext 미호출) | ❌ FAIL | `npm test -- useKeyboardNav` → `No test files found, exiting with code 1`. `src/hooks/useKeyboardNav.spec.ts` 미존재 (`find` 결과 `useKeyboardNav.ts`만 존재). |
| TC-06 | `aria-label="이전 스텝"/"다음 스텝"/"재생"` 버튼 DOM 존재 | ❌ FAIL | `[chromium/firefox/webkit] › e2e/responsive-a11y.spec.ts:41:3 › 모든 StepControls 버튼에 aria-label 존재` — `시작` 버튼 click 캔버스에 의한 pointer intercept로 타임아웃. (※ 소스에 aria-label은 존재하나 E2E 검증 불가) |
| TC-07 | canvas에 `role="img"` 존재 | ✅ PASS | `Canvas에 role="img" 속성 존재` 실패 목록에 없음. SortCanvas.tsx:65 `role="img"`, GraphCanvas.tsx:89 `role="img"` 확인. |
| TC-08 | 이전 스텝 버튼 height ≥ 44 | ❌ FAIL | `[chromium/firefox/webkit] › e2e/responsive-a11y.spec.ts:58:3 › StepControls 버튼 터치 타깃 44px 이상` — 동일 canvas intercept로 타임아웃. |
| TC-09 | `npm run build` exit 0, 타입 에러 없음 | ✅ PASS | `npm run build` → `✓ built in 70ms` / `dist/index.html 0.45 kB` / `---EXIT:0`. |
| TC-10 | `npm run test:e2e -- e2e/responsive-a11y.spec.ts` 6개 모두 pass | ❌ FAIL | Playwright 실행 결과 `9 failed / 9 passed (1.1m)` — 6개 테스트 × 3 브라우저 중 9개(50%)가 실패. TC-10의 "6개 모두 passed" 조건 미달. |

- **TC Pass Rate**: 4/10 = **40%**

---

## 2. Rubric 점수

| # | 항목 | 점수 | 근거 |
|---|------|------|------|
| 1 | TC Pass Rate | **4** | `floor(4/10 × 10) = 4`. 10개 중 4개 PASS(TC-01, TC-02, TC-07, TC-09). |
| 2 | Build & Test Health | **6** | `npm run build` exit 0 / 0 warning (`✓ built in 70ms`), `npm test` exit 0 (8 files / 25 tests passed). 그러나 E2E `npx playwright test e2e/responsive-a11y.spec.ts` `9 failed / 9 passed` — 테스트 기준 신뢰도 저하. build OK + unit test OK + e2e 50% 실패 → 6. |
| 3 | AC Coverage | **7** | AC 키워드 → 실제 diff 등장 확인: (a) `md:grid-cols-2` → `SortPanel.tsx:75`, `GraphPanel.tsx:107` 등장 ✓; (b) `ArrowLeft/ArrowRight` → `useKeyboardNav.ts:13,16` 등장 ✓; (c) `aria-label` → `StepControls.tsx:31,41,50,60` 등장 ✓; (d) `role="img"` → `SortCanvas.tsx:65`, `GraphCanvas.tsx:89` 등장 ✓; (e) `min-h-[44px]` → `StepControls.tsx:32,42,51,61` 등장 ✓. 코드 상 AC 4개 모두 다뤄짐. 다만 실 동작 검증(E2E)에서 3개 AC가 통과하지 못해 -3점. |
| 4 | Code Hygiene | **8** | lint 실행 결과 확인 불가(`package.json`에 lint 스크립트 상태 미파악) → 감점 -1. 네이밍/위치 기존 규칙 준수: 훅 `src/hooks/useKeyboardNav.ts` (신규 디렉토리이나 React 관용), aria-label 한국어(기존 `AlgorithmSelector` 컨벤션 일치, 예: `버블 정렬 선택`), `min-h-[44px]` 일관 적용. 기존 컨벤션 위반 0. build 시 TS warning 0. |
| 5 | Scope Discipline | **5** | Non-goals: `src/features/sort/engine.ts`, `src/features/graph/engine.ts` 수정 금지 → `git diff master --stat` 결과 두 파일 모두 미변경 ✓. 그러나 다음 파일들이 이슈 범위 밖에서 수정됨: `.claude/commands/implement.md`, `.claude/commands/ship.md`, `.claude/commands/ship-all.md`, `.claude/go-sdlc-gan.json`, `.claude/skills/auto-ship/SKILL.md`, `.claude/skills/github-flow-impl/SKILL.md`, `.claude/skills/github-kanban/SKILL.md` — **7개 파일 / 143 lines** 범위 외 변경(diff stat: `.claude/skills/github-kanban/SKILL.md | 58`, `auto-ship/SKILL.md | 56` 등). Scope 침범 7개 파일 → 강한 감점. |
| 6 | Regression Safety | **9** | 기존 unit test 25개 모두 pass (`Tests 25 passed (25)`). 기존 E2E (bubble/insertion/selection/home/cross-algo)도 `9 passed`로 새 spec 외 파손 증거 없음. diff stat: 순수 추가 우세(`+271/-146`), 신규 파일 `e2e/responsive-a11y.spec.ts`, `src/hooks/useKeyboardNav.ts`. SortPanel/GraphPanel/StepControls는 기존 컴포넌트 수정이나 기존 테스트 전체 통과. |
| 7 | User Value Trace | **4** | E2E 시나리오: "사용자가 768px 모바일 태블릿에서 버블 정렬을 시작한 후 방향키로 스텝을 이동한다" → TC-01 2-column 레이아웃은 통과하나, 방향키 이동 테스트(TC-03/04)와 터치 타깃(TC-08)이 실 브라우저에서 검증 불가. 특히 1280px 기본 뷰포트에서 `canvas[width=600]`가 grid 컬럼(≈432px)을 overflow하여 `시작` 버튼의 pointer event를 가로챔 — 실제 데스크톱 사용자가 "시작 버튼을 누르는" 핵심 행동이 불가능할 수 있음 (Playwright 로그: `<canvas role="img" width="600" height="360" ...> subtree intercepts pointer events`). E2E 1개 상상 실행 결과: **일부 경로 차단**. |

- **평균**: (4 + 6 + 7 + 8 + 5 + 9 + 4) / 7 = **6.14**
- **최저 항목**: #1 TC Pass Rate = **4**, #7 User Value Trace = **4**

---

## 3. 판정

- 평균 6.14 ≥ 8.0 ? **NO**
- 모든 항목 ≥ 6.0 ? **NO** (#1 = 4, #5 = 5, #7 = 4)
- **판정: FAIL**

---

## 4. 정체(plateau) 감지

- iter == 1 → **N/A** (이전 리포트 없음)

---

## 5. Generator Feedback

> 다음 iteration의 Generator가 입력으로 받는다. 구체·행동가능.

### 우선 수정 (영향도 순)

1. **`src/features/sort/SortPanel.tsx:129` / `src/features/graph/GraphPanel.tsx:170` — Canvas의 고정 width 때문에 우측 컬럼이 overflow**
   - 현재 상태: `<SortCanvas step={currentStepData} />` (Canvas 내부에서 `width=600` 기본값), 우측 컨테이너 `<div className="flex items-start justify-center">`
   - 기대 상태: 부모 컨테이너에 `min-w-0` 또는 `overflow-hidden` 적용 + Canvas를 `className="max-w-full h-auto"` 로 반응형화 (또는 Canvas 컨테이너에 `w-full` + canvas에 `w-full`). 이유: Playwright 로그 `<canvas role="img" width="600" ...> subtree intercepts pointer events` — 1280px 뷰포트에서 `max-w-4xl`(896px) 안의 `md:grid-cols-2` 컬럼은 ≈432px로, 600px canvas가 좌측 컬럼의 `시작` 버튼 영역을 가림.
   - 관련 TC: TC-03, TC-04, TC-06, TC-08, TC-10 / rubric 항목 #1, #2, #7
   - 검증: `npx playwright test e2e/responsive-a11y.spec.ts --project=chromium`이 6/6 통과해야 함.

2. **`src/hooks/useKeyboardNav.spec.ts` 파일 누락 — TC-05 unit test 부재**
   - 현재 상태: `find src -name "*useKeyboardNav*"` → `useKeyboardNav.ts` 단 1개. `npm test -- useKeyboardNav` → `No test files found, exiting with code 1`.
   - 기대 상태: `src/hooks/useKeyboardNav.spec.ts` 생성. Vitest + `@testing-library/react`의 `renderHook` 사용. 최소 3개 케이스: (a) `active=true`일 때 ArrowRight → onNext 호출 1회, (b) `active=false`일 때 ArrowRight → onNext 호출 0회, (c) Input에 focus된 상태에서 ArrowRight → onNext 호출 0회.
   - 관련 TC: TC-05 / rubric 항목 #1

3. **`.claude/` 하위 7개 파일 범위 외 수정 되돌리기**
   - 현재 상태: `git diff --stat`에 `.claude/commands/implement.md`, `.claude/commands/ship.md`, `.claude/commands/ship-all.md`, `.claude/go-sdlc-gan.json`, `.claude/skills/auto-ship/SKILL.md`, `.claude/skills/github-flow-impl/SKILL.md`, `.claude/skills/github-kanban/SKILL.md` 7개가 수정됨(총 143 lines).
   - 기대 상태: `git restore .claude/` 로 되돌리거나 **별도 이슈/PR**로 분리. 이슈 #18은 "반응형 레이아웃 + 접근성"이지 ship 자동화 메타 수정이 아님.
   - 관련 TC: N/A / rubric 항목 #5

### 건드리지 말 것

- `src/features/sort/engine.ts` — sprint-contract Non-goals 명시 (이미 미변경 ✓)
- `src/features/graph/engine.ts` — sprint-contract Non-goals 명시 (이미 미변경 ✓)
- 정렬/그래프 로직, 알고리즘 시각화 배치 로직

### plateau 사유 (해당 없음)

- iter 1이라 plateau 판정 불가.

---

## 6. 메타

### build log tail
```
> alg-sdlc-gan@0.0.0 build
> tsc -b && vite build

vite v8.0.8 building client environment for production...
✓ 28 modules transformed.
dist/index.html                   0.45 kB │ gzip:  0.29 kB
dist/assets/index-IhX2iWM0.css   11.38 kB │ gzip:  3.18 kB
dist/assets/index-BiumqrKQ.js   204.92 kB │ gzip: 64.25 kB

✓ built in 70ms
EXIT:0
```

### test log tail (unit)
```
> alg-sdlc-gan@0.0.0 test
> vitest run

 RUN  v4.1.4 /Users/insang/Documents/lab/practices/alg-sdlc-gan

 Test Files  8 passed (8)
      Tests  25 passed (25)
   Start at  12:19:26
   Duration  709ms
EXIT:0
```

### Playwright log tail (responsive-a11y)
```
9 failed
  [chromium/firefox/webkit] › e2e/responsive-a11y.spec.ts:24:3 › 방향키로 이전/다음 스텝 이동
  [chromium/firefox/webkit] › e2e/responsive-a11y.spec.ts:41:3 › 모든 StepControls 버튼에 aria-label 존재
  [chromium/firefox/webkit] › e2e/responsive-a11y.spec.ts:58:3 › StepControls 버튼 터치 타깃 44px 이상
9 passed (1.1m)

Representative failure stack:
  locator.click: Test timeout of 30000ms exceeded.
  - <canvas role="img" width="600" height="360" class="rounded-lg" aria-label="정렬 시각화 캔버스">
    from <div class="flex items-start justify-center">…</div>
    subtree intercepts pointer events
```

### changed files (`git diff --stat`)
```
 .claude/commands/implement.md         |   1 -
 .claude/commands/ship-all.md          |   1 -
 .claude/commands/ship.md              |   1 -
 .claude/go-sdlc-gan.json              |   4 +-
 .claude/skills/auto-ship/SKILL.md     |  56 +++++-
 .claude/skills/github-flow-impl/SKILL.md |  24 +++-
 .claude/skills/github-kanban/SKILL.md  |  58 +++++--
 src/components/StepControls.tsx       |   8 +-
 src/features/graph/GraphPanel.tsx     | 147 ++++++++++++---------
 src/features/sort/SortPanel.tsx       | 117 +++++++++-------
 (+ untracked) e2e/responsive-a11y.spec.ts, src/hooks/useKeyboardNav.ts
 10 files changed, 271 insertions(+), 146 deletions(-)
```
