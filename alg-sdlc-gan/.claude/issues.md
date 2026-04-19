# Issues — 알고리즘 시각화 플레이그라운드

> **원본 TechSpec**: algo-playground-techspec.md
> **생성일**: 2026-04-19
> **총 이슈 수**: 19개
> **총 예상 소요**: 14.5일
> **DAG 레벨 수**: 5개 (L0~L4)

---

## 병렬 실행 그룹 (DAG 레벨별)

각 레벨 안의 이슈는 서로 의존하지 않아 별도 브랜치로 병렬 구현 가능하다.
한 레벨이 모두 Done이 되어야 다음 레벨을 시작한다.

**L0 — Walking Skeleton** (end-to-end 뼈대 · 8항목 · 전부 병렬)
- #1 [Setup] 프로젝트 초기 구조 및 빌드 설정
- #2 [State] visualizerReducer 뼈대 + 공유 타입 정의
- #3 [Core] 알고리즘 엔진 인터페이스 뼈대
- #4 [Frontend] App 기본 레이아웃 껍데기
- #5 [Frontend] VisualizationCanvas + Canvas ref + 더미 drawFrame
- #6 [Core] 공통 에러 바운더리 + 에러 메시지 컴포넌트
- #7 [CI/CD] CI Gate 기본 구조 (lint + Vitest + Playwright E2E)
- #8 [Test] 테스트 환경 설정 (Vitest + Playwright 스캐폴드)

**L1 — Shared Primitives** (L0 후행, 유틸별 병렬)
- #9  [Core] 정렬 입력 검증 유틸 + 배열 불변 복사 헬퍼
- #10 [Core] 그래프 파싱·검증 유틸 + 좌표 정규화 헬퍼
- #11 [UI] 공통 UI 컴포넌트 (AlgorithmSelector, StepControls, StepIndicator)

**L2 — Vertical Slice** (L1 후행, 슬라이스별 병렬 — 엔진+UI+E2E 일체)
- #12 [slice-bubble]    사용자가 버블소트의 단계별 배열 상태를 스텝 제어로 확인할 수 있다
- #13 [slice-selection] 사용자가 선택 정렬의 단계별 배열 상태를 스텝 제어로 확인할 수 있다
- #14 [slice-insertion] 사용자가 삽입 정렬의 단계별 배열 상태를 스텝 제어로 확인할 수 있다
- #15 [slice-bfs]       사용자가 BFS 탐색 순서를 단계별로 그래프에서 확인할 수 있다
- #16 [slice-dfs]       사용자가 DFS 탐색 순서를 단계별로 그래프에서 확인할 수 있다

**L3 — Cross-slice Integration** (L2 후행)
- #17 [Test]   알고리즘 전환 교차 E2E
- #18 [UI/UX]  전역 반응형 레이아웃 + 접근성

**L4 — Polish** (L3 후행)
- #19 [Docs] README + 사용 가이드

---

## #1 [L0][Setup] 프로젝트 초기 구조 및 빌드 설정

**레벨**: L0 — Walking Skeleton
**레이블**: Setup
**예상 소요**: 0.5일
**선행 이슈**: 없음
**병렬 가능 이슈**: #2, #3, #4, #5, #6, #7, #8

### 설명
Vite + React 18 + TypeScript + Tailwind CSS 기반 프로젝트를 초기화하고, 폴더 구조(`features/`, `components/`, `store/`, `types/`)를 설정한다. ESLint + Prettier 설정 포함.

### 수락 기준 (Acceptance Criteria)
- [ ] `npm run dev`로 개발 서버 기동 확인
- [ ] `npm run build`로 정적 빌드 성공
- [ ] ESLint + Prettier 설정 완료, `npm run lint` 통과
- [ ] `src/features/sort/`, `src/features/graph/`, `src/components/`, `src/store/`, `src/types/` 폴더 구조 존재

### 참고
- TechSpec §3 기술 스택

---

## #2 [L0][State] visualizerReducer 뼈대 + 공유 타입 정의

**레벨**: L0 — Walking Skeleton
**레이블**: State
**예상 소요**: 0.5일
**선행 이슈**: 없음
**병렬 가능 이슈**: #1, #3, #4, #5, #6, #7, #8

