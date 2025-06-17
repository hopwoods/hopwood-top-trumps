## Task Completion and Build Integrity

1.  **Build Before Completion:**
    *   Before considering a development task complete and using the `attempt_completion` tool, always ensure the project builds successfully.
    *   Run the project's build command (e.g., `pnpm build`, `npm run build`).

2.  **Resolve Build and Critical Lint Errors:**
    *   All errors reported during the build process must be resolved.
    *   Critical linting errors that prevent a clean build or indicate significant code quality issues should also be fixed.

3.  **No Completion on Failure:**
    *   Do not use the `attempt_completion` tool if the project fails to build or has outstanding critical errors. The primary goal is to deliver working, stable code.
    *   If errors persist, document them and discuss potential solutions or necessary changes in the task scope.
