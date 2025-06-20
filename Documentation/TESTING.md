# Testing Strategy for FableForge

This document outlines the testing strategy employed in the FableForge project, covering unit, integration, and end-to-end (E2E) tests. Our goal is to ensure code quality, prevent regressions, and maintain a high degree of confidence in the application's stability.

## Guiding Principles

*   **Test Pyramid:** We aim for a balanced test pyramid, with a broad base of fast unit tests, a moderate number of integration tests, and a smaller, focused set of E2E tests for critical user flows.
*   **Co-location of Tests:** Unit and integration tests for components and hooks are typically co-located with the source files (e.g., `MyComponent.test.tsx` alongside `MyComponent.tsx`).
*   **Realism vs. Speed:** We balance the need for tests to reflect real user scenarios (especially E2E) with the need for tests to run quickly and provide fast feedback.
*   **CI/CD Integration:** Tests are intended to be run automatically as part of a Continuous Integration/Continuous Deployment (CI/CD) pipeline.
*   **Test Driven Development (TDD):** Encouraged where applicable, especially for business logic within XState machines and utility functions.

## Testing Tools

*   **Unit & Integration Testing:**
    *   **Vitest:** A Vite-native test runner, chosen for its speed and seamless integration with the Vite build tool.
    *   **React Testing Library:** For testing React components by interacting with them as a user would, focusing on behavior rather than implementation details.
    *   **JSDOM/Happy DOM:** Vitest uses JSDOM by default to simulate a browser environment for tests running in Node.js.
*   **End-to-End (E2E) Testing:**
    *   **Playwright:** For testing complete user flows in real browser environments (Chromium, Firefox, WebKit). Playwright provides robust APIs for browser automation, assertions, and network interception.
*   **Mocking:**
    *   **Vitest's `vi.mock`:** Used for mocking modules, functions, and components in unit/integration tests.
    *   **Playwright's `page.route()`:** Used for mocking network requests (e.g., Firebase API calls) in E2E tests to create controlled test scenarios and avoid flakiness due to external dependencies.

## Types of Tests

### 1. Unit Tests

*   **Focus:** Testing the smallest individual units of code in isolation (e.g., helper functions, individual functions within custom hooks, simple presentational components, XState actions/guards).
*   **Characteristics:** Fast, numerous, and highly focused.
*   **Examples:**
    *   Testing a utility function with various inputs and asserting its output.
    *   Testing a simple React component to ensure it renders correctly based on props.
    *   Testing an XState guard function to ensure it returns the correct boolean based on context/event.

### 2. Integration Tests

*   **Focus:** Testing the interaction between several units or components. This often involves testing a component along with its custom hook, or how multiple components render and behave together. For XState, this can involve testing a machine's transitions and actions in response to a sequence of events.
*   **Characteristics:** Slower than unit tests but provide more confidence in how parts of the system work together.
*   **Examples:**
    *   Testing a form component: filling inputs, submitting, and verifying that the correct events are sent or state is updated (often involving mocking the underlying submission logic).
    *   Testing an XState machine by sending a series of events and asserting the resulting state, context changes, and invoked actors/actions.
    *   Testing that a parent component correctly passes props to and renders child components.

### 3. End-to-End (E2E) Tests

*   **Focus:** Testing complete user flows from the user's perspective, interacting with the application as it runs in a real browser.
*   **Characteristics:** Slowest but provide the highest confidence that the application works as a whole for critical paths. Should be used judiciously for key user journeys.
*   **Examples:**
    *   User registration flow: navigating to the registration page, filling the form, submitting, and verifying successful registration (or error messages).
    *   User login flow.
    *   Core gameplay loop (e.g., starting a game, playing a card, determining a winner).
    *   Deck creation and management.
*   **Key Considerations for E2E:**
    *   **Test Data Management:** Ensuring a consistent state for test data.
    *   **Mocking External Services:** Using `page.route()` to mock Firebase calls to ensure deterministic behavior and avoid reliance on live backend services during tests.
    *   **Stable Locators:** Using `data-testid` attributes or other robust selectors to minimize test flakiness due to UI changes.
    *   **Handling Asynchronicity:** Using Playwright's auto-waiting capabilities and explicit waits (`waitForFunction`, `waitForSelector`, `expect().toBeVisible()`) to handle asynchronous operations and UI updates.

## Testing Workflow (as per `.clinerules/02-testing-strategy.md`)

1.  **Run the full test suite:** `pnpm test` (for Vitest unit/integration) and `pnpm test:e2e` (for Playwright E2E).
2.  **Identify and record failing test files.**
3.  **Fix tests in each file in isolation.**
4.  **Once all tests for a given file pass, record lessons learned and commit.**
5.  **After all test files are green, run a full project build:** `pnpm build`.
6.  **Fix any build issues.**
7.  **Commit once the project builds successfully and all tests pass.**

## Specific Strategies from `.clinerules/`

*   **ESLint `no-unsafe-*` in Test Files:** Judicious disabling of these rules is permitted in test files for complex mocks if type safety is otherwise ensured and tests pass.
*   **E2E Testing Considerations:**
    *   Correct `webServer` configuration in `playwright.config.ts`.
    *   Stabilizing async UI tests with generous timeouts and robust locators.
    *   Testing loading states using data attributes or artificial delays in E2E mode.
    *   Debugging XState in E2E via console logs captured by Playwright.
    *   Handling Firebase SDK errors robustly in actors and machines.
    *   Using `page.route()` for mocking external services like Firebase Auth.
    *   Using `context.addInitScript` to ensure a clean browser state (e.g., clearing `localStorage`, `IndexedDB`) before tests.

This testing strategy aims to build a reliable and maintainable FableForge application.