### 설명
`src/types/index.ts`에 `SortStep`, `GraphStep`, `VisualizerState`, `VisualizerAction` 타입을 정의하고, `src/store/visualizerReducer.ts`에 `useReducer` 기반 상태 관리 뼈대를 구현한다. 초기 상태와 각 액션 타입 핸들러(빈 구현)를 포함.

### 수락 기준 (Acceptance Criteria)
- [ ] `VisualizerState` 초기값이 `idle` 상태로 정의됨
- [ ] 모든 `VisualizerAction` 타입이 TypeScript 오류 없이 컴파일됨
- [ ] `dispatch(RESET)` 호출 시 초기 상태로 돌아오는 단위 테스트 통과

### 참고
- TechSpec §4 데이터 모델

---

## #3 [L0][Core] 알고리즘 엔진 인터페이스 뼈대

**레벨**: L0 — Walking Skeleton
**레이블**: Core
**예상 소요**: 0.5일
**선행 이슈**: 없음
**병렬 가능 이슈**: #1, #2, #4, #5, #6, #7, #8

### 설명
`computeSortSteps(array, algorithm): SortStep[]`와 `computeGraphSteps(graph, startNode, algorithm): GraphStep[]` 함수 시그니처를 정의하고, 더미 구현(빈 배열 반환)으로 뼈대를 잡는다. L2 슬라이스에서 실제 알고리즘으로 교체한다.

### 수락 기준 (Acceptance Criteria)
- [ ] 두 함수가 TypeScript 타입 오류 없이 컴파일됨
- [ ] 더미 구현 호출 시 빈 배열(`[]`)을 반환하는 단위 테스트 통과

### 참고
- TechSpec §5 API 명세

---

## #4 [L0][Frontend] App 기본 레이아웃 껍데기 (3-영역 구조)

**레벨**: L0 — Walking Skeleton
**레이블**: Frontend
**예상 소요**: 0.5일
**선행 이슈**: 없음
**병렬 가능 이슈**: #1, #2, #3, #5, #6, #7, #8

### 설명
`App.tsx`에 상단(AlgorithmSelector 영역), 중앙(VisualizationCanvas 영역), 하단(StepControls 영역) 3-영역 레이아웃을 Tailwind로 구현한다. 각 영역은 빈 `<div>` placeholder로 시작.

### 수락 기준 (Acceptance Criteria)
- [ ] 3-영역 레이아웃이 브라우저에 렌더링됨
- [ ] `md` 브레이크포인트(768px) 기준 2-column 레이아웃으로 전환됨
- [ ] 배경색 `slate-900` 적용

### 참고
- TechSpec §7 UI/UX 스타일 가이드 §7.4 레이아웃

---

## #5 [L0][Frontend] VisualizationCanvas + Canvas ref + 더미 drawFrame

**레벨**: L0 — Walking Skeleton
**레이블**: Frontend
**예상 소요**: 1일
**선행 이슈**: 없음
**병렬 가능 이슈**: #1, #2, #3, #4, #6, #7, #8

### 설명
`VisualizationCanvas` 컴포넌트를 생성하고 `useRef`로 Canvas DOM에 접근한다. `drawFrame()` 더미 구현(배경색 채우기 + "캔버스 준비 완료" 텍스트 표시)으로 Canvas가 실제로 동작함을 확인한다.

### 수락 기준 (Acceptance Criteria)
- [ ] `<canvas>` 엘리먼트가 DOM에 존재하며 `role="img"`, `aria-label` 속성 포함
- [ ] 더미 `drawFrame()`이 배경(`#0f172a`)과 텍스트를 렌더링함
- [ ] Playwright E2E: "홈 접속 → `canvas` 엘리먼트 존재 확인" 통과

### 참고
- TechSpec §6-3 Canvas 렌더러 명세

---

## #6 [L0][Core] 공통 에러 바운더리 + 에러 메시지 컴포넌트

**레벨**: L0 — Walking Skeleton
**레이블**: Core
**예상 소요**: 0.5일
**선행 이슈**: 없음
**병렬 가능 이슈**: #1, #2, #3, #4, #5, #7, #8

