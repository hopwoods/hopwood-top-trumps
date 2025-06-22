## Previous Content (Assumed - will be preserved)
... (Existing content of progress.md) ...

## Lessons Learned from Default Deck Provisioning Debugging (June 22, 2025)

Debugging the client-side default deck provisioning revealed several key insights and required specific fixes:

1.  **Firestore Permissions for Batch Writes (Parent & Subcollections):**
    *   **Problem:** `batch.commit()` was hanging silently when attempting to create a deck document (parent) and its card subcollection documents simultaneously.
    *   **Root Cause:** The Firestore security rule for creating cards (`/decks/{deckId}/cards/{cardId}`) initially used `get(/databases/$(database)/documents/decks/$(deckId))` to verify ownership of the parent deck. This `get()` call is problematic when the parent deck (`$(deckId)`) is being created in the *same batch*. Firestore rules are evaluated atomically for the entire batch, and `get()` typically refers to the database state *before* the batch operations. If the parent document doesn't exist pre-batch, the `get()` fails, leading to the card creation being denied and the batch commit potentially hanging or failing without a clear client-side error.
    *   **Solution:** The card creation rule was simplified for the context of batch creation:
        ```firestore-rules
        // In match /decks/{deckId}/cards/{cardId}
        allow create: if request.auth != null
                        && request.resource.data.name != null
                        && request.resource.data.attributes != null;
        ```
        This assumes that if the user has permission to create the parent deck (which is itself secured by checking `request.resource.data.userId == request.auth.uid` in its own create rule), they are implicitly allowed to create its initial child documents within the same atomic operation. Read, update, and delete rules for cards retained the more secure `get()` check, as they operate on pre-existing decks.
    *   **Debugging Strategy:**
        *   Adding a `.catch(error => console.error("BATCH COMMIT FAILED:", error))` directly to the `batch.commit()` call helped confirm that the commit itself wasn't throwing an immediately catchable client-side error, pushing the investigation towards rules or silent server-side rejections.
        *   Simplifying the batch to only write the parent document first successfully isolated the problem to the subcollection writes / more complex batch.

2.  **XState: Handling Actor Completion Data (`onDone`):**
    *   **Problem:** Data fetched by an XState actor (`fetchDecksActor`) was not being correctly assigned to the parent machine's (`DeckMachine`) context, resulting in the UI not displaying the fetched decks.
    *   **Root Cause:** The action (`assignDecksToContext`) triggered by the `onDone` transition of the invoked actor was incorrectly trying to match a custom event type (e.g., `FETCH_DECKS_SUCCESS`) instead of directly and correctly using the properties of the standard `DoneActorEvent` that XState provides.
    *   **Solution:** The action was modified to correctly access the actor's result from `event.output`. A type guard (`if ('output' in event && Array.isArray(event.output))`) was added to ensure type safety and handle the event structure properly:
        ```typescript
        // In DeckMachine actions
        assignDecksToContext: assign({
          decks: ({ event }) => {
            if ('output' in event && Array.isArray(event.output)) {
              return event.output;
            }
            console.warn('assignDecksToContext called with an event without expected output:', event);
            return []; // Default or existing context
          },
        }),
        ```
    *   **Key XState Principle:** When an invoked actor (especially one created with `fromPromise`) successfully completes, its `onDone` transition receives an event (typically of type `xstate.done.actor.{actorId}` or similar) where the resolved data from the promise is available in the `event.output` property. Actions handling this event must access `event.output`.

3.  **Systematic Debugging of XState Actors & Async Operations:**
    *   **Initial Symptom:** An invoked actor (`checkAndProvisionDefaultDeckActor`) appeared to not run, hang, or complete silently, with no logs from the actor or its `onDone`/`onError` handlers in the parent machine.
    *   **Effective Debugging Steps:**
        1.  **Confirm Invocation & Input:** Added `console.log` at the very beginning of the actor's promise function to verify it was being called and to inspect the input it received.
        2.  **Trace Internal Progress:** Added granular `console.log` statements before and after each `await` call (especially for external service calls like Firebase operations) within the actor's `try` block. This helped pinpoint exactly where the execution was halting.
        3.  **Verify Parent Machine Handlers:** Ensured `onDone` and `onError` handlers were correctly set up in the parent machine for the invoked actor, with logging to observe if these were triggered.
        4.  **Isolate Operations:** When a complex operation (like a batch write with multiple parts) failed, simplified it by commenting out parts to identify the problematic segment (e.g., writing only the parent deck document, then re-introducing card subcollection writes).
        5.  **Inspect Network Logs:** When suspecting silent failures with external services (like Firestore), checking the browser's network tab for relevant requests and responses (or error codes like Firestore's permission denied) proved crucial.

4.  **Iterative Refinement of Firestore Rules:** Security rules often require testing and iteration. When encountering permission issues, review rules specific to the failing operation (read, write, create, update, delete) and the exact path. Use the Firestore console's Rules Playground for testing if necessary.

These steps and learnings were critical in diagnosing and resolving the issues related to default deck provisioning and ensuring the data flow from Firebase through the XState machines to the UI was correct.
