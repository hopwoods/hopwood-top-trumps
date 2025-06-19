## Testing Workflow
- Run the full tests suite `pnpm test`
- Record all faling test files
- Fix tests in each file in isolation
- once all tests for a given file are passing, record any lessons learnt in the memory bank and commit
- once all tests are passing, run a build `pnpm build`
- fix any buuild issues
- once the project is building and all tests pass save any lessons learnt to the memory bank and commit

## Handling ESLint `no-unsafe-*` Rules in Test Files

When working with complex mocks, particularly for hooks or external modules (e.g., in Vitest), ESLint's type-aware `no-unsafe-assignment`, `no-unsafe-member-access`, and `no-unsafe-call` rules may sometimes flag code that is functionally correct and type-safe at runtime but difficult for static analysis to fully verify within the mock's context.

**Strategy:**

1.  **Prioritize Type Safety:** Always strive to make mocks as type-safe as possible. Use specific types for mock function parameters and return values.
2.  **Verify Functionality:** Ensure that unit tests for the component pass comprehensively, covering all relevant states and interactions related to the mocked functionality.
3.  **Confirm Build Success:** Ensure the project builds successfully (`pnpm build`), as the TypeScript compiler is the ultimate arbiter of type correctness.
4.  **Judicious Disabling:** If, after the above steps, persistent "unsafe" ESLint warnings remain in a test file due to the intricacies of the mock setup, it may be acceptable to use file-level ESLint disable comments for these specific rules (e.g., placed at the top of the `.test.tsx` file):
    ```typescript
    /* eslint-disable @typescript-eslint/no-unsafe-assignment */
    /* eslint-disable @typescript-eslint/no-unsafe-member-access */
    /* eslint-disable @typescript-eslint/no-unsafe-call */
    ```
5.  **Scope:** This approach should be limited to test files and used only when the warnings are deemed to be false positives or overly cautious for a well-tested, functionally correct mock. The main application codebase should maintain stricter adherence to these ESLint rules.
6.  **Documentation:** If such disables are used, it's good practice to briefly comment why if the reason isn't immediately obvious from the mock's complexity.

## E2E Testing Considerations for Playwright, XState, and Async Operations

- **`webServer` Configuration (Playwright & Vite):**
    - Ensure `playwright.config.ts` `baseURL` and `webServer.url` exactly match the protocol (HTTP/HTTPS) and port your Vite dev server uses. Mismatches are a common cause of `webServer` timeouts.
    - To reliably use HTTP for E2E tests when Vite is configured for HTTPS:
        1. Conditionally disable HTTPS in `vite.config.ts` based on an environment variable (e.g., `E2E_TESTING=true`).
           ```typescript
           // vite.config.ts
           export default defineConfig(({ mode }) => {
             const isE2ETesting = process.env.E2E_TESTING === 'true';
             return {
               server: { https: isE2ETesting ? false : { /* your certs */ } },
             };
           });
           ```
        2. Set this variable in `playwright.config.ts`'s `webServer.command` using `cross-env`:
           ```typescript
           // playwright.config.ts
           webServer: {
             command: 'cross-env E2E_TESTING=true pnpm dev --port 5176 --host',
             url: 'http://localhost:5176', // Match protocol and port
             reuseExistingServer: false,
           },
           ```
    - Always run `pnpm exec playwright install` after Playwright updates or for initial setup.

- **Stabilizing Async UI Tests:**
    - Use `await page.goto('/')` in tests to respect `playwright.config.ts` `baseURL`.
    - Provide generous timeouts for assertions on elements that appear after async operations or XState initializations (e.g., `await expect(locator).toBeVisible({ timeout: 20000 })`).
    - **Testing Loading States:**
        - For brief XState "loading" or "submitting" states, consider E2E-specific artificial delays *within invoked actors* (before the main async call) to ensure the state is observable.
          ```typescript
          // myActor.ts
          if (process.env.E2E_TESTING === 'true') {
            await new Promise(resolve => setTimeout(resolve, 500)); // Delay
          }
          // ... main async logic ...
          ```
        - Use data attributes (e.g., `data-submitting="true"`) driven by loading states for more robust assertions than relying solely on visual cues or `toBeDisabled` if timing is critical.
          ```typescript
          // MyComponent.tsx
          // <form data-submitting={isLoading ? 'true' : 'false'} ...>

          // MyComponent.e2e.ts
          // await expect(formLocator).toHaveAttribute('data-submitting', 'true');
          ```

- **Debugging XState in E2E:**
    - Add `console.log` in XState machine actions, `onDone`, `onError` to trace execution.
    - Capture browser console logs in Playwright tests to view these machine logs:
      ```typescript
      // *.e2e.ts
      test.beforeEach(async ({ page }) => {
        page.on('console', msg => {
          if (['log', 'error', 'warn'].includes(msg.type())) {
            console.log(`BROWSER CONSOLE (${msg.type().toUpperCase()}): ${msg.text()}`);
          }
        });
        // ...
      });
      ```
- **Firebase in E2E:**
    - Be aware that Firebase SDK calls might throw `undefined` errors or errors without a `.message` in E2E. Ensure machine error handling is robust.
    - Use unique emails (e.g., `testuser_${Date.now()}@example.com`) for registration tests to ensure idempotency.
