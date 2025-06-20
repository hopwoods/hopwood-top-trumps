# Coding Standards & Best Practices

This document outlines the primary coding standards, style guides, and best practices adopted for the FableForge project. These guidelines are designed to ensure code consistency, maintainability, readability, and quality.

Many of these standards are enforced or informed by the rules defined in the project's `.clinerules/` directory. Developers should familiarize themselves with those detailed rule sets. This document serves as a high-level summary and entry point.

## General Principles

*   **Clarity and Readability:** Code should be easy to understand. Use descriptive names for variables, functions, and components.
*   **Conciseness:** Write code that is to the point, avoiding unnecessary boilerplate or complexity.
*   **DRY (Don't Repeat Yourself):** Avoid duplicating code. Encapsulate reusable logic in functions, hooks, or services.
*   **Modularity:** Break down complex systems into smaller, manageable, and testable modules/components.
*   **Technical Accuracy:** Examples and code snippets should be accurate and reflect best practices.

## TypeScript Best Practices

*   **Strong Typing:**
    *   Strive for maximum type safety. Avoid the `any` type in application code.
    *   Use explicit types when inference is not sufficient.
    *   Define custom `interface` and `type` definitions as needed, often co-located in `.types.ts` files.
    *   Use `unknown` as a temporary placeholder for types that are genuinely unknown, with a TODO comment to resolve it.
*   **Readonly:** Use `readonly` for properties and arrays that should not be mutated after creation.
*   **Utility Types:** Leverage TypeScript's built-in utility types (`Partial`, `Required`, `Pick`, `Omit`, etc.).
*   **Import Standards:**
    *   No inline imports (`import()` within expressions).
    *   Organize imports: external libraries, then internal modules, then relative imports. Group type imports separately.
    *   Prefer path aliases (if configured) for cleaner imports from distant directories.
    *   Import only what is needed.

Refer to `.clinerules/04-typescript-best-practices.md` and `.clinerules/10-import-standards.md` for more details.

## ReactJS Best Practices

*   **Functional Components:** Exclusively use React functional components.
*   **Custom Hooks for Logic:** All significant component logic, local state, side effects, and event handlers MUST be encapsulated within custom React Hooks (e.g., `useMyComponentLogic.ts`). Component files (`.tsx`) should be primarily presentational.
*   **Props:** Define component props explicitly using interfaces or types. Avoid `React.FC`.
*   **Conditional Rendering:** Prefer React's conditional rendering (e.g., `{condition && <Element />}` or ternary operators) for showing/hiding elements over toggling CSS `visibility` or `display` properties.
*   **Component Reusability:** Prioritize creating small, focused, reusable components. Think in terms of composing UIs from these building blocks.
*   **Co-location:** Test files, TypeScript types, and Griffel style files are generally co-located with their respective component files.

Refer to `.clinerules/04-typescript-best-practices.md` (React section) and `.clinerules/09-component-reusability.md` for more details.

## XState (State Management)

*   **`setup` API:** Use XState v5's `setup` API for defining machines, as it provides superior type inference and organization.
*   **Explicit Typing:** Define clear TypeScript interfaces/types for machine `context` and `events` (e.g., in `MyMachine.types.ts`).
*   **Actor Model:** Structure complex features using multiple communicating machines (actors) for modularity and separation of concerns.
*   **Co-location for Implementations:** Guard functions and invoked actor logic should be in separate files, organized into `Guards` and `Services` subdirectories co-located with their machine definition.
*   **Comments:** Provide machine-level overviews and rationale for actor invocations as per `.clinerules/01-coding-standards.md`.

Refer to `.clinerules/03-xstate-typescript.md` and `.clinerules/06-xstate-structure.md` for more details.

## Styling (Griffel)

*   **Exclusive Use of Griffel:** All component-specific styling is done with `@griffel/react`.
*   **CSS Variables for Theming:** Theme values (colors, spacing, typography) are defined as JavaScript constants in `src/Theme/Tokens.ts` and exposed as CSS custom properties in `src/Theme/GlobalStyles.ts`.
*   **Usage:** Griffel `makeStyles` rules consume these CSS variables.
*   **No Inline Styles:** Avoid `style={{ ... }}` attributes.
*   **Units:** Prioritize relative units (`rem`, `em`) for scalability. Use `px` sparingly.
*   **Responsive Design:** Mobile-first approach using breakpoint tokens.

Refer to `.clinerules/08-styling-griffel.md` for detailed styling guidelines.

## File and Folder Naming Conventions

*   **Folders:** PascalCase (e.g., `MyComponent/`, `AuthMachine/`)
*   **Files:** PascalCase (e.g., `MyComponent.tsx`, `AppMachine.types.ts`)
    *   Guard files: `*.guard.ts` (e.g., `isUserAdmin.guard.ts`)
    *   Service/actor files: `*.service.ts` or `*.actor.ts` (e.g., `fetchUserProfile.service.ts`)

Refer to `.clinerules/01-coding-standards.md` and `.clinerules/06-xstate-structure.md`.

## Testing

*   Follow the testing workflow and strategies outlined in [TESTING.md](./TESTING.md) and `.clinerules/02-testing-strategy.md`.
*   Write unit tests for TDD where appropriate.
*   Generate Playwright tests for UI elements and user flows.

## Comments

*   Use comments judiciously to explain the 'why' behind non-obvious logic.
*   For XState machines, provide machine-level overviews and rationale for actor invocations.

Refer to `.clinerules/01-coding-standards.md`.

By adhering to these standards, we aim to create a high-quality, maintainable, and collaborative codebase for FableForge.
