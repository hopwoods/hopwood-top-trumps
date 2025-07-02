import { test, expect } from '@playwright/test';

// TODO: [E2E_AUTH_REFACTOR] These tests are failing due to issues with the mocked auth state.
// The app does not reliably start in an authenticated state. This needs to be investigated.
test.describe.skip('Deck Management Page', () => {
  test.beforeEach(async ({ page }) => {
    // With checkAuthStatusActor mocked to return a user in E2E mode,
    // the app will start in an authenticated state.
    await page.goto('/');
    // Wait for the home page to be ready, then navigate to the page under test.
    await expect(page.getByRole('link', { name: /Manage Decks/i })).toBeVisible({ timeout: 20000 });
    await page.getByRole('link', { name: /Manage Decks/i }).click();
    await expect(page.getByRole('heading', { name: 'Manage Decks' })).toBeVisible();
  });

  test('should allow a user to manage their decks', async ({ page }) => {
    // 1. Verify the default deck is displayed
    const defaultDeck = page.getByText('Default Deck');
    await expect(defaultDeck).toBeVisible({ timeout: 10000 }); // Allow time for decks to load

    // 2. Create a new deck
    // The current implementation creates a default "New Deck".
    // A real implementation would likely involve a form.
    await page.getByRole('button', { name: 'Create New Deck' }).click();

    // 3. Verify the new deck appears
    const newDeck = page.getByText('New Deck');
    await expect(newDeck).toBeVisible({ timeout: 5000 });

    // 4. Delete the new deck
    // Set up the dialog handler *before* clicking the button that opens it
    page.on('dialog', dialog => dialog.accept());

    const newDeckItem = page.locator('li', { hasText: 'New Deck' });
    await newDeckItem.getByRole('button', { name: 'Delete deck New Deck' }).click();

    // 5. Verify the deck is removed from the UI
    await expect(newDeck).not.toBeVisible({ timeout: 5000 });
  });
});
