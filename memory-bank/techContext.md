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
*   Vitest, Playwright
*   ESLint

## 12. UI/UX Guidelines (As of 2025-06-17)

*   **Overall Approach:** Mobile-first design.
*   **Visual Style:** Clean modern UI with a strong fantasy theme.
*   **Color Palette:**
    *   **Base:** Dark theme (e.g., deep, desaturated blues or charcoals).
    *   **Primary Accent:** Purple (for primary actions, highlights).
    *   **Secondary Accent:** Classic Gold (e.g., `#FFD700`, for emphasis, important info, special text/icons).
    *   **Text & Neutrals:** Off-whites and light grays for readability against the dark base.
*   **Typography:**
    *   **Headings/Titles (sparingly):** Macondo (Google Font).
    *   **Body Text & General UI:** Nunito Sans (Google Font).
*   **Key Principles:**
    *   High contrast for readability on mobile.
    *   Intuitive touch targets and navigation.
    *   Card design optimized for mobile legibility and interaction.
    *   Subtle animations and transitions to enhance the modern feel.