### 설명
React `ErrorBoundary` 클래스 컴포넌트와 `ErrorMessage` 함수형 컴포넌트를 구현한다. 에러 발생 시 친근한 메시지("앗, 문제가 생겼어요! 다시 시도해볼까요?") + [다시 시작] 버튼을 표시한다.

### 수락 기준 (Acceptance Criteria)
- [ ] `ErrorBoundary`로 감싼 하위 컴포넌트에서 throw 발생 시 에러 메시지 UI 렌더링됨
- [ ] [다시 시작] 버튼 클릭 시 `dispatch(RESET)` 호출됨
- [ ] 단위 테스트: throw → 에러 메시지 렌더링 확인

### 참고
- PRD §5.1 Edge Case, TechSpec §6-5 에러 처리

---

## #7 [L0][CI/CD] CI Gate 기본 구조 (lint + Vitest + Playwright E2E)

**레벨**: L0 — Walking Skeleton
**레이블**: CI/CD
**예상 소요**: 0.5일
**선행 이슈**: 없음
**병렬 가능 이슈**: #1, #2, #3, #4, #5, #6, #8

### 설명
PR 트리거 GitHub Actions 워크플로우를 설정한다. ESLint → Vitest → Playwright E2E 순서로 실행하며, 하나라도 실패 시 PR 머지를 차단한다.

이 프로젝트는 **W(웹 배포)** 프로파일이므로 이 이슈는 CI Gate까지만 책임진다. Docker Build·GitHub Pages 배포·컨테이너 스캔 등 CD 이슈는 `/cicd-pipeline` 스킬로 별도 생성하세요.

### 수락 기준 (Acceptance Criteria)
- [ ] `.github/workflows/ci.yml` 존재, PR 대상 브랜치 `main`
- [ ] `npm run lint` → `npm run test` → `npx playwright test` 순차 실행
- [ ] 더미 Playwright 시나리오 1개("홈 → canvas 존재")가 CI에서 통과됨
- [ ] 실패 시 PR 머지 불가 상태 표시

### 참고
- TechSpec §2-3 배포 프로파일

---

## #8 [L0][Test] 테스트 환경 설정 (Vitest + Playwright 스캐폴드)

**레벨**: L0 — Walking Skeleton
**레이블**: Test
**예상 소요**: 1일
**선행 이슈**: 없음
**병렬 가능 이슈**: #1, #2, #3, #4, #5, #6, #7

### 설명
Vitest 설정(`vitest.config.ts`), Playwright 설정(`playwright.config.ts`)을 완성한다. 테스트 디렉토리 구조(`src/**/__tests__/`, `e2e/`) 및 첫 번째 Playwright 시나리오("홈 접속 → canvas 엘리먼트 존재 확인")를 작성한다.

### 수락 기준 (Acceptance Criteria)
- [ ] `npm run test`로 Vitest 실행됨
- [ ] `npx playwright test`로 E2E 실행됨 (Chromium, Firefox, WebKit 3개 브라우저)
- [ ] `e2e/home.spec.ts`: 홈 접속 → `canvas` 존재 확인 시나리오 통과
- [ ] 실패 시 screenshot + video 아티팩트 업로드 설정

### 참고
- TechSpec §3 기술 스택 (Vitest, Playwright)

---

## #9 [L1][Core] 정렬 입력 검증 유틸 + 배열 불변 복사 헬퍼

**레벨**: L1 — Shared Primitives
**레이블**: Core
**예상 소요**: 0.5일
**선행 이슈**: L0 완료
**병렬 가능 이슈**: #10, #11

### 설명
`src/features/sort/utils.ts`에 `validateSortInput(raw: string)` 함수와 배열 깊은 복사 헬퍼를 구현한다. L2 정렬 슬라이스들이 공통으로 사용한다.

### 수락 기준 (Acceptance Criteria)
- [ ] 유효 입력("5,3,8,1") → `{ valid: true, array: [5,3,8,1] }` 반환
- [ ] 빈 입력, 문자 포함, 범위 초과 각 케이스별 에러 메시지 반환 단위 테스트 통과
- [ ] 반환 배열이 원본과 참조가 다름(불변 복사) 확인

### 참고
- TechSpec §6-4 입력값 검증

---

## #10 [L1][Core] 그래프 파싱·검증 유틸 + 좌표 정규화 헬퍼

