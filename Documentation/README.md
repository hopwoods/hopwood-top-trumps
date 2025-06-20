# FableForge Project Documentation

Welcome to the FableForge project! This document serves as the main entry point for understanding the project's architecture, components, state management, and overall design.

FableForge is a fast-paced card game where players bring mythical heroes, beasts, and artifacts to life, challenging opponents in a contest of stats and strategy.

## Table of Contents

1.  [Project Overview](#project-overview)
2.  [Tech Stack](#tech-stack)
3.  [Project Structure](#project-structure)
4.  [Core Concepts](#core-concepts)
    *   [State Management with XState](#state-management-with-xstate)
    *   [The Actor Model in FableForge](#the-actor-model-in-fableforge)
    *   [Component-Based Architecture (React)](#component-based-architecture-react)
    *   [Styling (Griffel)](#styling-griffel)
5.  [Detailed Documentation](#detailed-documentation)
    *   [Components](./Components/README.md)
    *   [Hooks](./Hooks/README.md)
    *   [State Machines (XState)](./Machines/README.md)
    *   [Theme and Styling](./Theme/README.md)
    *   [Firebase Integration](./Firebase/README.md)
6.  [Getting Started](#getting-started)
7.  [Testing Strategy](./TESTING.md)
8.  [Coding Standards & Best Practices](./CODING_STANDARDS.md)

## Project Overview

[Briefly describe the game and its main features, e.g., user authentication, deck management, gameplay mechanics. This can be expanded based on product context from the memory bank.]

## Tech Stack

*   **Frontend Framework:** React (v19) with TypeScript
*   **State Management:** XState v5
*   **Styling:** Griffel (CSS-in-JS)
*   **Build Tool:** Vite
*   **Testing:**
    *   Unit/Integration: Vitest
    *   E2E: Playwright
*   **Backend/Authentication:** Firebase (Authentication, Firestore, Functions)
*   **Linting/Formatting:** ESLint, Prettier (assumed)

## Project Structure

(A brief overview of the main directories like `src/`, `src/Components/`, `src/Machines/`, `public/`, etc., and their purpose.)

## Core Concepts

### State Management with XState

This project utilizes XState for managing complex application states and business logic in a robust and predictable manner. XState is a library for creating, interpreting, and executing finite state machines and statecharts.

**Why XState?**
*   **Declarative States:** Clearly define all possible states your application or components can be in.
*   **Explicit Transitions:** Define how and when the application can transition from one state to another based on events.
*   **Predictability:** Makes application flow easier to understand, debug, and test.
*   **Side Effect Management:** Provides clear ways to manage side effects (like API calls) associated with states and transitions.
*   **Actor Model:** Enables complex systems to be broken down into smaller, communicating state machines (actors).

For beginners to XState, imagine a light switch. It can be in an 'on' state or an 'off' state. An event (flipping the switch) causes a transition. XState allows us to model much more complex scenarios like user authentication flows, game states, form submissions, etc., with many states, nested states, and events.

### The Actor Model in FableForge

FableForge leverages XState's actor model to manage different domains of the application's state. Instead of one massive state machine, we compose multiple smaller, focused machines (actors) that can communicate with each other by sending and receiving events.

*   **`AppMachine`**: The root machine, orchestrating global application concerns like initialization, overall authentication state (e.g., `unauthenticated`, `authenticating`, `authenticated`), and potentially invoking other actors for major features.
*   **`AuthMachine`**: A child actor (invoked or spawned by `AppMachine`) responsible for the detailed flows of user authentication, such as login, registration, and password recovery. It communicates its success or failure back to the `AppMachine`.
*   **Future Machines (Actors)**: As the game develops, features like deck building, game setup, active gameplay, and AI interactions could each be managed by their own dedicated machines (actors), invoked by parent machines as needed.

**Benefits of the Actor Model Here:**
*   **Separation of Concerns:** Each machine handles its own logic (e.g., `AuthMachine` doesn't need to know about game rules).
*   **Modularity & Reusability:** An `AuthMachine` could potentially be reused in other projects.
*   **Testability:** Each machine can be tested in isolation.
*   **Scalability:** Easier to add new features by adding new actors without making existing ones overly complex.

Actors communicate by sending events. For example, when a user submits a login form, the UI sends an event to the `AuthMachine`. If login is successful, `AuthMachine` might send a `LOGIN_SUCCESS` event to its parent (`AppMachine`), which then transitions the whole app to an authenticated state.

### Component-Based Architecture (React)

The UI is built using React functional components. We follow best practices for component design:
*   **Separation of Concerns:** Logic is often encapsulated in custom hooks (`useMyComponentLogic.ts`), keeping presentational components (`MyComponent.tsx`) clean.
*   **Props for Configuration:** Components are made reusable and configurable via props.
*   **Co-location:** Test files, TypeScript types, and sometimes styles are co-located with their component files.

### Styling (Griffel)

Styling is handled using Griffel, a CSS-in-JS library.
*   **Atomic CSS:** Griffel generates atomic CSS classes, leading to optimized stylesheets.
*   **Type Safety:** Styles are defined in TypeScript.
*   **Theming:** The application uses CSS custom properties (variables) for theming, defined in `src/Theme/Tokens.ts` and applied globally in `src/Theme/GlobalStyles.ts`. Components reference these CSS variables in their Griffel styles.

## Detailed Documentation

For more in-depth information, please refer to the documentation within the respective subfolders:

*   **[Components](./Components/README.md)**
*   **[Hooks](./Hooks/README.md)**
*   **[State Machines (XState)](./Machines/README.md)**
*   **[Theme and Styling](./Theme/README.md)**
*   **[Firebase Integration](./Firebase/README.md)**

## Getting Started

(Instructions on how to clone, install dependencies, run the development server, etc.)
\`\`\`bash
git clone [repository-url]
cd fableforge
pnpm install
pnpm dev
\`\`\`

## Testing Strategy

Details about our testing approach, including unit, integration, and E2E tests, can be found in [TESTING.md](./TESTING.md).

## Coding Standards & Best Practices

Our project follows specific coding standards and best practices, documented in [CODING_STANDARDS.md](./CODING_STANDARDS.md) and the `.clinerules/` directory.
