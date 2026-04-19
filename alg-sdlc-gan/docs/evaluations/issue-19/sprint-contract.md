# Sprint Contract — Issue #19

> 이 문서는 Generator와 Evaluator가 **동일하게 참조하는 계약서**다.
> 한 번 잠그면 iteration 동안 변경되지 않는다.

## Issue
- 번호: #19
- 제목: [L4][Docs] README + 사용 가이드
- 브랜치: feature/issue-15-16-graph-viz
- 잠금 시각: 2026-04-19T00:00:00+09:00

## Acceptance Criteria (원문)
- [ ] `README.md` 존재, 마크다운 문법 오류 없음
- [ ] 로컬 실행 명령어 실제로 동작함 확인
- [ ] 지원 알고리즘 5개(버블소트·선택정렬·삽입정렬·BFS·DFS) 목록 포함

## Testable Criteria (TC)

| ID | 형식 | 본문 | 검증 방법 |
|----|------|------|-----------|
| TC-01 | command→expected | `test -f README.md && echo PASS` → `PASS` | 프로젝트 루트에서 실행; 파일 존재 여부 확인 |
| TC-02 | command→expected | `npx markdownlint README.md` → exit code 0, 오류 메시지 없음 (가정: markdownlint-cli 설치 가능) | 마크다운 문법 오류 부재 확인 |
| TC-03 | given/when/then | Given 프로젝트 루트에서 `npm install`을 실행했을 때, when `npm run dev`를 실행하면, then 프로세스가 종료 코드 0 없이 정상 기동되고 stdout에 `localhost:5173` 이 포함된 URL을 출력한다 | 개발 서버 기동 로그 육안 확인 |
| TC-04 | command→expected | `npm run build` → exit code 0 | `npm run build` 실행 후 종료 코드 확인 |
| TC-05 | command→expected | `npm test` → exit code 0 | Vitest 유닛 테스트 전체 통과 |
| TC-06 | given/when/then | Given README.md 파일을 열었을 때, when 알고리즘 목록 섹션을 확인하면, then 버블 정렬·선택 정렬·삽입 정렬·BFS·DFS 5개 알고리즘이 모두 명시되어 있다 | `grep -E "버블|선택|삽입|BFS|DFS" README.md` 로 5개 패턴 전부 검출 |
| TC-07 | given/when/then | Given README.md 파일을 열었을 때, when 빠른 시작 섹션을 확인하면, then `npm install`과 `npm run dev` 명령어가 코드 블록(```) 안에 포함되어 있다 | README.md 내 명령어 코드 블록 육안 확인 |
| TC-08 | given/when/then | Given README.md 파일을 열었을 때, when 키보드 단축키 섹션을 확인하면, then ArrowRight(다음 스텝)와 ArrowLeft(이전 스텝) 단축키가 테이블 또는 목록 형태로 기술되어 있다 | README.md 내 키보드 단축키 섹션 육안 확인 |
| TC-09 | given/when/then | Given README.md 파일을 열었을 때, when 기술 스택 섹션을 확인하면, then React, TypeScript, Vite, Tailwind CSS, Vitest, Playwright가 각각 명시되어 있다 | `grep -E "React|TypeScript|Vite|Tailwind|Vitest|Playwright" README.md` 로 6개 패턴 전부 검출 |
| TC-10 | given/when/then | Given README.md 파일을 열었을 때, when 프로젝트 구조 섹션을 확인하면, then `src/features/sort/`와 `src/features/graph/` 경로가 트리 또는 목록 형태로 포함되어 있다 | `grep -E "features/sort|features/graph" README.md` 로 두 경로 검출 |

## Non-goals

- `src/` 하위 소스 코드 수정 — 이번 이슈는 문서 작업만 해당한다 (명시).
- 새로운 알고리즘 추가 또는 기존 알고리즘 동작 변경 — #17 이하 구현 이슈 범위다 (명시).
- GitHub Actions CI 워크플로우 변경 — 별도 운영 이슈 범위다 (추론).
- `docs/` 이외 디렉토리에 마크다운 가이드 파일 신설 — YAGNI, README.md 단일 진입점으로 충분하다 (추론).

## Definition of Done

- [ ] 모든 TC Pass
- [ ] `npm run build` 종료 코드 0
- [ ] `npm test` 종료 코드 0
- [ ] Evaluator rubric 평균 >= 8.0 AND 각 항목 >= 6.0
- [ ] Non-goals 침범 없음
- [ ] 기존 테스트 파손 없음

## 해석 기록

- AC1 "마크다운 문법 오류 없음"은 렌더링 결과가 아닌 markdownlint 규칙 기준으로 해석했다. markdownlint-cli가 없는 환경에서는 GitHub 렌더링 육안 확인으로 대체할 수 있다 (TC-02 가정 참조).
- AC2 "로컬 실행 명령어 실제로 동작함 확인"은 `npm run dev` 기동 성공과 `npm run build` 빌드 성공 두 가지로 분해했다. E2E 테스트 실행은 AC3 범위가 아니므로 TC에서 별도 포함하지 않았다.
- AC3 알고리즘 5개 목록은 README.md 내 명시적 텍스트 존재 여부로 판정한다. 한글 표기(버블 정렬 등)와 영문 약칭(BFS/DFS) 혼용이 허용된다고 해석했다.