**레벨**: L1 — Shared Primitives
**레이블**: Core
**예상 소요**: 0.5일
**선행 이슈**: L0 완료
**병렬 가능 이슈**: #9, #11

### 설명
`src/features/graph/utils.ts`에 `validateGraphInput`, `normalizeCoordinates` 함수를 구현한다. 노드 수(2~15), 시작 노드 존재 여부 검증 및 Canvas 좌표 정규화(0~1 범위)를 담당한다.

### 수락 기준 (Acceptance Criteria)
- [ ] 노드 1개 입력 시 에러 메시지 반환 단위 테스트 통과
- [ ] 존재하지 않는 시작 노드 입력 시 에러 반환 확인
- [ ] 정규화 함수: 노드 좌표가 0.0~1.0 범위로 변환됨

### 참고
- PRD §5.2 그래프 탐색 Validation

---

## #11 [L1][UI] 공통 UI 컴포넌트 (AlgorithmSelector, StepControls, StepIndicator)

**레벨**: L1 — Shared Primitives
**레이블**: UI
**예상 소요**: 1일
**선행 이슈**: L0 완료
**병렬 가능 이슈**: #9, #10

### 설명
`src/components/`에 세 컴포넌트를 구현한다.
- `AlgorithmSelector`: 정렬(버블/선택/삽입) + 그래프(BFS/DFS) 탭 전환 UI
- `StepControls`: 이전·다음·재생/일시정지 버튼 + 속도 슬라이더(0.5×/1×/1.5×/2×)
- `StepIndicator`: "스텝 N / M" 텍스트 표시

### 수락 기준 (Acceptance Criteria)
- [ ] `AlgorithmSelector`: 탭 클릭 시 `dispatch(SET_ALGORITHM)` 호출됨
- [ ] `StepControls`: `playState === 'idle'`이면 이전·다음·재생 버튼 모두 비활성화
- [ ] `StepControls`: 재생 중 입력 필드 비활성화(`disabled` 속성)
- [ ] `StepIndicator`: `currentStep=2, total=10` 입력 시 "스텝 3 / 10" 표시
- [ ] 모든 버튼에 `aria-label` 속성 포함

### 참고
- PRD §5.3 스텝 제어, TechSpec §7 UI/UX

---

## #12 [L2][slice-bubble] 사용자가 버블소트의 단계별 배열 상태를 스텝 제어로 확인할 수 있다

**레벨**: L2 — Vertical Slice
**슬라이스 ID**: slice-bubble
**예상 소요**: 1.5일
**PR 크기 상한**: 500 LOC 권장
**선행 이슈**: #9, #11
**병렬 가능 이슈**: #13, #14 (정렬 슬라이스 병렬 가능)

### 사용자 스토리
- **As a** 자료구조 수업 수강 학생
- **I want** 버블소트 실행 중 어떤 원소가 비교·교환되는지 스텝별로 확인
- **So that** swap이 언제 어떻게 일어나는지 직접 파악할 수 있다

### 인수 조건 (Acceptance Criteria)
- [ ] 배열 입력 후 [시작] 클릭 시 전체 스텝 시퀀스가 계산되고 첫 스텝이 Canvas에 표시됨
- [ ] 비교 중인 두 원소는 주황색, swap된 원소는 빨간색, 확정 원소는 초록색으로 표시됨
- [ ] [다음] 클릭 시 다음 스텝으로 전환되며 배열 상태가 변경됨
- [ ] 마지막 스텝 도달 시 "정렬 완료!" 표시 + [처음으로] 버튼 활성화
- [ ] 입력값 변경 후 [시작] 클릭 시 시퀀스가 재계산됨
- [ ] **Playwright E2E 시나리오 통과** (`@slice:bubble`)
- [ ] 단위·통합 테스트 통과

### 구현 태스크

#### Database
해당 없음 — 순수 클라이언트 SPA

#### Backend API
해당 없음 — 알고리즘 엔진이 이 역할을 대체

#### Algorithm Engine
- [ ] `src/features/sort/engines/bubbleSort.ts`: `computeSortSteps(array, 'bubble')` 구현
- [ ] 각 스텝에서 `comparing`, `swapped`, `sorted`, `description` 필드 정확히 채움

