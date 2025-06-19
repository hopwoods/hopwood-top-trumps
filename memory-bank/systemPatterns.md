# System Patterns (Top Trumps Game - As of 2025-06-19)

This document outlines key architectural and system patterns adopted for the Top Trumps digital card game project.

## 1. Overall Architecture
*   **Client-Server Model:**
    *   **Client (Frontend):** Vite-built React Single Page Application (SPA) responsible for UI rendering, user interaction, and local state management.
    *   **Server (Backend):** Firebase services, primarily Firebase Functions (serverless) for business logic, and Firestore as the database.
*   **Mobile-First Design:** UI/UX development prioritizes mobile screen sizes and interactions, adapting responsively as needed.

## 2. Key Technical Decisions & Patterns

*   **State Management Pattern:**
    *   **Tool:** XState v5.
    *   **Approach:** Centralized state machines for managing application flow (e.g., authentication, navigation between game sections), UI states, and complex component logic. This promotes predictability and clear separation of concerns.
    *   **Reference:** `.clinerules/03-xstate-typescript.md`

*   **Styling Pattern:**
    *   **Tool:** Griffel (CSS-in-JS).
    *   **Base Components:** Headless UI for unstyled, accessible component primitives.
    *   **Approach:** Custom styling applied via Griffel to Headless UI components, ensuring a unique look and feel while maintaining accessibility and performance. Co-location of styles with components is preferred as per `.clinerules/01-coding-standards.md`.

*   **Backend Logic Pattern:**
    *   **Tool:** Firebase Functions (TypeScript).
    *   **Approach:** Serverless functions for all backend business logic, including:
        *   Data validation (e.g., card creation rules).
        *   Interactions with external services (e.g., Gemini API for artwork).
        *   Core game logic execution (e.g., determining round winners, managing game sessions).
        *   Secure database operations.

*   **Database Interaction Pattern:**
    *   **Tool:** Firebase Firestore.
    *   **Approach:**
        *   Structured data collections (e.g., `users`, `decks`, `cards`, `gameSessions`).
        *   Real-time listeners (e.g., `onSnapshot`) for multiplayer game state synchronization, providing immediate updates to connected clients.

*   **Authentication Pattern:**
    *   **Tool:** Firebase Authentication.
    *   **Approach:** Integrated Firebase Auth for user registration and sign-in (Email/Password, Google Sign-In). User identity (UID) will be linked to data in Firestore.

*   **API Interaction (External):**
    *   **Example:** Gemini API for image generation.
    *   **Approach:** All external API calls (especially those requiring secret keys) will be proxied through Firebase Functions to ensure security and manage usage.

*   **Testing Strategy:**
    *   **Unit/Integration:** Vitest.
    *   **End-to-End (E2E):** Playwright.
    *   **Approach:** Test-Driven Development (TDD) is encouraged. Comprehensive testing across components, state machines, utility functions, and backend functions.
    *   **Reference:** `.clinerules/02-testing-strategy.md`

*   **Development Best Practices:**
    *   **TypeScript:** Strong typing, avoidance of `any`, explicit type definitions.
    *   **DRY Principle:** Reusable functions, custom hooks, components, and type inheritance.
    *   **No Magic Strings:** Use of constants/enums.
    *   **React:** Functional components, custom hooks for logic encapsulation.
    *   **Reference:** `.clinerules/04-typescript-best-practices.md` and `.clinerules/01-coding-standards.md`.

## 3. Component Relationships (Conceptual - High Level)
*   **`App` (Root Component):** Manages the main XState `appMachine` instance. Renders different UI views based on the current state of `appMachine`.
*   **View Components (e.g., `LoginPage`, `HomePage`, `DeckBuilderPage`, `GamePage`):** Render specific UI sections based on the active state in `appMachine` or child machines.
*   **Shared UI Components (e.g., `Button`, `Card`, `Modal`):** Built with Headless UI and styled with Griffel, used across various views.
*   **Custom Hooks:** Encapsulate reusable logic, such as interactions with Firebase services (e.g., `useAuth`, `useFirestoreData`) or complex UI interactions not handled by XState directly.

## 4. Critical Implementation Paths
*   **Authentication Flow:** Securely integrating Firebase Authentication with the XState `appMachine`.
*   **Deck & Card Creation Logic:** Implementing robust validation and data storage in Firebase Functions and Firestore.
*   **Gemini API Integration:** Securely calling the Gemini API via a Firebase Function and handling image storage in Firebase Storage.
*   **Real-time Multiplayer Game Logic:** Designing and implementing the `gameSession` state management in Firestore and XState, ensuring smooth real-time updates.
*   **Mobile-First UI Implementation:** Consistently applying mobile-first principles in component design and layout.

## 5. UI/UX Design Patterns & Principles (Learned from appDesignResearch.md)

*   **Dual User Journeys:** The application must support both content creation (Deck Design) and competitive play (Match Mode) with distinct but interconnected user experiences.
*   **Visual Metaphors:** Use "deck cards" as visual representations in the Deck Management Hub to reinforce the game's nature.
*   **Clear Calls to Action:** Prominent CTAs like "+ Create New Deck" are essential.
*   **Community Ecosystem Facilitation:** Design UI to encourage sharing, cloning, and rating of user-generated content (e.g., "Share" icon with confirmation modal, "Download/Clone" for community decks).
*   **Three-Panel Editor Layout:** For complex creation tasks (Card Editor), a persistent Left Panel (Deck Overview), a central Live Preview (Card Canvas), and a Right Panel (Inspector/Input Form) for optimal workflow and real-time feedback.
*   **Dynamic Form Elements:** Ability to dynamically add input fields (e.g., for card stats) with crucial associated logic (e.g., "Win Condition" dropdown for each stat).
*   **Asymmetric Match Layout:** In the Dueling Interface, visually reinforce asymmetric information (opponent's card face-down, player's card face-up and interactive).
*   **Storyboarding Conflict Resolution:** Implement dramatic, animated sequences for card reveals, comparisons (WIN/LOSE/DRAW banners), and card transfers to enhance emotional engagement. Special handling for draws (pot area).
*   **Structured Pre-Game Flow:** Clear, multi-step process for match setup (Mode Selection, Deck Selection, AI Difficulty/Multiplayer Lobby).
*   **End Game Clarity:** Definitive end-game screens with outcome declaration, final scores, player progression, and clear re-engagement CTAs.
*   **Data as a Feature:** Leverage gameplay data for Player Profiles and statistical deep dives (W/L ratios, deck analysis, social stats).
*   **Ethical Monetization:** Focus on cosmetic customization (card backs, UI themes) and content featuring, avoiding pay-to-win.
*   **Core UI Principles:** Prioritize clarity, readability, high contrast, and visual hierarchy. Embrace full responsive design (including layout changes). Celebrate key moments with animations.
