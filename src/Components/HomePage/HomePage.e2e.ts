import { test, expect } from '@playwright/test'

test.describe('HomePage E2E Navigation Tests', () => {
  test.beforeEach(async ({ page, context }) => {
    page.on('console', msg => {
      console.log(`[BROWSER CONSOLE ${msg.type().toUpperCase()}] ${msg.text()}`);
    });

    // Clear storage and cookies
    await context.clearCookies();
    await context.addInitScript(() => {
      localStorage.clear();
      sessionStorage.clear();
      indexedDB.deleteDatabase('firebaseLocalStorageDb');
      console.log('[E2E InitScript] Cleared storage for HomePage tests.');
    });

    // Mock Firebase auth state to be authenticated
    // This is a common pattern: mock the result of auth checks or token presence.
    // For this test, we'll assume a successful Google Sign-In flow has occurred.
    // We need to ensure that when AppMachine checks auth status, it finds a user.
    // This might involve mocking `checkAuthStatusActor`'s underlying Firebase calls
    // or directly manipulating what `onAuthStateChanged` would yield if that's used.

    // A pragmatic way for E2E is to perform a "login" flow that's fully mocked.
    // We'll reuse parts of the LoginPage E2E setup to get to an authenticated state.
    await page.route('**/accounts:lookup**', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ users: [{ localId: 'test-user-id' }] }), // Simulate user found
      });
    });
    await page.route('**/securetoken.googleapis.com/v1/token**', async route => {
      // This might be called during the initial auth check or sign-in.
      // For a successful login simulation, provide a valid-looking token response.
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          id_token: 'mock-id-token',
          refresh_token: 'mock-refresh-token',
          expires_in: '3600',
          localId: 'test-user-id',
        }),
      });
    });

    // Navigate to login, perform mock login to reach HomePage
    await page.goto('/');
    await expect(page.getByAltText('Fable Forge Logo')).toBeVisible({ timeout: 20000 });

    // Simulate a successful Google Sign-In by clicking the button.
    // The mocks above should allow the app to believe a user is signed in.
    // The actual `signInWithPopup` won't happen due to Playwright's environment,
    // but the app's state machine should react to the mocked successful auth flow.
    await page.getByRole('button', { name: /Sign in with Google/i }).click()

    // Wait for HomePage elements to be visible
    await expect(page.getByRole('button', { name: /Manage Decks/i })).toBeVisible({ timeout: 20000 });
    await expect(page.getByRole('button', { name: /Play Game/i })).toBeVisible({ timeout: 10000 });
  });

  test('should navigate to ManageDecksPage when Manage Decks button is clicked', async ({ page }) => {
    await page.getByRole('button', { name: /Manage Decks/i }).click();
    // Check for an element unique to ManageDecksPage
    // Assuming ManageDecksPage has a heading "Manage Your Decks"
    await expect(page.getByRole('heading', { name: /Manage Your Decks/i, level: 1 })).toBeVisible({ timeout: 10000 });
  });

  test('should navigate to PlayGamePage when Play Game button is clicked', async ({ page }) => {
    await page.getByRole('button', { name: /Play Game/i }).click();
    // Check for an element unique to PlayGamePage
    // Assuming PlayGamePage has a heading "Play Game"
    await expect(page.getByRole('heading', { name: /Play Game/i, level: 1 })).toBeVisible({ timeout: 10000 });
  });

  test('should navigate back to HomePage from ManageDecksPage (if a Home button exists)', async ({ page }) => {
    await page.getByRole('button', { name: /Manage Decks/i }).click();
    await expect(page.getByRole('heading', { name: /Manage Your Decks/i, level: 1 })).toBeVisible({ timeout: 10000 });

    // Assuming there's a "Home" link/button or logo click to go back
    // For example, clicking the main Fable Forge logo in the header
    const logoInHeader = page.locator('header').getByAltText('Fable Forge Logo');
    if (await logoInHeader.isVisible()) {
      await logoInHeader.click();
      await expect(page.getByRole('button', { name: /Manage Decks/i })).toBeVisible({ timeout: 10000 });
    } else {
      // Skip this part of the test if no clear home navigation is found
      console.log('[E2E Test Skip] No Home navigation found on ManageDecksPage for this test part.');
    }
  });

  test('should navigate back to HomePage from PlayGamePage (if a Home button exists)', async ({ page }) => {
    await page.getByRole('button', { name: /Play Game/i }).click();
    await expect(page.getByRole('heading', { name: /Play Game/i, level: 1 })).toBeVisible({ timeout: 10000 });

    const logoInHeader = page.locator('header').getByAltText('Fable Forge Logo');
    if (await logoInHeader.isVisible()) {
      await logoInHeader.click();
      await expect(page.getByRole('button', { name: /Manage Decks/i })).toBeVisible({ timeout: 10000 });
    } else {
      console.log('[E2E Test Skip] No Home navigation found on PlayGamePage for this test part.');
    }
  });
});
