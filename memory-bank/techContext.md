# Project Technical Overview & Decisions (As of 2025-06-17)

## 0. General Coding Standards & Best Practices
*   Refer to `.clinerules/01-coding-standards.md` for general code style and structure.
*   Refer to `.clinerules/02-testing-strategy.md` for testing workflow.
*   Refer to `.clinerules/03-xstate-typescript.md` for XState v5 TypeScript usage.
*   Refer to `.clinerules/04-typescript-best-practices.md` for TypeScript best practices, DRY principles, ReactJS guidelines, and avoiding magic strings.

## 1. Core Frontend
*   **Framework/Library:** React
*   **Build Tool:** Vite
*   **Language:** TypeScript
*   **Main Application Component:** `src/App.tsx`
*   **Entry Point:** `src/main.tsx`

## 2. Styling
*   **CSS-in-JS:** Griffel (`@griffel/react`)
*   **Base UI Components:** Headless UI (`@headlessui/react`) for unstyled, accessible component primitives, to be styled with Griffel.

## 3. State Management
*   **Library:** XState v5 (`xstate`, `@xstate/react`). Leveraging v5's enhanced built-in TypeScript support for type safety without separate `.typegen.ts` files.
*   **Usage:** Managing all application and game states.

## 4. Routing
*   **Approach:** Single Page Application (SPA).
*   **Mechanism:** UI states and "views" will be managed by XState; no traditional URL-based routing library (like React Router) will be used.

## 5. Backend
*   **Platform:** Firebase Functions
*   **Language:** TypeScript
*   **Key Responsibilities:**
    *   **Deck & Card Management:** Validating card creation (max 20 cards/deck; 6 D&D-style attributes: Strength, Dexterity, Constitution, Intelligence, Wisdom, Charisma, summing to 50 points). Storing/updating deck and card data in Firestore.
    *   **Gemini Artwork Generation:** Securely calling the Gemini API (user-provided key) with user prompts for card artwork. Handling image response and saving to Firebase Storage.
    *   **Multiplayer Game Logic:** Creating and managing game sessions, handling player turns, real-time updates, shuffling/dealing cards, comparing attributes, determining round winners, updating game state in Firestore.

## 6. Database
*   **Platform:** Firebase Firestore
*   **Key Features:** Real-time updates for multiplayer gameplay.
*   **Anticipated Collections:**
    *   `users`: (UID, displayName, email, etc. - linked to Firebase Auth)
    *   `decks`: (deckId, ownerUID, name, cardIds_array: [cardId], createdAt, updatedAt)
    *   `cards`: (cardId, ownerUID, deckId, name, artPrompt, artUrl (from Firebase Storage), attributes: { strength: number, dexterity: number, constitution: number, intelligence: number, wisdom: number, charisma: number }, createdAt)
    *   `gameSessions`: (sessionId, player1UID, player2UID, player1DeckId, player2DeckId, currentTurnUID, player1Hand_array: [cardId], player2Hand_array: [cardId], scores, gameStatus, createdAt, updatedAt)

## 7. Authentication
*   **Platform:** Firebase Authentication
*   **Providers:** Email/Password and Google Sign-In.

## 8. Image Generation & Storage
*   **Generation API:** Gemini API (API key to be provided by user and stored securely, likely as a Firebase Function environment variable).
*   **Storage:** Firebase Storage for the generated card artwork.

## 9. Testing
*   **Unit/Integration Testing:** Vitest (`vitest`, `@vitest/ui`). To cover React components, XState machines, utility functions, and Firebase Functions.
*   **End-to-End (E2E) Testing:** Playwright (`@playwright/test`).

## 10. Build & Development Scripts (Existing)
*   **Root `package.json` (Frontend):** `dev`, `build`, `lint`, `preview`.
*   **`functions/package.json` (Backend):** `lint`, `build`, `serve`, `deploy`, `logs`.

## 11. Key Technologies Summary
*   React, Vite, TypeScript
*   Griffel, Headless UI
*   XState
*   Firebase (Authentication, Functions, Firestore, Storage)
*   Gemini API
*   Font Awesome (for general UI iconography)
*   Vitest, Playwright
*   ESLint

## 12. UI/UX Guidelines (As of 2025-06-17 - Cleaner Dark Theme Update)

