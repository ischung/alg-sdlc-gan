import { test, expect } from '@playwright/test'

test('홈 접속 시 canvas 엘리먼트가 존재한다', async ({ page }) => {
  await page.goto('/')
  const canvas = page.locator('canvas[role="img"]')
  await expect(canvas).toBeVisible()
})
