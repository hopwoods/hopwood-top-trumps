import { test, expect } from '@playwright/test'

test.describe('LoginPage E2E Tests', () => {
  test.beforeEach(async ({ page, context }) => {
    page.on('console', msg => {
      console.log(`[BROWSER CONSOLE ${msg.type().toUpperCase()}] ${msg.text()}`);
    });

    // Clear cookies and storage for a cleaner slate.
    // storageState: null in playwright.config.ts is another way if globally desired.
    await context.clearCookies();
    // The addInitScript approach is more robust for clearing storage before page scripts run.
    await context.addInitScript(() => {
      localStorage.clear();
      sessionStorage.clear();
      indexedDB.deleteDatabase('firebaseLocalStorageDb'); // Attempt to delete the DB
      console.log('[E2E InitScript] Cleared localStorage, sessionStorage, and attempted to delete Firebase IndexedDB.');
    });

    // Set up network mocks *before* navigation.
    await page.route('**/accounts:lookup**', async route => {
      // console.log('[E2E MOCK] Intercepted accounts:lookup');
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ users: [] }), // Simulate no user found
      });
    });
    await page.route('**/securetoken.googleapis.com/v1/token**', async route => {
      // console.log('[E2E MOCK] Intercepted securetoken refresh');
      await route.fulfill({
        status: 400, // Indicate failure
        contentType: 'application/json',
        body: JSON.stringify({ error: { message: 'TOKEN_EXPIRED' } }),
      });
    });

    // Navigate to the page. The init script will have run.
    await page.goto('/');

    // No reload needed here if initScript works as expected.
    // The page should load with a clean auth state.

    // Wait for the LoginPage to be rendered
    // LoginPage itself does not have a "Login" heading. AuthPage would render titles if any.
    // We'll wait for an element known to be in LoginPage, like the logo.
    await expect(page.getByAltText('Fable Forge Logo')).toBeVisible({ timeout: 20000 });
  });

  test('should display login form elements', async ({ page }) => {
    // Email and Password fields and Email login button are removed
    // await expect(page.getByLabel('Email')).toBeVisible()
    // await expect(page.getByLabel('Password')).toBeVisible()
    // await expect(page.getByRole('button', { name: 'Login with Email' })).toBeVisible()
    await expect(page.getByRole('button', { name: /Sign in with Google/i })).toBeVisible() // Updated text
    // Register link is removed
    // await expect(page.getByRole('link', { name: /Need an account\? Register/i })).toBeVisible()
  })

  // This test is no longer relevant as email/password fields are removed
  // test('should allow typing into email and password fields', async ({ page }) => {
  //   await page.getByLabel('Email').fill('test@example.com')
  //   await page.getByLabel('Password').fill('password123')

  //   await expect(page.getByLabel('Email')).toHaveValue('test@example.com')
  //   await expect(page.getByLabel('Password')).toHaveValue('password123')
  // })

  // This test is no longer relevant
  // test('should show loading state on email login attempt (visual check)', async ({ page }) => {
  //   // This test is more of a placeholder as true loading state verification
  //   // without knowing the exact XState transitions and timings is hard in E2E
  //   // without more intricate app state mocking in Playwright.
  //   await page.getByLabel('Email').fill('test@example.com')
  //   await page.getByLabel('Password').fill('password123')
  //   await page.getByRole('button', { name: 'Login with Email' }).click()

  //   // We expect the button to potentially change text or show a spinner.
  //   // A robust test would involve intercepting network requests or checking for
  //   // specific class names/attributes indicating loading.
  //   // For now, we'll just check if the button is still there, implying no crash.
  //   // A better check would be for the spinner icon if it's consistently added.
  //   await expect(page.getByRole('button', { name: /login with email/i })).toBeVisible()
  //   // Or, if a spinner icon appears:
  //   // await expect(page.locator('button:has-text("Login with Email") svg[data-icon="spinner"]')).toBeVisible();
  // })

  // This test is no longer relevant as the register link is removed
  // test('should navigate to register view when "Need an account? Register" is clicked', async ({ page }) => {
  //   await page.getByRole('link', { name: /Need an account\? Register/i }).click()
  //   // Assuming RegisterPage has a distinct title or element
  //   // Let's wait for the "Register" heading we added to RegisterPage.tsx
  //   await expect(page.getByRole('heading', { name: /Register/i, level: 2 })).toBeVisible({ timeout: 10000 })
  // })

  // Test for Google login button click (visual check, no actual auth)
  test('should show loading state on Google login attempt (visual check)', async ({ page }) => {
    await page.getByRole('button', { name: /Sign in with Google/i }).click() // Updated text
    await expect(page.getByRole('button', { name: /Sign in with Google/i })).toBeVisible() // Updated text
    // Similar to email login, a better check would be for a spinner.
    // await expect(page.locator('button:has-text("Sign in with Google") svg[data-icon="spinner"]')).toBeVisible();
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
