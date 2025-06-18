# Progress

## What Works

-

## What's Left to Build

-

## Card Attributes

- Based on classic Dungeons and Dragons character attributes: Strength, Dexterity, Constitution, Intelligence, Wisdom, Charisma.
- Values between 1 and 10.
- 50 total points to allocate per card.

## Special Abilities

- Each card can have 1 special ability.
- Abilities can modify attributes, manipulate gameplay, provide information, or modify rounds.

## Current Status

-

## Known Issues

-

## Evolution of Project Decisions

-

---
## Progress Update: 2025-06-17

We've made significant progress in defining the project's technical foundation and initial setup for the Top Trumps game.

**I. Project Setup & Configuration:**

1.  **Initial Project Scan:** Familiarized with the existing Vite + React + Firebase (functions) structure.
2.  **Package Management Migration:** Successfully migrated the project (root and `functions` directory) from NPM to PNPM. This involved removing `package-lock.json` and `node_modules`, then using `pnpm import`.
3.  **Core Dependencies Installed (using PNPM):**
    *   **State Management:** `xstate`, `@xstate/react` (for XState v5).
    *   **Styling:** `@griffel/react` (CSS-in-JS), `@headlessui/react` (unstyled UI components).
    *   **Testing:**
        *   `vitest`, `@vitest/ui` (unit/integration testing).
        *   `@playwright/test` (E2E testing).
        *   `@testing-library/jest-dom` (for Vitest DOM matchers).
4.  **Testing Configuration:**
    *   **Vitest:** Configured in `vite.config.ts` and created `vitest.setup.ts` for global test setup (including jest-dom).
    *   **Playwright:** Initialized, creating `playwright.config.ts` and example tests.
5.  **Initial XState Machine:**
    *   Created `src/Machines/AppMachine.ts` with a basic structure for the application flow (initializing -> authenticating -> authenticated.home), using XState v5 best practices for TypeScript.

**II. Tech Stack & Architectural Decisions:**

1.  **Comprehensive Tech Stack Defined:** Documented in `memory-bank/techContext.md`, covering:
    *   **Frontend:** React, Vite, TypeScript, Griffel, Headless UI, XState v5.
    *   **Backend:** Firebase Functions (TypeScript) for game logic, card/deck management, Gemini API calls.
    *   **Database:** Firebase Firestore with real-time updates for multiplayer.
    *   **Authentication:** Firebase Authentication (Email/Password, Google Sign-In).
    *   **Image Handling:** Gemini API for generation, Firebase Storage for storage.
    *   **Testing:** Vitest and Playwright.
2.  **UI/UX Guidelines Established:**
    *   Mobile-first design.
    *   Theme: Clean modern UI with a fantasy aesthetic.
    *   Color Palette: Dark base, purple primary accent, classic gold secondary accent.
    *   Typography: Macondo (headings, sparingly), Nunito Sans (body/UI).
    *   Details captured in `memory-bank/techContext.md` (Section 12).

**III. Documentation & Development Guidelines (`.clinerules`):**

1.  **`01-coding-standards.md`:** (Existing) General code style.
2.  **`02-testing-strategy.md`:** (Existing) Testing workflow.
3.  **`03-xstate-typescript.md`:** Created to document best practices for XState v5 with TypeScript, emphasizing built-in type inference over separate typegen files.
4.  **`04-typescript-best-practices.md`:** Created to cover:
    *   Type safety (avoiding `any`, using placeholder types).
    *   DRY principles (reusable logic/components, type inheritance).
    *   Avoiding magic strings (using constants/enums).
    *   General TypeScript best practices (readonly, utility types, etc.).
    *   ReactJS specific best practices (functional components, custom hooks for logic).
5.  **`memory-bank/techContext.md`:** Updated to be the central reference for all tech decisions and to point to the `.clinerules` files.

**IV. Key Learnings & Clarifications:**

1.  **XState v5 TypeScript:** Confirmed and documented that XState v5's improved built-in TypeScript support (especially with explicit context/event typing and the `satisfies` or `as` operator for initial context) generally removes the need for separate `.typegen.ts` files. This simplifies the setup.
2.  **Dependency Management:** Reinforced the importance of ensuring dependencies are correctly installed and recognized by TypeScript, especially after migrating package managers (NPM to PNPM). The initial "Cannot find module 'xstate'" error was resolved by explicitly installing `xstate` and `@xstate/react` with `pnpm add`.
3.  **TypeScript Server:** Acknowledged that restarting the TypeScript language server can be a necessary troubleshooting step after significant dependency changes.

**Next Steps Planned:**
*   Further development of the `AppMachine.ts` to include actual Firebase authentication logic.
*   Begin creating UI components based on the defined UI/UX guidelines.

---

## Progress Update: 2025-06-17 (Evening)

**V. AppMachine Refactoring & ESLint Enhancements:**

