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

4.  **Using the `setup` API (Recommended for All Machines):**
    *   XState v5 introduces a `setup` function that is the recommended way to define all machine implementations (actors, actions, guards) and to provide strong typing for the machine's context, events, and other aspects.
    *   This API significantly improves type inference and helps avoid common TypeScript issues.
    *   The pattern is `setup({ types, actors, actions, guards }).createMachine({ ...machine configuration... })`.
    *   **`types` Property:** Use the `types` property within `setup` to provide TypeScript with hints about your machine's context, events, input, etc. This is crucial for good type safety.
        ```typescript
        import { setup } from 'xstate';
        import type { MyContext, MyEvent } from './MyMachine.types';

        const machine = setup({
          types: {} as {
            context: MyContext,
            events: MyEvent,
            // input: MyInputType, // If the machine accepts input
            // guards: { type: 'myGuardType', params: MyGuardParams }, // For typed guards
            // actions: { type: 'myActionType', params: MyActionParams }, // For typed actions
          },
          actors: {
            myActor: fromPromise(async () => { /* ... */ }),
          },
          actions: {
            myAction: ({ context, event }) => { /* ... */ },
          },
          guards: {
            myGuard: ({ context, event }) => { return true; },
          }
        }).createMachine({
          // ... machine configuration (id, initial, context, states)
          // Initial context values are provided here
          context: { /* initial context data */ } satisfies MyContext,
        });
        ```
    *   **Benefits of `setup`:**
        *   Superior type inference for all machine parts.
        *   Clear separation of machine configuration and implementation logic.
        *   Helps resolve complex TypeScript errors that can occur with the older two-argument `createMachine` pattern.
        *   Encourages co-location of implementations or clear import strategies if implementations are in separate files.

## General Benefits of Strong Typing in XState:
*   Streamlined machine definitions with less boilerplate.
*   Robust autocompletion and type checking.
*   Errors caught at compile-time.
*   Increased confidence during refactoring.
