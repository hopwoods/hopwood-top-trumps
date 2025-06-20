# State Machine Documentation (XState)

This section details the XState state machines and statecharts used in the FableForge application. We use XState to manage complex application logic, user flows, and asynchronous operations in a predictable and robust manner.

## Core Principles

*   **Declarative States & Transitions:** Each machine clearly defines its possible states and the events that cause transitions between them.
*   **Actor Model:** The application is composed of multiple communicating state machines (actors). The `AppMachine` serves as the root, orchestrating global concerns and potentially spawning or invoking other machines for specific features (like `AuthMachine`).
*   **Side Effects:** Actors and services within machines handle side effects like API calls (e.g., Firebase authentication, data fetching).
*   **Context:** Each machine maintains its own `context` to store quantitative state (data relevant to the machine's operation).
*   **Type Safety:** Machines are typed using TypeScript, leveraging XState v5's built-in type generation and the `setup` API for strong inference. Type definitions are typically co-located in `MachineName.types.ts` files.

## Key Machines

### 1. `AppMachine` (`src/Machines/AppMachine/AppMachine.ts`)

*   **Responsibility:** The main application orchestrator. It manages global states such as:
    *   Application initialization (`initializing`).
    *   Authentication status (`unauthenticated`, `authenticating`, `authenticated`).
    *   Navigation between major sections (e.g., showing auth pages vs. main app content).
*   **Actors Invoked/Spawned:**
    *   `checkAuthStatusActor`: Invoked during initialization to determine if a user session exists.
    *   `AuthMachine` (conceptual): Likely invoked or spawned when the app is in an `unauthenticated` state to handle login/registration flows. (The exact mechanism of how `AuthMachine` is integrated needs to be detailed here based on its implementation).
    *   Actors for Firebase operations like `loginWithEmailActor`, `loginWithGoogleActor`, `registerWithEmailActor`, `logoutActor`.
*   **Key Context Data:**
    *   `currentUser: User | null`: Stores the authenticated Firebase user object.
    *   `error: string | null`: Stores any global error messages, particularly from authentication failures.
*   **Key States:**
    *   `initializing`: Initial state, typically invokes `checkAuthStatusActor`.
    *   `unauthenticated`: No user is logged in. UI shows authentication pages (Login/Register).
        *   `idle`: Waiting for user interaction.
        *   `authFlow`: Delegates to the `AuthMachine` (or handles auth events directly).
    *   `authenticating`: An authentication attempt is in progress (e.g., after form submission).
    *   `authenticated`: A user is logged in.
        *   `home`: Default state for authenticated users, showing the main application content (e.g., HomePage).
        *   *(Other authenticated sub-states for different app sections like deck management, gameplay, etc.)*
*   **Communication:** Receives events from UI components (via hooks like `useAppState` or `useAuthMachineState`) and from child actors (e.g., `AUTHENTICATION_SUCCESS`, `AUTHENTICATION_FAILURE` from `AuthMachine`).

### 2. `AuthMachine` (`src/Machines/AuthMachine/AuthMachine.ts`)

*   **Responsibility:** Manages the detailed state and logic for user authentication processes, including login and registration. This machine is typically invoked by `AppMachine`.
*   **Key Context Data:**
    *   `error: string | null`: Stores errors specific to the auth flow (e.g., "Invalid credentials", "Email already exists" before it's processed/generalized by AppMachine).
    *   Potentially form input values if not handled by local component/hook state.
*   **Key States (Conceptual - actual states depend on implementation):**
    *   `idle`: Ready for user input on login or registration forms.
    *   `submittingLogin`: Login attempt in progress (invokes `loginWithEmailActor` or `loginWithGoogleActor`).
    *   `submittingRegistration`: Registration attempt in progress (invokes `registerWithEmailActor`).
    *   `success`: Auth operation successful. Sends a success event to the parent (`AppMachine`).
    *   `failure`: Auth operation failed. Stores error in context and sends a failure event to the parent (`AppMachine`).
*   **Communication:**
    *   Receives `SUBMIT_LOGIN`, `SUBMIT_REGISTRATION`, `LOGIN_WITH_GOOGLE` events from UI components.
    *   Invokes actors for Firebase authentication operations.
    *   Sends `AUTHENTICATION_SUCCESS` or `AUTHENTICATION_FAILURE` events (with user data or error details) to its parent machine (`AppMachine`).

*(This section will be updated with details of other machines as they are developed and documented, e.g., GameMachine, DeckMachine.)*

## Documenting Individual Machines

Each state machine will have:
*   A brief overview of its purpose.
*   A description of its `context` (data it holds).
*   A list and description of its main `states`.
*   Key `events` it handles and produces.
*   `actions` it performs (synchronous updates to context).
*   `actors/services` it invokes (asynchronous operations).
*   `guards` it uses (conditional logic for transitions).
*   How it communicates with other machines (parent/child actors).

Visualizations (e.g., using XState's visualizer or Mermaid diagrams) can be very helpful for understanding complex machines and will be included where appropriate.
