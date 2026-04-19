# QA Report — Issue #18 — Iteration 2

- 평가 시각: 2026-04-19T12:34:00+09:00
- 기준: `docs/evaluations/issue-18/sprint-contract.md`
- 평가자 모델: opus
- 브랜치: `feature/issue-18-responsive-a11y`
- 이전 리포트: `docs/evaluations/issue-18/qa-report-iter-1.md` (평균 6.14, FAIL)

## 1. TC 결과

| ID | 본문 요약 | 결과 | 근거(출력 인용) |
|----|-----------|------|-----------------|
| TC-01 | 뷰포트 768px SortPanel 2-column + canvas.x > input.x | ✅ PASS | Playwright: `✓ 2 [chromium] › e2e/responsive-a11y.spec.ts:4:3 › @slice:a11y ... › 뷰포트 768px에서 2-column 레이아웃 확인 (529ms)` — chromium/firefox/webkit 3개 모두 통과. |
| TC-02 | 뷰포트 768px GraphPanel 2-column + canvas.x > edgeInput.x | ✅ PASS | Playwright: `✓ 6 [chromium] › ... › 그래프 BFS 2-column 레이아웃 확인 (254ms)`, `✓ 12 [firefox] (600ms)`, `✓ 17 [webkit] (382ms)`. |
| TC-03 | ArrowRight 후 aria-live 텍스트 변화 | ✅ PASS | Playwright: `✓ 3 [chromium] › e2e/responsive-a11y.spec.ts:24:3 › ... › 방향키로 이전/다음 스텝 이동 (595ms)` — 3개 브라우저 모두 통과. 테스트 내부가 `expect(step2).not.toBe(step1)` 및 `expect(step3).toBe(step1)` 단언을 포함(spec line 34, 38) → ArrowLeft 복원까지 검증 완료. |
| TC-04 | ArrowLeft 후 aria-live 이전 값 복원 | ✅ PASS | TC-03과 동일 테스트 블록 내 `expect(step3).toBe(step1)` (`e2e/responsive-a11y.spec.ts:38`) assertion 포함. 테스트 전체가 PASS했으므로 이 assertion도 성립. |
| TC-05 | `npm test -- useKeyboardNav` (active=false 시 onNext 미호출 + 기타 케이스) | ✅ PASS | `npm test` → `Test Files 9 passed (9) / Tests 31 passed (31)` (iter-1은 8 files / 25 tests). 신규 파일 `src/hooks/__tests__/useKeyboardNav.spec.ts` 존재(82 lines, 6 `it` 블록) 및 케이스 `'active=false일 때 ArrowRight를 눌러도 onNext가 호출되지 않는다'` (spec line 36) 포함. |
| TC-06 | `aria-label="이전 스텝"/"다음 스텝"/"재생"` 버튼 DOM 존재 | ✅ PASS | Playwright: `✓ 5 [chromium] › e2e/responsive-a11y.spec.ts:41:3 › ... › 모든 StepControls 버튼에 aria-label 존재 (572ms)`, `✓ 9 [firefox] (1.1s)`, `✓ 15 [webkit] (588ms)`. 소스 증거: `StepControls.tsx:31` `aria-label="이전 스텝"`, `:50` `aria-label="재생"`, `:60` `aria-label="다음 스텝"`. |
| TC-07 | canvas에 `role="img"` 존재 | ✅ PASS | Playwright: `✓ 4 [chromium] › ... › Canvas에 role="img" 속성 존재 (515ms)`. 소스: `SortCanvas.tsx:66` `role="img"`, `GraphCanvas.tsx:90` `role="img"`. |
| TC-08 | 이전 스텝 버튼 height ≥ 44 | ✅ PASS | Playwright: `✓ 1 [chromium] › ... › StepControls 버튼 터치 타깃 44px 이상 (610ms)`, `✓ 11 [firefox] (1.3s)`, `✓ 18 [webkit] (392ms)`. 소스: `StepControls.tsx:32` `min-h-[44px]`. |
| TC-09 | `npm run build` exit 0, 타입 에러 없음 | ✅ PASS | `npm run build` → `✓ built in 61ms` / `dist/assets/index-CbrWzmUV.js 205.14 kB` / `---EXIT:0---`. stderr 타입 에러 없음. |
| TC-10 | `npm run test:e2e -- e2e/responsive-a11y.spec.ts` 6개 모두 pass | ✅ PASS | `npx playwright test e2e/responsive-a11y.spec.ts` → `18 passed (7.4s)` / `---EXIT:0---`. 6 테스트 × 3 브라우저 = 18개 전부 통과. |

- **TC Pass Rate**: 10/10 = **100%** (iter-1: 4/10 = 40% → +60%p)

---

## 2. Rubric 점수

