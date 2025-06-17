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
