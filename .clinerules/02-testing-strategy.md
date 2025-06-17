## Testing Workflow
- Run the full tests suite `pnpm test`
- Record all faling test files
- Fix tests in each file in isolation
- once all tests for a given file are passing, record any lessons learnt in the memory bank and commit
- once all tests are passing, run a build `pnpm build`
- fix any buuild issues
- once the project is building and all tests pass save any lessons learnt to the memory bank and commit

## Handling ESLint `no-unsafe-*` Rules in Test Files

When working with complex mocks, particularly for hooks or external modules (e.g., in Vitest), ESLint's type-aware `no-unsafe-assignment`, `no-unsafe-member-access`, and `no-unsafe-call` rules may sometimes flag code that is functionally correct and type-safe at runtime but difficult for static analysis to fully verify within the mock's context.

**Strategy:**

1.  **Prioritize Type Safety:** Always strive to make mocks as type-safe as possible. Use specific types for mock function parameters and return values.
2.  **Verify Functionality:** Ensure that unit tests for the component pass comprehensively, covering all relevant states and interactions related to the mocked functionality.
3.  **Confirm Build Success:** Ensure the project builds successfully (`pnpm build`), as the TypeScript compiler is the ultimate arbiter of type correctness.
4.  **Judicious Disabling:** If, after the above steps, persistent "unsafe" ESLint warnings remain in a test file due to the intricacies of the mock setup, it may be acceptable to use file-level ESLint disable comments for these specific rules (e.g., placed at the top of the `.test.tsx` file):
    ```typescript
    /* eslint-disable @typescript-eslint/no-unsafe-assignment */
    /* eslint-disable @typescript-eslint/no-unsafe-member-access */
    /* eslint-disable @typescript-eslint/no-unsafe-call */
    ```
5.  **Scope:** This approach should be limited to test files and used only when the warnings are deemed to be false positives or overly cautious for a well-tested, functionally correct mock. The main application codebase should maintain stricter adherence to these ESLint rules.
6.  **Documentation:** If such disables are used, it's good practice to briefly comment why if the reason isn't immediately obvious from the mock's complexity.