| # | 항목 | 점수 | 근거 |
|---|------|------|------|
| 1 | TC Pass Rate | **10** | `floor(10/10 × 10) = 10`. 10개 전부 PASS (iter-1: 4). |
| 2 | Build & Test Health | **10** | `npm run build` exit 0 / 0 warning (`✓ built in 61ms`); `npm test` exit 0 (`Test Files 9 passed (9) / Tests 31 passed (31) Duration 798ms`); `npx playwright test e2e/responsive-a11y.spec.ts` `18 passed (7.4s)` EXIT 0; `npx playwright test` 전체 `48 passed (9.5s)` EXIT 0; `npm run lint` EXIT 0 (warning 0). (iter-1: 6) |
| 3 | AC Coverage | **10** | AC 키워드 → diff 등장 전부 확인: (a) `md:grid-cols-2` → `SortPanel.tsx:75`, `GraphPanel.tsx:107`; (b) `ArrowLeft/ArrowRight` → `useKeyboardNav.ts:13,16`, 단위 테스트 `useKeyboardNav.spec.ts` 6 케이스; (c) `aria-label` → `StepControls.tsx:31,41,50,60` (이전/일시정지/재생/다음) + `:76` `속도 조절`; (d) `role="img"` → `SortCanvas.tsx:66`, `GraphCanvas.tsx:90`; (e) `min-h-[44px]` → `StepControls.tsx:32,42,51,61`, `SortPanel.tsx:91,119`, `GraphPanel.tsx:132,160`. 코드 + E2E 실측 전부 일치. (iter-1: 7) |
| 4 | Code Hygiene | **10** | `npm run lint` EXIT 0, warning 0. 네이밍/위치 규칙 준수: 훅은 `src/hooks/` 아래, 신규 테스트는 `src/hooks/__tests__/` (Vitest 관용 컨벤션). aria-label 한국어 규칙 일치(`'이전 스텝'`, `'다음 스텝'`, `'재생'`, `'속도 조절'` — 이전 iter-1의 `'속도'`에서 `'속도 조절'`로 명시화됨 `StepControls.tsx:76`). TS build 0 warning. (iter-1: 8) |
| 5 | Scope Discipline | **9** | Non-goals 엄수 확인: `git diff master..HEAD src/features/sort/engine.ts src/features/graph/engine.ts` 출력 비어있음(미변경 ✓). staged 변경 파일 8개 전부 이슈 범위 내: `e2e/responsive-a11y.spec.ts`(신규), `src/components/StepControls.tsx`, `src/features/sort/SortPanel.tsx`, `src/features/sort/SortCanvas.tsx`, `src/features/graph/GraphPanel.tsx`, `src/features/graph/GraphCanvas.tsx`, `src/hooks/useKeyboardNav.ts`(신규), `src/hooks/__tests__/useKeyboardNav.spec.ts`(신규). `.claude/` 하위 7개 파일은 여전히 workdir 수정 상태(unstaged)지만 **staged diff에서 제외**되어 다음 commit에는 포함되지 않는다. 단, 리포 상에 "대기 중인 오염 파일"이 남아있어 -1 감점(깔끔한 되돌림이 아님). (iter-1: 5) |
| 6 | Regression Safety | **10** | 기존 unit test 파손 0: iter-1 25 tests → iter-2 31 tests 모두 passed (+6 신규). 기존 E2E 파손 0: `npx playwright test` 전체 `48 passed (9.5s)` EXIT 0 — bubble/insertion/selection/home/cross-algo/responsive-a11y 모든 슬라이스 통과. staged diff stat `+366/-138` — 순수 추가 비중 72%. `engine.ts` 2개 파일 무변경. (iter-1: 9) |
| 7 | User Value Trace | **10** | E2E 시나리오: "사용자가 768px 태블릿에서 BFS를 선택하고, 그래프를 입력·시작한 뒤 방향키로 스텝을 전/후로 움직여 결과를 확인한다" → `e2e/responsive-a11y.spec.ts:24-39` (방향키) + `:68-84` (그래프 2-column) 전부 PASS. 특히 iter-1의 치명적 차단 증거였던 `<canvas role="img" width="600" ...> subtree intercepts pointer events` 이슈가 해소된 근거: `SortCanvas.tsx:61-71`의 `<div className="min-w-0 w-full">` 래퍼 + `className="rounded-lg max-w-full" style={{ width: '100%', maxWidth: '600px' }}` 적용으로 canvas가 부모 컬럼 폭에 맞춰 축소됨; 동일 패턴이 `GraphCanvas.tsx:85-95`에도 적용. `시작` 버튼 click이 18/18 케이스에서 타임아웃 없이 성공. (iter-1: 4) |

- **평균**: (10 + 10 + 10 + 10 + 9 + 10 + 10) / 7 = **9.857**
- **최저 항목**: #5 Scope Discipline = **9**

---

## 3. 판정

- 평균 9.857 ≥ 8.0 ? **YES**
- 모든 항목 ≥ 6.0 ? **YES** (최저 9)
- **판정: PASS**

---

## 4. 정체(plateau) 감지

- 이전 평균(iter-1): **6.14**
- 이번 평균(iter-2): **9.857**
- 상승폭: **+3.717**
- 임계값 PLATEAU_EPS=0.3, 상승폭 +3.717 >> 0.3
- plateau 여부: **NO** (대폭 개선됨)

### iter-1 지적사항 해소 추적

