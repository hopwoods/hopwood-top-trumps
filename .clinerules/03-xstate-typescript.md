# XState v5 TypeScript Usage Guidelines

## Type Safety with Enhanced Inference

XState v5 offers significantly improved built-in TypeScript support, allowing for strong type safety often without the need for explicit `TypegenMeta` structures or separate `.typegen.ts` files common in earlier versions.

## Key Practices:

1.  **Explicit Context and Event Typing:**
    *   Define clear TypeScript interfaces or types for the machine's `context` (e.g., `AppContext`) and `events` (e.g., `AppEvent`). These should ideally be co-located with the machine definition or in a dedicated `.types.ts` file.

2.  **Typing Initial Context:**
    *   When providing the initial `context` in `createMachine`, use a type assertion (`as MyContext`) or the `satisfies` operator (`satisfies MyContext`) to ensure it conforms to your defined context interface. The `satisfies` operator is generally preferred as it validates the shape while still allowing for type widening if necessary.
    *   Example:
        ```typescript
        interface MyContext { count: number; }
        // ...
        createMachine({
          // ...
          context: { count: 0 } satisfies MyContext,
          // or context: { count: 0 } as MyContext,
        });
        ```

3.  **Leverage Inferred Types for Events, Actions, Guards, Services:**
    *   XState v5 is designed to infer types for events within `on` clauses, and for the `event` objects passed to actions, guards, and services.
    *   If more specific event typing is needed within implementations (actions, guards, etc.), you can type the `event` parameter explicitly.

4.  **Using the Setup API (Optional but Recommended for Complex Logic):**
    *   For defining actions, actors (services), and guards, consider using the second argument of `createMachine` (the `setup` API). This often provides the best type inference and organization for implementations.
    *   Example:
        ```typescript
        createMachine({ /* machine config */ }, {
          actions: {
            myAction: ({ context, event }) => { /* ... */ },
          },
          actors: { /* ... */ },
          guards: { /* ... */ },
        });
        ```

## Benefits:
*   Streamlined machine definitions with less boilerplate.
*   Robust autocompletion and type checking.
*   Errors caught at compile-time.
*   Increased confidence during refactoring.
