# TypeScript and General Best Practices

## 1. Type Safety and `any` Type
*   **Strictly Avoid `any`:** The `any` type is strictly forbidden in application code. Maximum type safety is paramount. Do not use ESLint disable comments to bypass `any`-related type errors.
*   **Explicit Typing:** If types are not automatically inferred or are too broad, provide explicit types.
*   **Create Types/Interfaces:** Define custom types and interfaces as needed to accurately model data structures and function signatures.
*   **Placeholder Types (`unknown`):** If a type is genuinely unknown during initial development (e.g., awaiting an external API definition or complex third-party library integration), use `unknown` as a placeholder. This forces type checking and assertions before use. Add a `// TODO: [JIRA_TICKET/ISSUE_LINK] Refine this 'unknown' type once [reason]` comment to track and resolve it. The use of `unknown` should be temporary and actively managed.
*   **ESLint Disables for `any`:** Disabling ESLint rules related to `any` (e.g., `@typescript-eslint/no-explicit-any`) in application code is not permitted. Such issues must be resolved by providing proper types. (See `.clinerules/02-testing-strategy.md` for specific, limited exceptions in complex test mocks only).

## 2. DRY (Don't Repeat Yourself) Principle
*   **Reusable Logic:** Encapsulate reusable logic into functions, hooks, or services.
*   **Reusable Components:** Create reusable UI components.
*   **Constants:** Define constants for frequently used literal values instead of repeating them.
*   **Inheritance (for Types):** When defining types or interfaces, use inheritance (e.g., `extends` for interfaces, intersection types `&` for types) where appropriate to keep type definitions DRY and maintainable. For example, if multiple event types share common properties.

## 3. Avoid Magic Strings
*   **Use Constants/Enums:** For string literals that have specific meanings (e.g., event names, action types, keys for local storage, CSS class names if not using CSS-in-JS exclusively), define them as constants or use enums. This improves refactorability and reduces typos.
    *   Example for XState event names:
        ```typescript
        export const AppMachineEvents = {
          AUTH_STATUS_CHECK_COMPLETE: 'AUTH_STATUS_CHECK_COMPLETE',
          LOGIN_WITH_EMAIL: 'LOGIN_WITH_EMAIL',
          // ...
        } as const;

        // Usage: on: { [AppMachineEvents.LOGIN_WITH_EMAIL]: 'submitting' }
        ```

## 4. TypeScript Best Practices
*   **Readonly:** Use `readonly` for properties that should not be modified after an object's creation. Use `ReadonlyArray<T>` or `readonly T[]` for arrays that shouldn't be mutated.
*   **Utility Types:** Leverage TypeScript's built-in utility types (e.g., `Partial<T>`, `Required<T>`, `Pick<T, K>`, `Omit<T, K>`, `ReturnType<F>`) to create new types from existing ones in a DRY way.
*   **Function Overloads:** Use function overloads if a function can be called with different argument types and/or has different return types based on the input.
*   **Type Guards:** Implement type guards (e.g., `value is MyType`) for narrowing down types within conditional blocks.

## 5. ReactJS Specific Best Practices
*   **Functional Components:** Exclusively use React functional components.
*   **Mandatory Custom Hooks for Logic:** All component logic, local state management (e.g., form inputs, UI toggles not managed by a global XState machine), side effects (e.g., API calls not handled by XState actors), and event handlers MUST be encapsulated within custom React Hooks (e.g., `useMyComponentLogic.ts`).
    *   Component files (`.tsx`) MUST be primarily presentational. They should import and utilize their corresponding custom hook, receiving state and callback functions from it.
    *   The goal is a clear separation of concerns: hooks handle *how* things work, components handle *what* things look like.
    *   This promotes reusability, testability (hooks can be tested in isolation), and cleaner component code.
*   **Component Typing:** Define component props explicitly using interfaces or types. Avoid `React.FC`.
    *   Example:
        ```typescript
        interface MyComponentProps {
          title: string;
          isActive?: boolean;
        }

        const MyComponent = ({ title, isActive = false }: MyComponentProps) => {
          // ... component logic
        };
```
*   **Playwright Tests:** Generate Playwright tests for UI elements and user flows.
*   **Co-location:** Follow component co-location guidelines (tests, types, styles with components) as specified in `.clinerules/01-coding-standards.md` and prioritize creating reusable components as detailed in `.clinerules/09-component-reusability.md`.


## 6. General Coding Standards (as per existing instructions)
*   Concise, technical TypeScript with accurate examples.
*   Functional and declarative programming patterns; avoid classes where possible (except for error classes or specific library requirements).
*   Iteration and modularization over code duplication.
*   Descriptive variable names with auxiliary verbs (e.g., `isLoading`, `hasError`).
*   Always add comments to explain the "why" and "how" of non-obvious code.
*   Folder names: PascalCase.
*   File names: PascalCase.
