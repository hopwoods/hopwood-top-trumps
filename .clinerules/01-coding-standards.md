## Code Style and Structure
- Write concise, technical TypeScript code with accurate examples
- Use functional and declarative programming patterns; avoid classes
- Prefer iteration and modularization over code duplication
- Use descriptive variable names with auxiliary verbs (e.g., isLoading, hasError)
- Co-locate test files, typescript type files, and CSS (Griffel CSS in JS files) with the react component files
- folders should be name using Pascal Case
- files should be name using Pascal Case

## Comments

1.  **General Code Comments:**
    *   Comments should be used judiciously. For general code, primarily explain the **'why'** behind non-obvious logic.
    *   Avoid commenting on the **'how'** if the code is self-explanatory and its implementation is clear.
    *   The goal is to enhance understanding without cluttering the codebase.

2.  **Commenting XState Machines:**
    *   **Machine-Level Overview:** At the beginning of each machine definition (e.g., in a comment block above `createMachine`), provide a concise overview of:
        *   The machine's **primary responsibility** (e.g., "Manages the user authentication flow, including login, registration, and session checking.").
        *   Its **role within the application** or its relationship to a parent machine if it's an invoked/spawned actor (e.g., "This machine is invoked by the AppMachine when an unauthenticated user attempts to access protected routes.").
    *   **Actor Invocation Rationale:** When a machine invokes or spawns another actor (which is itself a machine):
        *   Include a comment explaining **why this specific actor is being invoked/spawned** at that particular point in the parent machine's flow.
        *   Describe the **purpose the child/spawned actor serves** in achieving the parent machine's current goal (e.g., "// Invoke the paymentProcessingMachine to handle the checkout steps.").
        *   This is crucial for understanding inter-machine communication, delegation of responsibilities, and the overall state flow.
    *   **Complex States/Transitions:** For particularly complex states or transitions within a machine that aren't immediately obvious, add brief comments to clarify the logic or the conditions leading to them, focusing on the 'why'.
