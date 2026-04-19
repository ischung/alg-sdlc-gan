# Algorithm Visualization Playground

알고리즘 단계별 시각화 웹 앱입니다. 정렬 알고리즘과 그래프 탐색 알고리즘의 실행 과정을 인터랙티브하게 확인할 수 있습니다.

## 지원 알고리즘

| 분류 | 알고리즘 |
|------|----------|
| 정렬 | 버블 정렬 (Bubble Sort) |
| 정렬 | 선택 정렬 (Selection Sort) |
| 정렬 | 삽입 정렬 (Insertion Sort) |
| 그래프 | 너비 우선 탐색 (BFS) |
| 그래프 | 깊이 우선 탐색 (DFS) |

## 빠른 시작

```bash
# 의존성 설치
npm install

# 개발 서버 실행 (http://localhost:5173)
npm run dev
```

## 사용 방법

### 정렬 알고리즘

1. 상단 탭에서 **버블 정렬 / 선택 정렬 / 삽입 정렬** 중 하나를 선택합니다.
2. 입력 필드에 숫자를 쉼표로 구분하여 입력합니다 (예: `5,3,8,1,9,2`).
3. **시작** 버튼을 누릅니다.
4. `◀` / `▶▶` 버튼 또는 `←` / `→` 방향키로 스텝을 이동합니다.
5. `▶` 버튼으로 자동 재생, `⏸` 버튼으로 일시정지합니다.

### 그래프 알고리즘

1. 상단 탭에서 **BFS / DFS** 중 하나를 선택합니다.
2. 엣지를 `A-B,B-C,C-D` 형태로 입력합니다.
3. 시작 노드를 입력합니다 (예: `A`).
4. **시작** 버튼을 누릅니다.
5. 방향키 또는 버튼으로 탐색 과정을 단계별로 확인합니다.

## 키보드 단축키

| 키 | 동작 |
|----|------|
| `→` (ArrowRight) | 다음 스텝 |
| `←` (ArrowLeft) | 이전 스텝 |

> 텍스트 입력 중에는 방향키가 무시됩니다.

## 전체 명령어

```bash
# 개발 서버
npm run dev

# 프로덕션 빌드
npm run build

# 빌드 결과 미리보기
npm run preview

# 유닛 테스트 (Vitest)
npm test

# 유닛 테스트 (watch 모드)
npm run test:watch

# E2E 테스트 (Playwright, Chromium/Firefox/WebKit)
npm run test:e2e

# 린트
npm run lint
```

## 기술 스택

- **React 19** + **TypeScript**
- **Vite 8** (빌드 도구)
- **Tailwind CSS 4** (스타일링)
- **Vitest** (유닛 테스트)
- **Playwright** (E2E 테스트)

## 프로젝트 구조

```
src/
├── components/          # 공통 UI 컴포넌트
│   ├── AlgorithmSelector.tsx
│   ├── StepControls.tsx
│   └── StepIndicator.tsx
├── features/
│   ├── sort/            # 정렬 알고리즘 (engine, panel, canvas)
│   └── graph/           # 그래프 알고리즘 (engine, panel, canvas)
├── hooks/
│   └── useKeyboardNav.ts  # 방향키 탐색 훅
├── store/
│   └── visualizerReducer.ts
└── types/index.ts
e2e/                     # Playwright E2E 테스트
```
