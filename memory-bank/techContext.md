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