1.  **Firebase Authentication Implementation:**
    *   Integrated Firebase SDK and initialized Firebase in `src/Firebase/FirebaseConfig.ts`.
    *   Updated `AppMachine.ts` to use the `User` type from `firebase/auth` (via `AppMachine.types.ts`).
    *   Implemented actors (services) for `checkAuthStatus`, `loginWithEmail`, `loginWithGoogle`, and `logout` using Firebase authentication functions.
    *   The machine now correctly invokes these actors for authentication flows.
2.  **ESLint Configuration Enhanced (as per README.md):**
    *   Enabled type-aware linting rules (`recommendedTypeChecked`) in `eslint.config.js`.
    *   Installed and configured `eslint-plugin-react-x` and `eslint-plugin-react-dom`.
3.  **New `.clinerules` Added:**
    *   `05-type-definitions.md`: Guideline for co-locating TypeScript type definitions.
    *   `06-xstate-structure.md`: Guidelines for XState machine architecture, including co-locating actors/guards and rationale for multiple machines.
    *   `07-task-completion-guidelines.md`: Rule to ensure project builds successfully before task completion.
4.  **`AppMachine.ts` Refactoring for Structure and Type Safety:**
    *   Moved `AppContext` and `AppEvent` to `src/Machines/AppMachine.types.ts`.
    *   Refactored `AppMachine.ts` to use the XState v5 `setup()` API, which significantly improved TypeScript inference and resolved a persistent `createMachine` generic type error.
    *   Moved actor definitions (e.g., `checkAuthStatusActor`, `loginWithEmailActor`) into separate files within `src/Machines/AppMachine/Services/` as per `06-xstate-structure.md`.
    *   Addressed ESLint errors arising from stricter type checking, particularly for `event.data` in `onError` handlers.
5.  **Key Learnings & Clarifications (Continued):**
    *   **XState `setup()` API:** Confirmed its effectiveness in improving type safety and resolving complex TypeScript errors with `createMachine`.
    *   **Co-location Benefits:** Practical application of co-locating types and actor logic, leading to a more modular `AppMachine`.
    *   **Strict ESLint Rules:** Navigated challenges with `typescript-eslint`'s `recommendedTypeChecked` rules, especially around `AnyEventObject` and `event.data` access, finding pragmatic solutions to satisfy the linter.
    *   **File Path Management:** Reinforced the importance of accurate relative import paths during refactoring.

**Current Status:**
*   The `AppMachine` is now refactored for better structure and type safety, with Firebase authentication logic integrated.
*   Project coding standards and guidelines in `.clinerules` have been expanded.
*   The project currently builds successfully.

**Next Steps Planned:**
*   Develop UI components for Login, Registration, and Home Page.
*   Connect these components to `appMachine`.
*   Write unit tests for `appMachine` and component/E2E tests.

---
## Progress Update: 2025-06-18 (Early AM)

**VI. Theme Refactor to "Cleaner Dark Theme" & App Renaming:**

1.  **App Renaming:**
    *   Project officially named "FableForge".
    *   Updated in `package.json` (name field).
    *   Updated in `public/index.html` and root `index.html` (`<title>` tag).
    *   Updated in `README.md` and `src/Components/HomePage/HomePage.tsx`.
    *   CSS variable prefix changed from `--hopwood-` to `--fableforge-` in `src/Theme/GlobalStyles.ts` and all component `.styles.ts` files.
2.  **New Font Implementation:**
    *   Installed `@fontsource/inter`.
    *   Updated `src/index.css` to import "Inter" weights (300, 400, 500, 700).
    *   Removed previous font imports (Playfair Display, Alegreya, Metamorphous, Nunito Sans).
3.  **Theme Token Overhaul (`src/Theme/Tokens.ts`):**
    *   **Colors:** Defined a new "Cleaner Dark Theme" palette (dark greys for backgrounds, modern purple/violet primary, teal/cyan secondary accent, off-white text).
    *   **Typography:** Set "Inter" as `fontFamilyHeading` and `fontFamilyBody`. Updated font weight tokens.
    *   **Shadows & Radii:** Simplified `shadowTokens` (minimized use) and standardized `borderRadiiTokens` for a cleaner look.
4.  **Global Style Refactor (`src/Theme/GlobalStyles.ts`):**
    *   Updated to use new `--fableforge-` CSS variable prefix.
    *   Body background changed to solid color (texture removed).
    *   Default styles for headings, paragraphs, links, buttons, and inputs updated to reflect the cleaner aesthetic (Inter font, new colors, simplified buttons, minimized shadows).
    *   Replaced deprecated Griffel shorthands (e.g., `shorthands.padding`) with direct CSS properties or valid non-deprecated shorthands (e.g., `shorthands.borderColor` where appropriate).
5.  **Component Style Refactor (`*.styles.ts` files):**
    *   All component style files (`LoadingIndicator`, `AppLayout`, `AuthPage`, `LoginPage`, `HomePage`) updated to:
        *   Use the new `--fableforge-` CSS variable prefix.
        *   Align with the "Cleaner Dark Theme" (new colors, Inter font, simpler button styles, minimized shadows/gradients).
        *   Replace deprecated Griffel shorthands with direct CSS properties or valid non-deprecated shorthands.
    *   `AuthPage.tsx` updated to style tertiary actions (toggle between login/register) as text links (`styles.toggleLink`) instead of buttons.