*   **Overall Approach:** Mobile-first design.
*   **Visual Style:** "Cleaner Dark Theme" - modern, refined, and accessible dark UI.
*   **Color Palette (Managed in `src/Theme/Tokens.ts` and applied via CSS Variables):**
    *   **Backgrounds:** Clean dark greys (e.g., `backgroundBody: '#202124'`, `panelColor: '#2D2E30'`).
    *   **Primary Brand Color:** Modern purple/violet (e.g., `brandPrimary: '#7F5AF0'`) for key actions.
    *   **Secondary Accent:** Teal/cyan (e.g., `brandSecondary: '#00BFA5'`) for links and secondary highlights.
    *   **Text:** Primarily off-white (e.g., `textPrimary: '#E8EAED'`) for high contrast and readability.
*   **Typography (Managed in `src/Theme/Tokens.ts` and imported via `@fontsource`):**
    *   **Font Family:** "Inter" for both headings and body text, using different weights and sizes for hierarchy.
    *   **Sizing:** Scalable base `font-size` on `:root` (using `clamp()`). All other typographic elements, paddings, and margins to use `rem` or `em` units for responsiveness and accessibility.
*   **Textures:**
    *   **Global Background:** Solid color (no body texture).
    *   **Card Elements:** Textures to be used subtly and only for specific elements like card backgrounds in the game view (e.g., `worn-dots.png`).
*   **Gradients & Shadows:**
    *   **Gradients:** Minimized; used very subtly if at all (e.g., slight button depth).
    *   **Drop Shadows:** Minimized; light and used for functional lift of interactive elements only.
*   **Buttons:** Simplified styling. Primary buttons with solid brand color background. Secondary/other buttons with less emphasis (e.g., panel color background with border).
*   **Tertiary Actions:** Styled as text links, not buttons.
*   **Iconography:** Font Awesome for general UI icons.
*   **Key Principles:**
    *   High contrast for readability on mobile.
    *   Intuitive touch targets and navigation.
    *   Card design optimized for mobile legibility and interaction.
    *   Subtle animations and transitions to enhance the modern feel.

## 13. Layout Learnings (As of 2025-06-18)
*   **Full-Viewport Child Components within Layouts:**
    *   When a child component (e.g., `AuthPage`) is intended to manage its own full viewport width (e.g., `width: 100vw`), its direct parent container within a shared layout (e.g., `AppLayout`'s `main` element) must be styled to permit this.
    *   **Problem Encountered:** `AuthPage` (with `root` styled to `100vw`) appeared cut off when `AppLayout`'s `main` element had its padding removed. This was because `AppLayout`'s `main` might not have been correctly handling or allowing a `100vw` child without causing overflow, especially if `AppLayout` itself or its `main` element had implicit or explicit width constraints or lacked `box-sizing: border-box` with padding.
    *   **Solution/Guideline:** The parent layout's content area (e.g., `AppLayout`'s `main`) should either:
        1.  Have no horizontal padding or width restrictions that would conflict with a `100vw` child.
        2.  Or, if the parent layout *does* apply site-wide padding/max-width to its content area, then child "pages" like `AuthPage` should use `width: 100%` (of the padded parent) rather than `100vw` for their main container.
    *   This is now also reflected in `.clinerules/08-styling-griffel.md` under "Parent Layout Accommodation."
    *   Ensure `box-sizing: border-box` is consistently applied to layout containers that use padding and explicit widths/heights to avoid unexpected dimension calculations.

## 14. Playwright E2E Testing Strategies (Updated 2025-06-18)

### 14.1. `webServer` Configuration for Vite

- **Protocol & Port Matching:** Ensure `playwright.config.ts` `baseURL` and `webServer.url` *exactly* match the protocol (HTTP/HTTPS) and port your Vite dev server uses. Mismatches (e.g., Playwright expecting HTTP while Vite serves HTTPS) are a common cause of `webServer` timeouts.
- **Controlling HTTP/HTTPS for Tests:**
    - If Vite uses HTTPS by default (e.g., due to HTTPS certificates in `vite.config.ts`), it's often simpler to force HTTP for E2E tests to avoid certificate complexities with Playwright.
    - **Method:**
        1. Modify `vite.config.ts` to conditionally disable HTTPS based on an environment variable:
           ```typescript
           // vite.config.ts
           import { defineConfig } from 'vite';
           import react from '@vitejs/plugin-react';
           import fs from 'fs';
           import path from 'path';

           export default defineConfig(({ mode }) => { // mode might be 'development', 'production', or custom
             const isE2ETesting = process.env.E2E_TESTING === 'true';
             return {
               plugins: [react()],
               server: {
                 https: isE2ETesting ? false : {
                   key: fs.readFileSync(path.resolve(__dirname, '.certs/key.pem')), // Ensure .certs path is correct
                   cert: fs.readFileSync(path.resolve(__dirname, '.certs/cert.pem')),
                 },
                 port: 5176 // Example: Use a dedicated port for E2E tests
               },
               // ... other vite config
             };
           });
           ```
        2. Set this environment variable in `playwright.config.ts`'s `webServer.command` using `cross-env` for cross-platform compatibility:
           ```typescript
           // playwright.config.ts
           webServer: {
             command: 'cross-env E2E_TESTING=true pnpm dev --port 5176 --host', // --host can also help with connectivity
             url: 'http://localhost:5176', // Match the protocol and port
             reuseExistingServer: false, // Let Playwright manage this server instance
             timeout: 120 * 1000, // Generous timeout for server start
             stdout: 'pipe', // Capture stdout
             stderr: 'pipe', // Capture stderr
           },
           ```
