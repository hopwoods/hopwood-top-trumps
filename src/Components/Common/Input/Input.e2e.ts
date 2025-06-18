import { test, expect } from '@playwright/test'

const BASE_URL = 'http://localhost:5173' // Assuming Vite dev server

test.describe('Input Component E2E Tests', () => {
  test('input should be visible and accept input', async ({ page }) => {
    await page.goto(BASE_URL)
    // Replace with actual selector for an input
    const inputElement = page.locator('input[id="test-input"]')
    await expect(inputElement).toBeVisible()

    const testValue = 'test input value'
    await inputElement.fill(testValue)
    await expect(inputElement).toHaveValue(testValue)
  })

  test('label should be visible', async ({ page }) => {
    await page.goto(BASE_URL)
    // Replace with actual selector for a labeled input
    const labelElement = page.locator('label[for="test-input"]')
    await expect(labelElement).toBeVisible()
  })

  test('error message should be visible when present', async ({ page }) => {
    await page.goto(BASE_URL)
    // Replace with actual selector for an input with an error message
    const errorMessage = page.locator('p[class*="errorMessage"]') // Adjust selector as needed
    await expect(errorMessage).toBeVisible()
  })
})