6.  **Documentation Updates:**
    *   `memory-bank/projectbrief.md` and `memory-bank/techContext.md` updated to reflect the "FableForge" name and the new "Cleaner Dark Theme" details.
    *   `.clinerules/08-styling-griffel.md` updated to clarify usage of Griffel shorthands (prefer longhands or non-deprecated specific shorthands).
7.  **Linting & Build Stability:**
    *   Resolved various ESLint and TypeScript errors that arose during refactoring.
    *   Addressed persistent ESLint "unsafe" warnings in `LoginPage.test.tsx` by refining mock typings and adhering to the documented strategy of using file-level ESLint disable comments when tests and build pass but static analysis remains overly cautious for complex mocks. (Ultimately, the disable comments were found to be unnecessary after mock refinement).
    *   Ensured `pnpm lint` runs clean (or with only acceptable, documented warnings like unused disable directives if they become necessary again).
    *   Ensured `pnpm test` (Vitest unit tests) pass.
    *   Ensured `pnpm build` completes successfully.

**Current Status:**
*   The application has been rebranded to "FableForge".
*   A new "Cleaner Dark Theme" using the "Inter" font and a refined color palette is implemented.
*   Styling has been simplified, with minimized textures, gradients, and shadows.
*   Button styles are cleaner, and tertiary actions are styled as links.
*   Codebase is linted, tests pass, and the project builds successfully.

**Next Steps Planned:**
*   Proceed with UI development for the Registration Page.
*   Continue connecting UI components to `appMachine`.
*   Expand unit and E2E test coverage.

---
## Progress Update: 2025-06-18 (Late Morning)

**VII. Reusable Button Component Implementation & Integration:**

1.  Created Reusable `Button` Component:
    * Implemented a reusable `Button` component with primary and secondary variants, isLoading state, and icon support.
    * Created `Button.types.ts`, `Button.styles.ts`, `Button.tsx`, and `Button.test.tsx` files in `src/Components/Common/Button/`.
    * Added basic unit tests in `Button.test.tsx`.
    * Added a stub for Playwright E2E tests in `Button.e2e.ts`.
2.  Integrated `Button` Component into `LoginPage` and `HomePage`:
    * Replaced existing `<button>` elements in `LoginPage.tsx` and `HomePage.tsx` with the new `<Button>` component.
    * Removed button-specific styles from `LoginPage.styles.ts` and `HomePage.styles.ts`.
3.  Created `.clinerules/09-component-reusability.md`:
    * Documented guidelines for prioritizing reusable components and designing for composability.
4.  Updated `.clinerules` Files:
    * Updated `.clinerules/08-styling-griffel.md` to mention the `Button` component as the standard way to style buttons.
    * Updated `.clinerules/04-typescript-best-practices.md` to point to the new reusability rule.

**Current Status:**
* A reusable `Button` component has been created and integrated into existing UI.
* A new `.clinerule` has been added to encourage the creation of reusable components.

**Next Steps Planned:**
* Proceed with UI development for the Registration Page.
* Continue connecting UI components to `appMachine`.
* Expand unit and E2E test coverage.

---
## Progress Update: 2025-06-18 (Evening)

**VIII. Registration Page Implementation & Testing:**

1.  **Reviewed Existing Registration Components:**
    *   Confirmed `RegisterPage.tsx` UI, `UseRegisterPage.ts` custom hook, `RegisterWithEmail.actor.ts`, `AppMachine.types.ts`, and `AppMachine.ts` logic align for the registration flow.
    *   Verified `RegisterPage.styles.ts` adheres to the theme.
2.  **Unit Tests for Registration Page:**
    *   Created `src/Components/Auth/RegisterPage.test.tsx`.
    *   Implemented tests covering form rendering, input handling, validation (password mismatch), error message display, loading state, and correct event dispatch to `appMachine`.
    *   Addressed and resolved initial ESLint and TypeScript issues in the new test file.
3.  **E2E Tests for Registration Flow:**
    *   Created `src/Components/Auth/RegisterPage.e2e.ts` using Playwright.
    *   Implemented tests for successful registration, password mismatch errors, display of generic registration errors, and UI behavior during loading/submission.
4.  **Documentation:**
    *   Updated `memory-bank/activeContext.md` to reflect the completion of the Registration Page.
    *   Updated `memory-bank/projectbrief.md` to include PWA/Notifications and AI Opponent as future enhancements.

**Current Status:**
*   The User Registration Page functionality is implemented, including UI, form handling, XState integration for Firebase user creation, and error/loading states.
*   Comprehensive unit and E2E tests for the registration flow are in place.
*   Project documentation has been updated.

**Next Steps Planned:**
*   Run full linting, all tests (unit and E2E), and a project build to ensure overall integrity.
*   If all checks pass, proceed to the next major feature: Enhancing the Home Page (e.g., adding "Manage Decks" and "Play Game" options).
