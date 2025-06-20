# Component Documentation

This section provides documentation for the React components used in the FableForge application. Components are organized based on their domain and reusability.

## Overview

Our component architecture emphasizes:
*   **Reusability:** Creating common UI elements that can be used across different parts of the application (e.g., Buttons, Inputs).
*   **Separation of Concerns:** Presentational components focus on rendering the UI, while logic and state management are often handled by custom React Hooks or XState machines.
*   **Co-location:** Component-specific types, styles, and tests are typically located within the same directory as the component itself.
*   **Accessibility:** Striving to build accessible components by following ARIA best practices and ensuring keyboard navigability.

## Component Structure

A typical component directory might look like this:

\`\`\`
src/Components/
└── Common/
    └── Button/
        ├── Button.tsx         # The component itself
        ├── Button.types.ts    # TypeScript type definitions for props
        ├── Button.styles.ts   # Griffel style definitions
        ├── Button.test.tsx    # Unit/integration tests (Vitest)
        └── Button.e2e.ts      # End-to-end tests (Playwright), if applicable
└── FeatureA/
    └── SpecificComponent/
        ├── SpecificComponent.tsx
        ├── UseSpecificComponent.ts # Custom hook for logic
        ├── SpecificComponent.types.ts
        └── ...
\`\`\`

## Key Component Groups

### 1. Common Components (`src/Components/Common/`)
These are generic, reusable UI building blocks.
*   **Button:** Standard button component with variants (primary, secondary, etc.) and loading states.
*   **Input:** Form input field with integrated label, icon support, and error message display.
*   **LoadingIndicator:** A visual spinner to indicate loading states.
*   *(More to be added as documented)*

### 2. Layout Components (`src/Components/Layout/`)
Components responsible for the overall page structure and layout.
*   **AppLayout:** The main application layout, typically including a header, main content area, and footer.
*   **Header:** The application header, often containing navigation links and user authentication status.
*   *(More to be added as documented)*

### 3. Authentication Components (`src/Components/Auth/`)
Components related to user authentication flows.
*   **AuthPage:** A container component that orchestrates the display of either the Login or Registration forms.
*   **LoginPage:** The form and UI for user login.
*   **RegisterPage:** The form and UI for new user registration.
*   *(More to be added as documented)*

### 4. Feature-Specific Components
(e.g., `src/Components/HomePage/`, `src/Components/Decks/`, `src/Components/Game/`)
Components that are specific to particular features or views of the application. These will be documented within their respective feature sections.

## Documenting Individual Components

Each significant component or group of related components will have its own markdown file within this `Components` directory, detailing:
*   Its purpose and usage.
*   Props it accepts.
*   Key internal logic or state (if not fully delegated to a hook).
*   Interaction with XState machines or other services.

*(This README will be updated with links to individual component documentation files as they are created.)*
