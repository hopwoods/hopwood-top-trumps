## TypeScript Type Definition Co-location

1.  **Co-located Type Files:**
    *   All TypeScript type definitions (interfaces, types, enums) that are specific to a single component, module, or XState machine should be placed in a separate, co-located `.types.ts` file.
    *   For example, if you have `src/Components/MyComponent.tsx`, its specific types would go into `src/Components/MyComponent.types.ts`.
    *   Similarly, for `src/Machines/MyMachine.ts`, its specific types would go into `src/Machines/MyMachine.types.ts`.

2.  **Shared/Global Types:**
    *   Types that are shared across multiple, unrelated parts of the application can be placed in a more centralized directory, such as `src/Types/`.
    *   Use this sparingly and prefer co-location when types are tightly coupled to a specific module.