| iter-1 피드백 | 상태 | 증거 |
|--------------|------|------|
| Canvas 고정 width(600) → overflow로 pointer intercept | ✅ 해소 | `SortCanvas.tsx:68-69` `className="rounded-lg max-w-full" style={{ width: '100%', maxWidth: '600px' }}`; `GraphCanvas.tsx:92-93` 동일 패턴; 부모 `<div className="min-w-0 w-full">` 래퍼 + Panel 우측 컬럼 `<div className="flex items-start justify-center min-w-0">` (`SortPanel.tsx:128`, `GraphPanel.tsx:169`). Playwright 18/18 pass. |
| useKeyboardNav 단위 테스트 부재 | ✅ 해소 | `src/hooks/__tests__/useKeyboardNav.spec.ts` (82 lines, 6 `it` 블록) 신규 작성. 케이스: active=true/ArrowRight, active=true/ArrowLeft, active=false/ArrowRight, active=false/ArrowLeft, Input focus, Textarea focus. `Tests 31 passed (31)`. |
| `.claude/` 하위 7개 파일 범위 외 수정 | 부분 해소 | staged diff에는 제외됨(커밋 분리 ✓). 단 workdir에 여전히 수정된 채로 존재. restore 또는 별도 commit이 아직 실행되지 않음 → Scope Discipline -1. |

---

## 5. Generator Feedback

PASS 판정이므로 별도 피드백 없음. 참고용 마무리 제안만:

- (선택) `git restore .claude/commands/*.md .claude/skills/**/SKILL.md .claude/go-sdlc-gan.json` 로 workdir 정리, 또는 별도 이슈(`chore: update ship/kanban skill notes`)로 분리 커밋. 다음 iteration 평가에서 Scope Discipline 10/10 확보용.

---

## 6. 메타

### build log tail

```
> alg-sdlc-gan@0.0.0 build
> tsc -b && vite build

vite v8.0.8 building client environment for production...
✓ 28 modules transformed.
dist/index.html                   0.45 kB │ gzip:  0.29 kB
dist/assets/index-ITSrwbw2.css   11.51 kB │ gzip:  3.22 kB
dist/assets/index-CbrWzmUV.js   205.14 kB │ gzip: 64.31 kB
✓ built in 61ms
---EXIT:0---
```

### test log tail (unit)

```
> alg-sdlc-gan@0.0.0 test
> vitest run

 RUN  v4.1.4 /Users/insang/Documents/lab/practices/alg-sdlc-gan

 Test Files  9 passed (9)
      Tests  31 passed (31)
   Start at  12:26:56
   Duration  798ms (transform 293ms, setup 0ms, import 737ms, tests 161ms, environment 4.26s)

---EXIT:0---
```

### Playwright log tail (responsive-a11y)

```
Running 18 tests using 5 workers
  ✓   4 [chromium] › Canvas에 role="img" 속성 존재 (515ms)
  ✓   2 [chromium] › 뷰포트 768px에서 2-column 레이아웃 확인 (529ms)
  ✓   5 [chromium] › 모든 StepControls 버튼에 aria-label 존재 (572ms)
  ✓   3 [chromium] › 방향키로 이전/다음 스텝 이동 (595ms)
  ✓   1 [chromium] › StepControls 버튼 터치 타깃 44px 이상 (610ms)
  ✓   6 [chromium] › 그래프 BFS 2-column 레이아웃 확인 (254ms)
  ✓   7-12 [firefox] × 6 (passed)
  ✓  13-18 [webkit]  × 6 (passed)

  18 passed (7.4s)
---EXIT:0---
```

### Playwright full suite

```
... (중략)
  48 passed (9.5s)
---EXIT:0---
```

### lint

```
> alg-sdlc-gan@0.0.0 lint
> eslint .
---EXIT:0---
```

### changed files (staged, commit 대상)

```
 e2e/responsive-a11y.spec.ts                 |  85 ++++++++++++  (신규)
 src/components/StepControls.tsx             |  10 +-
 src/features/graph/GraphCanvas.tsx          |  19 +--
 src/features/graph/GraphPanel.tsx           | 147 ++++++++++++---------
 src/features/sort/SortCanvas.tsx            |  19 +--
 src/features/sort/SortPanel.tsx             | 117 +++++++++-------
 src/hooks/__tests__/useKeyboardNav.spec.ts  |  82 ++++++++++++  (신규)
 src/hooks/useKeyboardNav.ts                 |  25 ++++         (신규)
 8 files changed, 366 insertions(+), 138 deletions(-)
```

### workdir unstaged (commit 대상 아님)

```
 .claude/commands/implement.md         |   1 -
 .claude/commands/ship-all.md          |   1 -
 .claude/commands/ship.md              |   1 -
 .claude/go-sdlc-gan.json              |   4 +-
 .claude/skills/auto-ship/SKILL.md     |  56 +++++-
 .claude/skills/github-flow-impl/SKILL.md |  24 +++-
 .claude/skills/github-kanban/SKILL.md  |  58 +++++--
 7 files changed, 120 insertions(+), 25 deletions(-)
```
