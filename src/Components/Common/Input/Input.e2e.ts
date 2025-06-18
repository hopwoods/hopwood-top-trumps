import { test, expect } from '@playwright/test'

// const BASE_URL = 'http://localhost:5176' // No longer needed, use playwright.config.ts

test.describe.skip('Input Component E2E Tests', () => { // Skipping for now
  test('input should be visible and accept input', async ({ page }) => {
    await page.goto('/') // Use relative path
    // Replace with actual selector for an input
    const inputElement = page.locator('input[id="test-input"]')
    await expect(inputElement).toBeVisible()

    const testValue = 'test input value'
    await inputElement.fill(testValue)
    await expect(inputElement).toHaveValue(testValue)
  })

  test('label should be visible', async ({ page }) => {
    await page.goto('/') // Use relative path
    // Replace with actual selector for a labeled input
    const labelElement = page.locator('label[for="test-input"]')
    await expect(labelElement).toBeVisible()
  })

  test('error message should be visible when present', async ({ page }) => {
    await page.goto('/') // Use relative path
    // Replace with actual selector for an input with an error message
    const errorMessage = page.locator('p[class*="errorMessage"]') // Adjust selector as needed
    await expect(errorMessage).toBeVisible()
  })
})
