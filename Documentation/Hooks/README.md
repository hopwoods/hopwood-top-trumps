# Hooks Documentation

This section provides documentation for the custom React Hooks used within the FableForge application. Custom hooks are a fundamental part of our architecture for encapsulating and reusing stateful logic, side effects, and event handlers, keeping our presentational components clean and focused.

## Overview

We adhere to the React best practice of extracting component logic into custom hooks, especially for components with more than minimal UI state or side effects. This promotes:
*   **Separation of Concerns:** UI (in `.tsx` components) is distinct from logic (in `useMyHook.ts` files).
*   **Reusability:** Logic can be reused across multiple components if applicable.
*   **Testability:** Hooks can often be tested in isolation, simplifying unit testing.
*   **Readability:** Components become easier to understand as their primary responsibility is rendering.

## Naming Convention

Custom hooks are typically named with the `use` prefix, followed by a descriptive name related to the component or functionality they serve (e.g., `useLoginPage.ts`, `useAuthPage.ts`).

## Common Hook Responsibilities

Custom hooks in this project may handle:
*   **Local UI State:** Managing state that is specific to a component or a small group of related components (e.g., form input values, toggle states for UI elements).
*   **Event Handlers:** Defining functions to handle user interactions (e.g., `onClick`, `onChange`, `onSubmit`).
*   **Side Effects:** Managing operations like API calls (though often delegated to XState actors), setting up subscriptions, or interacting with browser APIs via `useEffect`.
*   **Interfacing with XState Machines:** Using hooks like `useActor` or `useSelector` from `@xstate/react` to interact with global or feature-specific state machines, sending events, and selecting state values. Custom hooks often serve as an abstraction layer between components and XState machines.
*   **Form Validation:** Implementing client-side validation logic for forms.

## Key Hooks

*(This section will be populated with links to documentation for specific, significant custom hooks as they are documented. Examples might include:)*

*   **`useAuthPage.ts`**: Manages the logic for the `AuthPage` component, such as toggling between login and registration views.
*   **`useLoginPage.ts`**: Handles the state (email, password) and submission logic for the `LoginPage` component, including sending events to the `AuthMachine`.
*   **`useRegisterPage.ts`**: Manages state and submission logic for the `RegisterPage` component, including form validation and sending events to the `AuthMachine`.
*   **`useAppState.ts`**: Provides a convenient way to access the global `appMachine` actor and its context throughout the application.
*   **`useAuthMachineState.ts`**: A specialized hook to interact specifically with the `authMachine` (likely spawned by `appMachine`), providing its state, context, and a `send` function.
*   **`useToggle.ts`**: A generic utility hook for managing boolean toggle states.

## Documenting Individual Hooks

Each significant custom hook will have its own documentation (or be documented alongside its primary component) detailing:
*   Its purpose and what logic it encapsulates.
*   The state it manages and exposes.
*   The functions/callbacks it returns.
*   Any side effects it performs.
*   How it interacts with other services or XState machines.

*(This README will be updated with links to individual hook documentation files or sections as they are created.)*
