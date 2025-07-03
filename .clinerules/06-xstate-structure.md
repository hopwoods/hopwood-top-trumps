## XState Machine Architecture and Structure

### Rationale for Using Multiple Communicating Machines (Actor Model)

While a single XState machine with parallel and child states can manage significant complexity, adopting a multi-machine architecture (leveraging XState's actor model) is often beneficial for larger applications or features with distinct domains. This approach promotes:

1.  **Modularity & Separation of Concerns:**
    *   Each machine (actor) handles a specific, well-defined responsibility (e.g., `appMachine` for global application state, `authMachine` for detailed authentication flows, `gameSetupMachine` for game initialization).
    *   This reduces the complexity of any single machine, making it easier to understand, develop, and debug.

2.  **Reusability:**
    *   Machines designed for common tasks (e.g., a generic form handling machine, a data fetching machine) can be spawned and reused across different parts of the application or even in other projects.

3.  **Testability:**
    *   Smaller, focused machines are significantly easier to test in isolation. Unit tests can verify each machine's logic independently.

4.  **Scalability & Maintainability:**
    *   **Targeted Changes:** Modifications to one feature (encapsulated in its machine) are less likely to introduce unintended side effects elsewhere.
    *   **Easier Extension:** New features can often be implemented as new, independent machines that integrate with existing ones, rather than making a monolithic machine even larger.
    *   **Improved Readability:** A system composed of several well-named, focused machines is generally easier for developers to navigate and comprehend.

5.  **Team Collaboration:**
    *   Clear boundaries between machines allow different developers or teams to work on separate parts of the state logic concurrently with reduced friction.

**When to Consider Multiple Machines:**
*   **Distinct Logical Domains:** When parts of your application represent clearly separate areas of responsibility (e.g., authentication vs. core gameplay vs. user profile management).
*   **Complex Individual Features:** If a single feature's state logic becomes overly large and difficult to manage within one machine definition.
*   **Need for Reusable State Logic:** When you identify patterns of stateful behavior that could be abstracted into a reusable machine.

The `AppMachine` in this project will serve as the root machine, orchestrating global concerns like initialization and authentication state. As more complex, distinct features are developed (e.g., deck building, active gameplay, AI art generation), they will be prime candidates for implementation as separate machines invoked or spawned by `AppMachine` or other relevant parent machines. This aligns with the actor model, where machines communicate by sending and receiving events.

### Organizing Machine Implementations (Guards, Actors, etc.)

To maintain clarity and modularity within individual XState machine definitions:

1.  **Separate Files for Implementations:**
    *   Each XState guard function should be defined in its own file.
    *   Each XState invoked actor (logic sourced via `fromPromise`, `fromObservable`, `fromCallback`, other machines, etc.) should be defined in its own file. The term "actor" is preferred over "service" for these implementations.

2.  **Co-located Folder Structure (Per-Machine):**
    *   These individual implementation files should be organized into dedicated subdirectories like `Guards` and `Actors`, co-located with the machine definition file they pertain to.
    *   **Example Structure:**
        ```
        src/
        └── Machines/
            └── SomeMachine/
            |   ├── SomeMachine.ts
            |   ├── SomeMachine.types.ts
            |   ├── Guards/
            |   │   ├── isUserAdmin.guard.ts
            |   │   └── canProceed.guard.ts
            |   └── Actors/  // For invoked promises, observables, callbacks, etc.
            |       ├── loadUserProfile.actor.ts
            |       └── submitForm.actor.ts
        ```

3.  **Naming Conventions:**
    *   Guard files should be named descriptively, ending with `.guard.ts` (e.g., `isUserAuthenticated.guard.ts`).
    *   Actor files (for invoked logic) should be named descriptively, ending with `.actor.ts` (e.g., `fetchGameSettings.actor.ts`).

### Driving UI State with Tags

To decouple UI components from the specific state names of a machine, use `tags`. A tag can be applied to multiple states, and the UI can check for the presence of a tag rather than a specific state name.

**Benefits:**
*   **Decoupling:** The UI doesn't need to know the exact state name (e.g., `creatingDeck`, `editingDeck`). It only needs to know if the machine is in *any* state that requires a certain UI (e.g., showing a form).
*   **Scalability:** If a new state is added that should also show the same UI, you only need to add the tag to the new state in the machine definition. No UI code changes are required.
*   **Readability:** It makes the UI's logic more declarative (e.g., `if (snapshot.hasTag('show-deck-form'))`).

**Example:**
```typescript
// In the machine definition
states: {
  creatingDeck: {
    tags: ['deck-form'],
    // ...
  },
  editingDeck: {
    tags: ['deck-form'],
    // ...
  }
}

// In the UI component/hook
const shouldShowForm = snapshot.hasTag('deck-form');
```
This approach is preferred for driving shared UI visibility from the state machine.