#### Frontend
- [ ] `SortCanvas`: `steps[currentStep]` 기반 막대그래프 렌더링
- [ ] `SortInputPanel`: 배열 입력 폼 + [시작] 버튼 연결

#### Integration
- [ ] `InputPanel → computeSortSteps → dispatch(START) → Canvas` 흐름 연결
- [ ] 재생 중 입력 필드 비활성화 적용

#### Tests
- [ ] **Unit**: `bubbleSort([5,3,1])` → 스텝 수·swap 위치 검증
- [ ] **Unit**: 이미 정렬된 배열(`[1,2,3]`) → `swapped: null` 스텝만 존재
- [ ] **Playwright E2E** (태그 `@slice:bubble`):
  - 성공: "5,3,8,1" 입력 → [시작] → [다음] 3회 → 배열 변화 확인 → 최종 "정렬 완료!" 표시
  - 실패: 빈 입력 → [시작] → 에러 메시지 표시
  - 대상 브라우저: Chromium, Firefox, WebKit
  - 실패 시 screenshot + video 아티팩트 업로드

### 참고
- PRD §5.1, TechSpec §4-1, §6-3

---

## #13 [L2][slice-selection] 사용자가 선택 정렬의 단계별 배열 상태를 스텝 제어로 확인할 수 있다

**레벨**: L2 — Vertical Slice
**슬라이스 ID**: slice-selection
**예상 소요**: 1일
**PR 크기 상한**: 500 LOC 권장
**선행 이슈**: #9, #11
**병렬 가능 이슈**: #12, #14

### 사용자 스토리
- **As a** 자료구조 수업 수강 학생
- **I want** 선택 정렬에서 최솟값을 찾는 과정과 교환을 스텝별로 시각화
- **So that** 선택 정렬이 버블소트와 어떻게 다른지 비교할 수 있다

### 인수 조건 (Acceptance Criteria)
- [ ] AlgorithmSelector에서 "선택 정렬" 탭 선택 시 입력 폼이 전환됨
- [ ] 매 라운드 최솟값 탐색 중 비교 원소가 주황색으로 표시됨
- [ ] 라운드 종료 후 최솟값이 확정 위치로 이동하며 초록색 표시
- [ ] **Playwright E2E 시나리오 통과** (`@slice:selection`)

### 구현 태스크

#### Database / Backend API
해당 없음

#### Algorithm Engine
- [ ] `src/features/sort/engines/selectionSort.ts`: `computeSortSteps(array, 'selection')` 구현

#### Frontend
- [ ] `SortCanvas`가 `selection` 알고리즘 스텝도 동일 렌더러로 처리 (색상 규칙 동일)
- [ ] AlgorithmSelector에 "선택 정렬" 탭 추가

#### Integration / Tests
- [ ] **Unit**: `selectionSort([4,2,5,1])` → 라운드별 최솟값 위치 검증
- [ ] **Playwright E2E** (`@slice:selection`): "4,2,5,1" 입력 → 선택 정렬 탭 → 시작 → 완료 확인

### 참고
- PRD §5.1, TechSpec §6-1

---

## #14 [L2][slice-insertion] 사용자가 삽입 정렬의 단계별 배열 상태를 스텝 제어로 확인할 수 있다

**레벨**: L2 — Vertical Slice
**슬라이스 ID**: slice-insertion
**예상 소요**: 1일
**PR 크기 상한**: 500 LOC 권장
**선행 이슈**: #9, #11
**병렬 가능 이슈**: #12, #13

### 사용자 스토리
- **As a** 자료구조 수업 수강 학생
- **I want** 삽입 정렬에서 원소가 올바른 위치로 이동하는 과정을 스텝별로 확인
- **So that** 삽입 정렬의 "카드 정렬" 메타포를 시각적으로 이해할 수 있다

### 인수 조건 (Acceptance Criteria)
- [ ] 현재 삽입 대상 원소가 주황색으로 표시됨
- [ ] 비교하며 이동하는 원소들이 빨간색으로 표시됨
- [ ] 최종 삽입 위치 확정 시 초록색으로 전환
- [ ] **Playwright E2E 시나리오 통과** (`@slice:insertion`)

### 구현 태스크

