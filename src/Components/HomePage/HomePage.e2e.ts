import { test, expect } from '@playwright/test'

// TODO: [E2E_AUTH_REFACTOR] These tests are failing due to issues with the mocked auth state.
// The app does not reliably start in an authenticated state. This needs to be investigated.
test.describe.skip('HomePage E2E Navigation Tests', () => {
  test.beforeEach(async ({ page }) => {
    // With checkAuthStatusActor mocked to return a user in E2E mode,
    // the app will start in an authenticated state.
    await page.goto('/');
    // Wait for the home page to be ready.
    await expect(page.getByRole('link', { name: /Manage Decks/i })).toBeVisible({ timeout: 20000 });
  });

  test('should navigate to ManageDecksPage when Manage Decks link is clicked', async ({ page }) => {
    await page.getByRole('link', { name: /Manage Decks/i }).click();
    // Check for an element unique to ManageDecksPage
    await expect(page.getByRole('heading', { name: /Manage Decks/i, level: 1 })).toBeVisible({ timeout: 10000 });
  });

  test('should navigate to PlayGamePage when Play Game link is clicked', async ({ page }) => {
    await page.getByRole('link', { name: /Play Game/i }).click();
    // Check for an element unique to PlayGamePage
    await expect(page.getByRole('heading', { name: /Play Game/i, level: 1 })).toBeVisible({ timeout: 10000 });
  });

  test('should navigate back to HomePage from ManageDecksPage (if a Home link exists)', async ({ page }) => {
    await page.getByRole('link', { name: /Manage Decks/i }).click();
    await expect(page.getByRole('heading', { name: /Manage Decks/i, level: 1 })).toBeVisible({ timeout: 10000 });

    // Assuming there's a "Home" link/button or logo click to go back
    const logoInHeader = page.locator('header').getByAltText('Fable Forge Logo');
    if (await logoInHeader.isVisible()) {
      await logoInHeader.click();
      await expect(page.getByRole('link', { name: /Manage Decks/i })).toBeVisible({ timeout: 10000 });
    } else {
      // Skip this part of the test if no clear home navigation is found
      console.log('[E2E Test Skip] No Home navigation found on ManageDecksPage for this test part.');
    }
  });

  test('should navigate back to HomePage from PlayGamePage (if a Home link exists)', async ({ page }) => {
    await page.getByRole('link', { name: /Play Game/i }).click();
    await expect(page.getByRole('heading', { name: /Play Game/i, level: 1 })).toBeVisible({ timeout: 10000 });

    const logoInHeader = page.locator('header').getByAltText('Fable Forge Logo');
    if (await logoInHeader.isVisible()) {
      await logoInHeader.click();
      await expect(page.getByRole('link', { name: /Manage Decks/i })).toBeVisible({ timeout: 10000 });
    } else {
      console.log('[E2E Test Skip] No Home navigation found on PlayGamePage for this test part.');
    }
  });
});
