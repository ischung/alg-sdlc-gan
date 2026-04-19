import { test, expect } from '@playwright/test'

test.describe('@slice:bubble 버블소트 E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.getByLabel('버블 정렬 선택').click()
  })

  test('버블 정렬 선택 후 시작하면 Canvas가 표시된다', async ({ page }) => {
    await page.getByRole('button', { name: '시작' }).click()
    await expect(page.locator('canvas[role="img"]')).toBeVisible()
  })

  test('다음 스텝 클릭 시 스텝 인디케이터가 변경된다', async ({ page }) => {
    await page.getByRole('button', { name: '시작' }).click()
    const before = await page.locator('[aria-live="polite"]').textContent()
    await page.getByLabel('다음 스텝').click()
    const after = await page.locator('[aria-live="polite"]').textContent()
    expect(before).not.toBe(after)
  })
})
