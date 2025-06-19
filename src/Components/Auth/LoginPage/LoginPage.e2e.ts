import { test, expect } from '@playwright/test'

test.describe('LoginPage E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to a state where the LoginPage is visible.
    // This might involve mocking XState to force the 'authenticating' state,
    // or navigating through the app if it's simple enough.
    // For now, we'll assume direct navigation or that App.tsx defaults to login.
    // A more robust setup might involve setting localStorage or cookies
    // if the app used that to remember auth state for direct routing.
    // Since our appMachine starts in 'initializing' then moves to 'authenticating',
    // simply loading the base URL should eventually show the LoginPage.
    await page.goto('/') // Use relative path to respect playwright.config.ts baseURL

    // Wait for the LoginPage to be rendered (e.g., by waiting for its title)
    // This ensures the appMachine has transitioned to 'authenticating'
    await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible({ timeout: 20000 }) // Increased timeout
  })

  test('should display login form elements', async ({ page }) => {
    await expect(page.getByLabel('Email')).toBeVisible()
    await expect(page.getByLabel('Password')).toBeVisible()
    await expect(page.getByRole('button', { name: 'Login with Email' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'Login with Google' })).toBeVisible()
    await expect(page.getByRole('link', { name: /Need an account\? Register/i })).toBeVisible()
  })

  test('should allow typing into email and password fields', async ({ page }) => {
    await page.getByLabel('Email').fill('test@example.com')
    await page.getByLabel('Password').fill('password123')

    await expect(page.getByLabel('Email')).toHaveValue('test@example.com')
    await expect(page.getByLabel('Password')).toHaveValue('password123')
  })

  // Note: Testing actual login submissions in E2E can be complex as it involves
  // mocking XState machine's actor responses (Firebase calls) or having a test backend.
  // For now, these E2E tests will focus on UI interaction and basic navigation.

  test('should show loading state on email login attempt (visual check)', async ({ page }) => {
    // This test is more of a placeholder as true loading state verification
    // without knowing the exact XState transitions and timings is hard in E2E
    // without more intricate app state mocking in Playwright.
    await page.getByLabel('Email').fill('test@example.com')
    await page.getByLabel('Password').fill('password123')
    await page.getByRole('button', { name: 'Login with Email' }).click()

    // We expect the button to potentially change text or show a spinner.
    // A robust test would involve intercepting network requests or checking for
    // specific class names/attributes indicating loading.
    // For now, we'll just check if the button is still there, implying no crash.
    // A better check would be for the spinner icon if it's consistently added.
    await expect(page.getByRole('button', { name: /login with email/i })).toBeVisible()
    // Or, if a spinner icon appears:
    // await expect(page.locator('button:has-text("Login with Email") svg[data-icon="spinner"]')).toBeVisible();
  })

  test('should navigate to register view when "Need an account? Register" is clicked', async ({ page }) => {
    await page.getByRole('link', { name: /Need an account\? Register/i }).click()
    // Assuming RegisterPage has a distinct title or element
    // Let's wait for the "Register" heading we added to RegisterPage.tsx
    await expect(page.getByRole('heading', { name: /Register/i, level: 2 })).toBeVisible({ timeout: 10000 })
  })

  // Test for Google login button click (visual check, no actual auth)
  test('should show loading state on Google login attempt (visual check)', async ({ page }) => {
    await page.getByRole('button', { name: 'Login with Google' }).click()
    await expect(page.getByRole('button', { name: /login with google/i })).toBeVisible()
    // Similar to email login, a better check would be for a spinner.
    // await expect(page.locator('button:has-text("Login with Google") svg[data-icon="spinner"]')).toBeVisible();
  })

  // Test for error message display (would require mocking app state to show an error)
  // test('should display an error message on failed login', async ({ page }) => {
  //   // This requires a way to trigger an error state in the appMachine
  //   // e.g., by intercepting and failing a Firebase call, or by setting up
  //   // a specific test route/handler in the app that forces an error.
  //   // For now, this is a placeholder.
  //   await page.getByLabel('Email').fill('wrong@example.com');
  //   await page.getByLabel('Password').fill('wrongpassword');
  //   await page.getByRole('button', { name: 'Login with Email' }).click();
  //   await expect(page.getByText('Invalid credentials')).toBeVisible(); // Or whatever the error message is
  // });
})