#### Database / Backend API
해당 없음

#### Algorithm Engine
- [ ] `src/features/sort/engines/insertionSort.ts`: `computeSortSteps(array, 'insertion')` 구현

#### Frontend / Integration / Tests
- [ ] AlgorithmSelector에 "삽입 정렬" 탭 추가
- [ ] **Unit**: `insertionSort([3,1,4,1,5])` → 삽입 위치별 스텝 검증
- [ ] **Playwright E2E** (`@slice:insertion`): 삽입 정렬 탭 → "3,1,4" 입력 → 완료 확인

### 참고
- PRD §5.1, TechSpec §6-1

---

## #15 [L2][slice-bfs] 사용자가 BFS 탐색 순서를 단계별로 그래프에서 확인할 수 있다

**레벨**: L2 — Vertical Slice
**슬라이스 ID**: slice-bfs
**예상 소요**: 2일
**PR 크기 상한**: 500 LOC 권장
**선행 이슈**: #10, #11
**병렬 가능 이슈**: #12, #13, #14, #16

### 사용자 스토리
- **As a** 자료구조 수업 수강 학생
- **I want** BFS가 노드를 어떤 순서로 방문하는지 그래프 위에서 단계별로 확인
- **So that** 너비 우선 탐색의 큐 기반 동작 원리를 직관적으로 이해할 수 있다

### 인수 조건 (Acceptance Criteria)
- [ ] AlgorithmSelector에서 "BFS" 탭 선택 시 그래프 입력 UI로 전환됨
- [ ] 각 스텝에서 현재 방문 노드가 주황색, 방문 완료 노드가 초록색, 미방문 노드가 회색으로 표시됨
- [ ] 현재 활성 엣지가 주황색 점선 화살표로 표시됨
- [ ] 현재 큐 상태가 UI에 텍스트로 표시됨 (예: "큐: [B, C]")
- [ ] 연결되지 않은 노드 존재 시 "일부 노드는 도달할 수 없어요." 메시지 표시
- [ ] **Playwright E2E 시나리오 통과** (`@slice:bfs`)

### 구현 태스크

#### Database / Backend API
해당 없음

#### Algorithm Engine
- [ ] `src/features/graph/engines/bfs.ts`: `computeGraphSteps(graph, startNode, 'bfs')` 구현
- [ ] 사이클 그래프에서 방문 처리(visited set)로 무한루프 방지

#### Frontend
- [ ] `GraphCanvas`: 노드(원+레이블), 엣지(화살표), 색상 상태 렌더링
- [ ] `GraphInputPanel`: 노드/엣지 텍스트 입력 UI + 시작 노드 선택

#### Integration
- [ ] `GraphInputPanel → computeGraphSteps → dispatch(START) → GraphCanvas` 흐름 연결

#### Tests
- [ ] **Unit**: 단순 그래프(A→B→C)에서 BFS 방문 순서 검증
- [ ] **Unit**: 사이클 그래프에서 무한루프 없이 종료 확인
- [ ] **Playwright E2E** (`@slice:bfs`):
  - 성공: BFS 탭 → 그래프 입력 → 시작 → 노드 A 주황색 → 다음 → 방문 완료 초록색 확인
  - 미도달 노드: 고립 노드 포함 그래프 → 회색 처리 + 메시지 확인
  - 대상 브라우저: Chromium, Firefox, WebKit

### 참고
- PRD §5.2, TechSpec §4-2, §6-3

---

## #16 [L2][slice-dfs] 사용자가 DFS 탐색 순서를 단계별로 그래프에서 확인할 수 있다

**레벨**: L2 — Vertical Slice
**슬라이스 ID**: slice-dfs
**예상 소요**: 1일
**PR 크기 상한**: 500 LOC 권장
**선행 이슈**: #10, #11
**병렬 가능 이슈**: #12, #13, #14, #15

### 사용자 스토리
- **As a** 자료구조 수업 수강 학생
- **I want** DFS가 BFS와 다른 탐색 경로를 보여주는 것을 같은 그래프에서 비교
- **So that** 스택 기반 깊이 우선 탐색을 BFS와 대비하여 이해할 수 있다

