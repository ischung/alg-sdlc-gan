import { test, expect } from '@playwright/test'

test('홈 접속 시 알고리즘 선택기가 표시된다', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByLabel('버블 정렬 선택')).toBeVisible()
  await expect(page.getByLabel('BFS 선택')).toBeVisible()
})

test('알고리즘 선택 후 canvas 엘리먼트가 표시된다', async ({ page }) => {
  await page.goto('/')
  await page.getByLabel('버블 정렬 선택').click()
  await page.getByRole('button', { name: '시작' }).click()
  await expect(page.locator('canvas[role="img"]')).toBeVisible()
})
