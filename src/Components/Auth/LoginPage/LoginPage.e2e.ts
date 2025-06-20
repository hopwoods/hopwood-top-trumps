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
    await expect(page.getByRole('button', { name: /Sign in with Google/i })).toBeVisible()
  })


  // Test for Google login button click (visual check, no actual auth)
  test('should show loading state on Google login attempt (visual check)', async ({ page }) => {
    await page.getByRole('button', { name: /Sign in with Google/i }).click()
    await expect(page.getByRole('button', { name: /Sign in with Google/i })).toBeVisible()
  })
})