- **General E2E Practices:**
    - Use correct selectors (e.g., `getByRole('link')` for `<a>` tags).
    - Use `test.describe.skip()` or `test.skip()` to temporarily exclude non-critical or flaky tests.
    - Add clear headings (`<h1>`, `<h2>`) to pages/views for stable locators in `beforeEach` hooks to confirm navigation.
    - **Playwright Reporter:** To prevent the HTML report from auto-opening and allow the test runner to exit cleanly, set `reporter: [['html', { open: 'never' }]]` in `playwright.config.ts`.

- **Mocking External Services (e.g., Firebase Auth):**
    - Use `page.route()` to intercept and mock network calls made by SDKs. This is crucial for deterministic testing of success and specific error paths.
    - Define `page.route()` mocks *inside* individual `test()` blocks to ensure they are correctly scoped.
    - When a mock is for a specific input (e.g., a particular email), the route handler should check the request payload and use `await route.continue()` for non-matching requests to avoid interfering with other tests.
    - Be aware that SDKs might make follow-up network calls after an initial operation (e.g., `accounts:lookup` after `accounts:signUp`). These may also need mocking for a complete flow.

- **Handling SDK Errors in E2E:**
    - Firebase SDK functions (and potentially others) might throw `undefined` or non-standard errors in E2E environments, even if the underlying (mocked) network call returns a structured error body. The SDK's internal error processing can obscure the original mocked error.
    - **Actor Robustness:** XState actors calling such SDKs should have `catch` blocks that defensively convert `undefined` or non-`Error` objects into proper `Error` instances before re-throwing. This ensures the XState machine receives a usable `event.data`.
    - **Machine `onError`:** The machine's `onError` handler should then reliably extract `event.data.message` or provide a clear default error message if `event.data` is still problematic. This makes UI error assertions predictable.

- **Timing for UI Updates (React/XState):**
    - After actions triggering XState events and React re-renders, a brief `await page.waitForTimeout(250);` before assertions can help stabilize tests by giving the DOM time to update.
    - For conditionally rendered elements, assert existence/count (`toHaveCount(1)`), then text content (`toHaveText`), then visibility (`toBeVisible`) to better diagnose issues.

- **Playwright Timeout Configuration:**
    - Playwright has multiple timeout settings. The `timeout` property in the main `defineConfig` (e.g., in `playwright.config.ts`) sets the default for individual tests and hooks like `beforeEach`.
    - The `webServer.timeout` specifically controls how long Playwright waits for the development server (e.g., Vite) to start.
    - Individual assertions like `await expect(locator).toBeVisible({ timeout: ... })` can also have their own specific timeouts.
    - It's crucial to identify which timeout is being exceeded when debugging. For instance, a `Test timeout of Xms exceeded while running "beforeEach" hook` often points to the main test `timeout`, not necessarily the `webServer.timeout`.

- **Debugging Flaky E2E Tests (DOM Update Issues):**
    - When E2E tests fail to find elements that are expected based on component logic and unit tests (especially after state changes):
        - **Confirm State Changes:** Use browser console logs within component hooks/effects to verify that the state controlling the UI element's visibility or content *is* actually updating as expected.
        - **Robust Locators:** Use `data-testid` attributes for stable locators.
        - **Playwright Waiting Mechanisms:**
            - `await expect(locator).toBeVisible({ timeout: ... })`: Standard way to wait for visibility.
            - `await expect(locator).toHaveCount(1, { timeout: ... })`: Ensures the element is uniquely present.
            - `await page.waitForFunction(() => { /* DOM condition */ }, { timeout: ... })`: More powerful for complex conditions; executes JavaScript in the browser to check the DOM state.
            - `await page.waitForTimeout(ms)`: Use sparingly as a last resort for brief, fixed delays if other waiting mechanisms fail, but it can make tests brittle.
        - **Inspect DOM State:**
            - `await page.screenshot({ path: 'debug.png', fullPage: true })`: Capture what the page looks like.
            - `console.log(await page.content())`: Log the full HTML content to see if the element is present.
            - `locator.count()` and `locator.allTextContents()`: Programmatically check what Playwright finds for a given locator.
        - **Interactive Debugging:** The most powerful tool is often `PWDEBUG=1 pnpm test:e2e` or `await page.pause()` in the test script. This allows interactive inspection of the DOM, styles, and element properties in the browser's DevTools at the point of failure.
    - **Rendering Discrepancies:** Be aware that components might render or update differently in a full browser (E2E) vs. a simulated DOM (unit tests). Styling (CSS-in-JS, global styles) can also behave differently and affect element visibility or interactability in ways not caught by unit tests.
    - **Consider Component Rendering Strategy:** If an element is conditionally rendered (e.g., `{error && <p>{error}</p>}`), and it's proving hard for Playwright to detect, consider rendering it always but controlling its visibility via CSS (e.g., `style={{ visibility: error ? 'visible' : 'hidden' }}`). This can sometimes make its presence in the DOM more stable for test runners, though it didn't resolve the specific issue in the FableForge registration form error messages.
