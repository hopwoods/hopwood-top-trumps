import { test, expect } from '@playwright/test'

// This BASE_URL should point to a page where your Button component is rendered
// For example, a Storybook page or a specific test page in your app.
// Adjust as necessary.
// const BASE_URL = 'http://localhost:5176/' // No longer needed, use playwright.config.ts

test.describe.skip('Button Component E2E Tests', () => { // Skipping for now
  test('primary button should be visible and clickable', async ({ page }) => {
    await page.goto('/') // Navigate to a page where the button is rendered
    // Replace with actual selector for a primary button if on a real page
    // This is a placeholder selector
    const primaryButton = page.getByRole('button', { name: /primary action/i })

    // Example: if there's a specific primary button on the login page
    // await page.goto(BASE_URL) // Assuming login page is root for dev
    // const primaryButton = page.getByRole('button', { name: /login with email/i })

    await expect(primaryButton).toBeVisible()
    // Add a click test if there's an observable outcome
    // await primaryButton.click();
    // await expect(page.locator('#some-result-of-click')).toBeVisible();
  })

  test('secondary button should be visible and clickable', async ({ page }) => {
    await page.goto('/')
    // Replace with actual selector for a secondary button
    const secondaryButton = page.getByRole('button', { name: /secondary action/i })

    // Example: if there's a specific secondary button (like Google login)
    // await page.goto(BASE_URL)
    // const secondaryButton = page.getByRole('button', { name: /login with google/i });

    await expect(secondaryButton).toBeVisible()
    // Add a click test if there's an observable outcome
  })

  test('disabled button should be disabled', async ({ page }) => {
    await page.goto('/')
    // Replace with actual selector for a disabled button
    const disabledButton = page.getByRole('button', { name: /disabled button example/i })
    await expect(disabledButton).toBeDisabled()
  })

  test('button with icon should render icon', async ({ page }) => {
    await page.goto('/')
    // Replace with actual selector for a button that is expected to have an icon
    const buttonWithIcon = page.getByRole('button', { name: /button with icon example/i })
    await expect(buttonWithIcon).toBeVisible()
    // Check for an SVG element within the button
    const icon = buttonWithIcon.locator('svg')
    await expect(icon).toBeVisible()
  })

  // Note: Testing isLoading state visually (spinner) is more complex and might
  // require visual regression testing or more intricate DOM checks if the spinner
  // is added/removed dynamically. For now, focusing on basic states.
})

// To make these tests runnable, you'd typically have a dedicated test page
// or use a tool like Storybook to render components in isolation for E2E testing.
// For example, you might create a /__tests__/button.html page that renders
// various instances of your Button component.