- **Browser Installation:** Always run `pnpm exec playwright install` (or `npx playwright install`) after Playwright updates or if tests report missing browser executables.

### 14.2. Stabilizing Auth Flow & Asynchronous UI Tests

- **Use Config `baseURL`:** In test files, prefer `await page.goto('/')` which respects the `baseURL` set in `playwright.config.ts`. Avoid hardcoding full URLs within individual test files.
- **Initial Load Timeouts:** For elements that appear after initial page load, XState machine initialization, or async data fetching (e.g., `checkAuthStatusActor`), use adequate timeouts in assertions:
    ```typescript
    // In *.e2e.ts
    await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible({ timeout: 20000 }); // e.g., 20 seconds
    ```
- **Testing Loading/Submitting States:**
    - UI states tied to brief XState transitions (e.g., a "submitting" state before an actor call) can be hard for Playwright to catch if the state exits too quickly.
    - **Artificial Delays in Actors (E2E Mode Only):** To make loading states (like disabled buttons or spinners) reliably testable, introduce a small, E2E-specific delay *within the invoked XState actor*, typically *before* the main asynchronous operation.
      ```typescript
      // Example: src/Machines/AppMachine/Services/RegisterWithEmail.actor.ts
      export const registerWithEmailActor = fromPromise<User, ...>(async ({ input }) => {
        if (process.env.E2E_TESTING === 'true') {
          console.log('[E2E DEBUG] Applying delay BEFORE Firebase call in actor');
          await new Promise(resolve => setTimeout(resolve, 500)); // e.g., 500ms-3000ms
        }
        // ... actual Firebase call ...
      });
      ```
    - **Data Attributes for State:** Add data attributes to components based on loading/submitting states (e.g., `<form data-submitting={isLoading ? 'true' : 'false'}>`). Assert these attributes in tests for more robust checks than relying solely on `toBeDisabled` or spinner visibility if timing is an issue.
      ```typescript
      // RegisterPage.tsx
      <form data-submitting={isLoading ? 'true' : 'false'} ... >

      // RegisterPage.e2e.ts
      await page.getByRole('button', { name: /Register/i }).click();
      await expect(page.locator('form[data-testid="register-form"]'))
        .toHaveAttribute('data-submitting', 'true', { timeout: 7000 });
      // Then check for disabled states
      await expect(page.getByRole('button', { name: /Register/i })).toBeDisabled();
      ```

### 14.3. Debugging E2E Tests with XState

- **Browser Console Logs:** Capture browser console output during Playwright tests to see XState machine logs or custom debug messages. Add a listener in `beforeEach` for relevant test suites:
  ```typescript
  // *.e2e.ts
  test.beforeEach(async ({ page }) => {
    page.on('console', msg => {
      if (msg.type() === 'log' || msg.type() === 'error' || msg.type() === 'warn') {
        // Log to the same terminal Playwright runs in
        console.log(`BROWSER CONSOLE (${msg.type().toUpperCase()}): ${msg.text()}`);
      }
    });
    await page.goto('/');
    // ...
  });
  ```
  This helps diagnose if XState actors are succeeding/failing or if expected state transitions are occurring.
- **XState Machine Internal Logs:** Add `console.log` statements within critical XState machine actions, `onDone`, and `onError` handlers to trace execution flow during tests. Example:
  ```typescript
  // AppMachine.ts
  // ...
  onDone: {
    actions: assign({ user: ({ event }) => {
      console.log('[AppMachine] Registration successful, user:', event.output);
      return event.output;
    }}),
  },
  onError: {
    actions: assign({ error: ({ event }) => {
      console.error('[AppMachine] Registration failed, error data:', event.data);
      return 'some error';
    }}),
  }
  // ...
  ```

### 14.4. Firebase Interactions in E2E

