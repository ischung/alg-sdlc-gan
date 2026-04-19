import { test, expect } from '@playwright/test'

test.describe('@slice:a11y 반응형 레이아웃 + 접근성', () => {
  test('뷰포트 768px에서 2-column 레이아웃 확인', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 900 })
    await page.goto('/')
    await page.getByLabel('버블 정렬 선택').click()

    const grid = page.locator('.grid.md\\:grid-cols-2').first()
    await expect(grid).toBeVisible()

    // 좌측 입력 패널과 우측 캔버스가 나란히 배치됨을 확인
    const inputPanel = page.getByLabel('정렬할 배열 입력')
    const canvas = page.locator('canvas[aria-label="정렬 시각화 캔버스"]')
    await expect(inputPanel).toBeVisible()
    await expect(canvas).toBeVisible()

    const inputBox = await inputPanel.boundingBox()
    const canvasBox = await canvas.boundingBox()
    // 768px 이상에서는 canvas가 입력 패널보다 오른쪽에 위치
    expect(canvasBox!.x).toBeGreaterThan(inputBox!.x)
  })

  test('방향키로 이전/다음 스텝 이동', async ({ page }) => {
    await page.goto('/')
    await page.getByLabel('버블 정렬 선택').click()
    await page.getByRole('button', { name: '시작' }).click()

    const indicator = page.locator('[aria-live="polite"]')
    const step1 = await indicator.textContent()

    await page.keyboard.press('ArrowRight')
    const step2 = await indicator.textContent()
    expect(step2).not.toBe(step1)

    await page.keyboard.press('ArrowLeft')
    const step3 = await indicator.textContent()
    expect(step3).toBe(step1)
  })

  test('모든 StepControls 버튼에 aria-label 존재', async ({ page }) => {
    await page.goto('/')
    await page.getByLabel('버블 정렬 선택').click()
    await page.getByRole('button', { name: '시작' }).click()

    await expect(page.getByLabel('이전 스텝')).toBeVisible()
    await expect(page.getByLabel('다음 스텝')).toBeVisible()
    await expect(page.getByLabel('재생')).toBeVisible()
  })

  test('Canvas에 role="img" 속성 존재', async ({ page }) => {
    await page.goto('/')
    await page.getByLabel('버블 정렬 선택').click()

    await expect(page.locator('canvas[role="img"]')).toBeVisible()
  })

  test('StepControls 버튼 터치 타깃 44px 이상', async ({ page }) => {
    await page.goto('/')
    await page.getByLabel('버블 정렬 선택').click()
    await page.getByRole('button', { name: '시작' }).click()

    const prevBtn = page.getByLabel('이전 스텝')
    const box = await prevBtn.boundingBox()
    expect(box!.height).toBeGreaterThanOrEqual(44)
  })

  test('그래프 BFS 2-column 레이아웃 확인', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 900 })
    await page.goto('/')
    await page.getByLabel('BFS 선택').click()

    const grid = page.locator('.grid.md\\:grid-cols-2').first()
    await expect(grid).toBeVisible()

    const edgeInput = page.getByLabel('그래프 엣지 입력')
    const canvas = page.locator('canvas[aria-label="그래프 시각화 캔버스"]')
    await expect(edgeInput).toBeVisible()
    await expect(canvas).toBeVisible()

    const inputBox = await edgeInput.boundingBox()
    const canvasBox = await canvas.boundingBox()
    expect(canvasBox!.x).toBeGreaterThan(inputBox!.x)
  })
})
