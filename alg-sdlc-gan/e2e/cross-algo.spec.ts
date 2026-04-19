import { test, expect } from '@playwright/test'

test.describe('@slice:cross 알고리즘 전환 교차 E2E', () => {
  test('버블소트 스텝 5 진행 중 BFS 탭 클릭 → 상태가 idle로 초기화된다', async ({ page }) => {
    await page.goto('/')
    await page.getByLabel('버블 정렬 선택').click()
    await page.getByRole('button', { name: '시작' }).click()

    // step 5까지 이동 (0-based index이므로 5번 클릭 → 스텝 6/N)
    for (let i = 0; i < 5; i++) {
      await page.getByLabel('다음 스텝').click()
    }
    await expect(page.locator('[aria-live="polite"]')).toContainText('스텝 6')

    // BFS 탭 클릭 → GraphPanel 새로 마운트 (idle 상태)
    await page.getByLabel('BFS 선택').click()

    // idle 상태 검증: 스텝 컨트롤 비활성화
    await expect(page.getByLabel('이전 스텝')).toBeDisabled()
    await expect(page.getByLabel('다음 스텝')).toBeDisabled()
    // StepIndicator는 total=0이면 null 반환 → DOM에 없음
    await expect(page.locator('[aria-live="polite"]')).not.toBeVisible()
  })

  test('BFS 진행 중 삽입 정렬 탭 클릭 → 그래프 Canvas 사라지고 정렬 입력 폼 표시', async ({
    page,
  }) => {
    await page.goto('/')
    await page.getByLabel('BFS 선택').click()
    await page.getByRole('button', { name: '시작' }).click()

    // BFS 시작 후 그래프 Canvas 표시 확인
    await expect(page.locator('canvas[aria-label="그래프 시각화 캔버스"]')).toBeVisible()

    // 삽입 정렬로 전환
    await page.getByLabel('삽입 정렬 선택').click()

    // 그래프 Canvas 사라짐 확인
    await expect(page.locator('canvas[aria-label="그래프 시각화 캔버스"]')).not.toBeVisible()

    // 정렬 입력 폼 표시 확인
    await expect(page.getByLabel('정렬할 배열 입력')).toBeVisible()
  })
})
