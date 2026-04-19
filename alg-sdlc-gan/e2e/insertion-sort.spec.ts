import { test, expect } from '@playwright/test'

test.describe('@slice:insertion 삽입 정렬 E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.getByLabel('삽입 정렬 선택').click()
  })

  test('삽입 정렬 탭 클릭 시 입력 폼이 전환된다', async ({ page }) => {
    await expect(page.getByLabel('정렬할 배열 입력')).toBeVisible()
  })

  test('시작 후 Canvas가 표시된다', async ({ page }) => {
    await page.getByRole('button', { name: '시작' }).click()
    await expect(page.locator('canvas[role="img"]')).toBeVisible()
  })
})