### 인수 조건 (Acceptance Criteria)
- [ ] AlgorithmSelector에서 "DFS" 탭 선택 시 그래프 입력 UI로 전환됨
- [ ] 현재 스택 상태가 UI에 표시됨 (예: "스택: [C, B]")
- [ ] 동일 입력으로 BFS와 방문 순서가 다름을 E2E에서 검증
- [ ] **Playwright E2E 시나리오 통과** (`@slice:dfs`)

### 구현 태스크

#### Database / Backend API
해당 없음

#### Algorithm Engine
- [ ] `src/features/graph/engines/dfs.ts`: `computeGraphSteps(graph, startNode, 'dfs')` 구현 (재귀 또는 명시적 스택)

#### Frontend / Integration / Tests
- [ ] AlgorithmSelector에 "DFS" 탭 추가 (GraphCanvas 재사용)
- [ ] **Unit**: 동일 그래프에서 BFS/DFS 방문 순서 비교 테스트
- [ ] **Playwright E2E** (`@slice:dfs`): DFS 탭 → 동일 그래프 → BFS와 다른 순서 확인

### 참고
- PRD §5.2, TechSpec §6-1

---

## #17 [L3][Test] 알고리즘 전환 교차 E2E (정렬→그래프 전환 후 상태 초기화 확인)

**레벨**: L3 — Cross-slice Integration
**레이블**: Test
**예상 소요**: 1일
**선행 이슈**: #12, #13, #14, #15, #16
**병렬 가능 이슈**: #18

### 설명
L2 슬라이스들이 각자 자기 E2E를 가지므로, L3에서는 슬라이스 간 교차 시나리오만 다룬다. 정렬 시각화 진행 중 BFS/DFS로 탭을 전환하면 이전 상태가 초기화되는지, 그리고 다시 정렬 탭으로 돌아오면 초기 상태로 시작하는지 검증한다.

### 수락 기준 (Acceptance Criteria)
- [ ] 버블소트 스텝 5 진행 중 BFS 탭 클릭 → visualizerState가 `idle`로 초기화됨
- [ ] BFS 진행 중 삽입 정렬 탭 클릭 → 그래프 Canvas가 사라지고 정렬 입력 폼이 표시됨
- [ ] Playwright 교차 시나리오 통과 (Chromium, Firefox, WebKit)

### 참고
- TechSpec §8 Phase 4

---

## #18 [L3][UI/UX] 전역 반응형 레이아웃 + 접근성 (키보드 탐색, aria)

**레벨**: L3 — Cross-slice Integration
**레이블**: UI/UX
**예상 소요**: 1일
**선행 이슈**: #12, #13, #14, #15, #16
**병렬 가능 이슈**: #17

### 설명
전체 앱을 대상으로 반응형 레이아웃과 접근성을 검증·보완한다. 태블릿 뷰포트(768px)에서 2-column 레이아웃 전환, 키보드(`←`/`→` 스텝 이동), aria 속성 전수 검사.

### 수락 기준 (Acceptance Criteria)
- [ ] Playwright 뷰포트 768px: 좌측 InputPanel + 우측 Canvas 2-column 레이아웃 확인
- [ ] `←`/`→` 방향키로 이전/다음 스텝 이동 동작 확인
- [ ] 모든 버튼 `aria-label`, Canvas `role="img"` 속성 존재 확인
- [ ] 터치 타깃 44px 이상 확인

### 참고
- TechSpec §7.4 레이아웃, §7.5 접근성

---

## #19 [L4][Docs] README + 사용 가이드

**레벨**: L4 — Polish
**레이블**: Docs
**예상 소요**: 0.5일
**선행 이슈**: #17
**병렬 가능 이슈**: 없음

### 설명
`README.md`에 프로젝트 소개, 지원 알고리즘 목록, 로컬 실행 방법(`npm install && npm run dev`), GitHub Pages 배포 방법, 스크린샷을 작성한다.

### 수락 기준 (Acceptance Criteria)
- [ ] `README.md` 존재, 마크다운 문법 오류 없음
- [ ] 로컬 실행 명령어 실제로 동작함 확인
- [ ] 지원 알고리즘 5개(버블소트·선택정렬·삽입정렬·BFS·DFS) 목록 포함

### 참고
- PRD §1.1 Core Goal