- **Mocking Firebase Auth with `page.route()`:**
    - For reliable E2E tests of auth flows, use `page.route()` to intercept and mock Firebase Auth network calls (e.g., `**/accounts:signUp`, `**/accounts:lookup`).
    - Define mocks *inside* specific `test()` blocks to ensure they are scoped correctly and don't interfere with other tests.
    - When a mock is intended for a specific email/user in a test, ensure the `route` handler checks the request payload (e.g., `postData.email`) and calls `route.continue()` for non-matching requests.
    - Be aware that the Firebase SDK might make follow-up calls after an initial successful operation (e.g., `accounts:lookup` after `accounts:signUp`). These may also need to be mocked for a complete "successful" flow.
      ```typescript
      // Example for successful registration test
      test('should allow successful registration', async ({ page }) => {
        const uniqueEmail = `e2e_success_${Date.now()}@example.com`;
        await page.route('**/accounts:signUp**', async route => {
          if (route.request().postDataJSON()?.email === uniqueEmail) {
            await route.fulfill({ status: 200, /* success body */ });
          } else { await route.continue(); }
        });
        await page.route('**/accounts:lookup**', async route => {
          // Mock lookup if it's for the uniqueEmail context
          await route.fulfill({ status: 200, /* lookup success body */ });
        });
        // ... rest of test
      });
      ```
- **SDK Error Handling (`undefined` errors):**
    - Firebase SDK functions (like `createUserWithEmailAndPassword`) might throw or reject with `undefined` in E2E environments, even if the underlying (mocked) network call returns a structured Firebase error (e.g., a 400 with an `EMAIL_EXISTS` message body). The SDK's internal error handling can obscure the original mocked error detail.
    - **Actor Robustness:** XState actors calling these SDK functions should include a `catch` block that defensively checks if the caught `error` is `undefined` (or not a proper `Error` instance). If so, the actor should throw a *new, specific `Error` instance* (e.g., `new Error('Firebase operation failed with an undefined error.')`).
      ```typescript
      // Inside an XState actor
      try {
        await firebaseSDKFunction(...);
      } catch (error) {
        if (error instanceof Error) { throw error; }
        // Handle undefined or non-Error objects
        throw new Error('Firebase operation failed with an unknown error type.');
      }
      ```
    - **Machine `onError` Handling:** The XState machine's `onError` handler for such actors should then check if `event.data` is an `Error` instance and use `event.data.message`. If `event.data` is still `undefined` or lacks a message (despite actor efforts), the machine should assign a clear, default error message to its context for UI display. This makes UI error message assertions in E2E tests predictable.
- **Test User Management:** Use uniquely generated emails (e.g., `testuser_${Date.now()}@example.com`) for tests involving user creation to ensure idempotency, especially when not mocking all interactions.

### 14.5. Timing and DOM Updates for React/XState

- **`page.waitForTimeout()`:** After actions that trigger XState events and React re-renders (e.g., button clicks leading to state changes), a brief `await page.waitForTimeout(250);` can be crucial before asserting UI changes. This gives React time to process state updates and commit them to the DOM.
- **Playwright Locators & Assertions:**
    - Use specific and stable locators. `data-testid` attributes are preferred. For FontAwesome icons, `svg[data-icon="icon-name"]` is reliable (e.g., `svg[data-icon="spinner"]`).
    - Scope locators correctly (e.g., `button[data-testid="my-button"] svg[data-icon="spinner"]`).
    - For conditionally rendered error messages or elements, first assert existence/count (`toHaveCount(1)`), then text content (`toHaveText`), then visibility (`toBeVisible`) to pinpoint assertion failures.

### 14.6. General E2E Test Structure
- **Correct Selectors:** Ensure Playwright selectors accurately target elements. For example, an `<a>` tag used as a link should be selected with `page.getByRole('link', { name: /.../ })`, not `button`.
- **Skipping Tests:** Use `test.describe.skip(...)` or `test.skip(...)` to temporarily exclude tests that are flaky or not yet relevant, allowing focus on critical paths.
- **Headings for Page Identification:** Adding clear `<h1>` or `<h2>` headings to pages/views can provide stable locators for `beforeEach` hooks to verify correct page navigation before proceeding with further test steps.
  ```typescript
  // LoginPage.tsx
  // <h2 className={styles.title}>Login</h2>

  // LoginPage.e2e.ts
  // await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
  ```

### 14.7. Playwright Reporter Configuration
- To prevent the HTML report from auto-opening and to allow the test runner to exit cleanly after tests:
  In `playwright.config.ts`, set `reporter: [['html', { open: 'never' }]]`.
  The report can still be viewed manually with `pnpm exec playwright show-report`.
