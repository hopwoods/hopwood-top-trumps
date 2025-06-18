/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { test, expect } from '@playwright/test'

test.describe('RegisterPage E2E Tests', () => {
  // const BASE_URL = 'http://localhost:5176' // No longer needed, use playwright.config.ts

  test.beforeEach(async ({ page }) => {
    page.on('console', msg => {
      if (msg.type() === 'log' || msg.type() === 'error' || msg.type() === 'warn') {
        console.log(`BROWSER CONSOLE (${msg.type().toUpperCase()}): ${msg.text()}`)
      }
    })
    await page.goto('/') // Use relative path
    // Assuming AuthPage is the entry and shows LoginPage by default,
    // we need to click the link to switch to RegisterPage.
    // If RegisterPage can be accessed directly via a route, adjust accordingly.
    const toggleLink = page.getByRole('link', { name: /Need an account\? Register/i })
    // Assuming the LoginPage (and thus this link) is always visible after page.goto('/')
    // and the initial app state settles to 'authenticating'.
    await toggleLink.click()
    // Wait for the registration form to be visible
    await expect(page.getByRole('heading', { name: /Register/i, level: 2 })).toBeVisible({ timeout: 20000 }) // Increased timeout
  })

  test('should allow a user to register successfully with valid credentials', async ({ page }) => {
    const uniqueEmail = `e2e_success_${Date.now()}@example.com`

    // Mock the Firebase calls for successful registration
    await page.route('**/accounts:signUp**', async route => {
      const request = route.request();
      const postData = request.postDataJSON();
      if (postData.email === uniqueEmail) {
        console.log(`[E2E MOCK] Intercepted accounts:signUp for ${uniqueEmail} - fulfilling with success.`);
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            idToken: 'mock-id-token',
            email: uniqueEmail,
            refreshToken: 'mock-refresh-token',
            expiresIn: '3600',
            localId: `mock-uid-${Date.now()}`, // Use a consistent mock UID if needed across calls
          }),
        });
      } else {
        await route.continue(); // Let other emails pass through
      }
    });

    // Add a mock for potential follow-up calls like accounts:lookup
    // This should only apply if the previous signUp was for uniqueEmail,
    // but for simplicity, we'll make it general for now and rely on test isolation.
    // A more robust solution would involve unrouting or more specific conditions.
    await page.route('**/accounts:lookup**', async route => {
      // Check if the request body contains an idToken (typical for lookup)
      // This is a simplified check; real lookup might be more complex.
      // We only mock this if we expect a successful lookup after our mocked signUp.
      // For this test, we assume any lookup after the mocked signUp should succeed.
      console.log(`[E2E MOCK] Intercepted accounts:lookup - fulfilling with generic success for ${uniqueEmail}.`);
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          users: [{ localId: `mock-uid-${uniqueEmail}`, email: uniqueEmail, emailVerified: true, disabled: false, lastLoginAt: Date.now().toString() }]
        }),
      });
    });
    // Note: Mocking /securetoken.googleapis.com/v1/token might also be needed if getIdToken(true) is called.

    await page.getByLabel('Email').fill(uniqueEmail)
    await page.getByLabel('Password', { exact: true }).fill('Password123!')
    await page.getByLabel('Confirm Password').fill('Password123!')
    await page.getByRole('button', { name: /Register/i }).click()

    // Expect to be redirected to the home page or see a success message/state
    // For this example, let's assume redirection to a page with a "Welcome" heading
    // or the AppLayout's data-testid for the main content area.
    // HomePage.tsx contains <h1>FableForge</h1>
    await expect(page.getByRole('heading', { name: 'FableForge', level: 1 })).toBeVisible({ timeout: 15000 }) // Increased timeout slightly
    // Check that no error messages are visible
    await expect(page.getByText(/Passwords do not match/i)).not.toBeVisible()
    await expect(page.getByText(/Registration failed/i)).not.toBeVisible() // Generic error
  })

  test('should show error message for mismatched passwords', async ({ page }) => {
    await page.getByLabel('Email').fill('mismatch@example.com')
    await page.getByLabel('Password', { exact: true }).fill('Password123!')
    await page.getByLabel('Confirm Password').fill('DifferentPassword123!')
    await page.getByRole('button', { name: /Register/i }).click()

    await expect(page.getByText(/Passwords do not match/i)).toBeVisible()
    // Ensure we are still on the registration page (or the auth page showing registration)
    await expect(page.getByRole('heading', { name: /Register/i, level: 2 })).toBeVisible()
  })

  test('should show a generic error message if registration fails (e.g., email already exists)', async ({ page }) => {
    // This test simulates a scenario where the backend/XState machine returns a generic error.
    // For a real "email already exists" test, you'd need to ensure an email *is* registered
    // or mock the machine's response appropriately if testing in isolation.
    // Here, we'll use an email that's likely to fail if run multiple times against a live backend
    // without cleanup, or rely on the machine to eventually surface an error.

    // Forcing an error for demonstration:
    // We can't directly make Firebase fail in a pure E2E without specific conditions.
    // However, if the machine is set up to show an error from UseRegisterPage's 'error' state:
    // We'll use an email that we assume will cause a failure (e.g. by registering it once manually)
    // For this test, we'll use a common email and assume the first successful test registered it.
    // This is not ideal for CI but demonstrates the UI reaction.
    // A better approach in a full test suite would be to mock the API call or use test-specific accounts.

    const specificErrorEmail = `specific_error_test_${Date.now()}@example.com`;
    await page.getByLabel('Email').fill(specificErrorEmail);
    await page.getByLabel('Password', { exact: true }).fill('Password123!');
    await page.getByLabel('Confirm Password').fill('Password123!');

    // Mock this specific email to cause a known Firebase-like error
    await page.route('**/accounts:signUp**', async route => {
      const request = route.request();
      const postData = request.postDataJSON();
      if (postData.email === specificErrorEmail) {
        console.log(`[E2E MOCK] Intercepted accounts:signUp for ${specificErrorEmail} - fulfilling with EMAIL_EXISTS error.`);
        await route.fulfill({
          status: 400,
          contentType: 'application/json',
          body: JSON.stringify({
            error: {
              code: 400,
              message: 'EMAIL_EXISTS', // This is a standard Firebase error code
            },
          }),
        });
      } else {
        await route.continue();
      }
    });

    // Click register
    await page.getByRole('button', { name: /Register/i }).click()

    // The AppMachine's onError handler defaults to a generic message when event.data is undefined
    // (which happens even if our mock *sends* a structured error, due to Firebase SDK behavior).
    const errorElement = page.getByTestId('generic-error-message')
    await expect(errorElement).toHaveCount(1, { timeout: 10000 })
    await expect(errorElement).toHaveText('Firebase registration failed with an unknown error type.', { timeout: 1000 })
    await expect(errorElement).toBeVisible({ timeout: 1000 })


    // Ensure we are still on the registration page
    await expect(page.getByRole('heading', { name: /Register/i, level: 2 })).toBeVisible()
  })

  test('should disable inputs and button while submitting', async ({ page }) => {
    const loadingTestEmail = 'loadingtest_e2e@example.com'
    await page.getByLabel('Email').fill(loadingTestEmail)
    await page.getByLabel('Password', { exact: true }).fill('Password123!')
    await page.getByLabel('Confirm Password').fill('Password123!')

    // Mock the Firebase call to simulate a long-running request
    await page.route('**/accounts:signUp**', async route => {
      const request = route.request()
      const postData = request.postDataJSON()
      if (postData.email === loadingTestEmail) {
        console.log(`[E2E MOCK] Intercepted accounts:signUp for ${loadingTestEmail} - simulating delay.`)
        // Return a promise that never resolves, or resolves after a long delay
        // This keeps the machine in the 'submittingRegistration' state.
        return new Promise(() => { /* never resolve */ })
        // Alternatively, resolve after a delay longer than UI checks:
        // await new Promise(resolve => setTimeout(resolve, 10000));
        // await route.fulfill({ status: 200, /* ... success body ... */ });
      } else {
        // For other emails, continue as normal (or mock another behavior)
        await route.continue()
      }
    })

    // Click the button but don't wait for navigation, to check disabled state
    // We need a way to ensure the submission process has started in XState.
    // This is tricky in E2E without a delay or a specific visual cue for "submitting".
    // The button itself will have a spinner.

    await page.getByRole('button', { name: /Register/i }).click()
    await page.waitForTimeout(250) // Give React a bit more time to re-render with the new state

    // Wait for the form to be in the submitting state
    await expect(page.locator('form[data-testid="register-form"]')).toHaveAttribute('data-submitting', 'true', { timeout: 7000 })

    // Check for disabled state on inputs and button
    await expect(page.getByRole('button', { name: /Register/i })).toBeDisabled()
    await expect(page.getByLabel('Email')).toBeDisabled()
    await expect(page.getByLabel('Password', { exact: true })).toBeDisabled()
    await expect(page.getByLabel('Confirm Password')).toBeDisabled()
    // Check for the spinner SVG icon within the submit button
    await expect(page.locator('button[data-testid="register-submit-button"] svg[data-icon="spinner"]')).toBeVisible()

    // Allow time for the (mocked or real) submission to complete if necessary for subsequent tests
    // or if checking for re-enablement (though that's covered by successful registration test)
    // For this test, we primarily care about the "during submission" state.
    // If it navigates away too fast, this test might be flaky.
    // A common strategy is to have the server/actor introduce a slight delay in dev/test mode.
  })
})
