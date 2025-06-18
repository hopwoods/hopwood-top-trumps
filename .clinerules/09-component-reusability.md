# Component Reusability and Composability

## 1. Prioritize Reusable Components
*   **Identify Patterns:** Actively look for repeating UI patterns, structures, or pieces of logic that can be extracted into reusable components.
*   **DRY (Don't Repeat Yourself):** Avoid duplicating similar JSX structures or styling across multiple components. Instead, create a common, configurable component.
*   **Atomic Design Principles (Consideration):** While not strictly enforcing Atomic Design, think in terms of building smaller, focused components (atoms, molecules) that can be composed into larger structures (organisms, templates, pages).

## 2. Design for Composability
*   **Props for Configuration:** Design components to be configurable through props. Prefer passing data and callbacks down rather than having components fetch their own data or manage overly complex internal state if that state is relevant elsewhere.
*   **`children` Prop:** Utilize the `children` prop effectively to allow content to be injected into components, making them more flexible (e.g., a generic `Card` or `Modal` component).
*   **Slots:** For more complex components where `children` might not be enough, consider using named slots (e.g., by accepting specific components or render props for different sections like `header`, `footer`).

## 3. Co-location and Structure for Common Components
*   Place broadly reusable UI components (e.g., `Button`, `Input`, `Modal`, `Card`) in a shared directory like `src/Components/Common/` or `src/Components/UI/`.
*   Each reusable component should typically have its own folder containing its `.tsx` file, `.styles.ts`, `.types.ts`, and `.test.tsx` files.

## 4. Benefits
*   **Maintainability:** Changes to a UI element or piece of logic only need to be made in one place.
*   **Consistency:** Ensures a consistent look, feel, and behavior across the application.
*   **Testability:** Smaller, focused components are easier to unit test.
*   **Readability:** Reduces code duplication and makes the codebase easier to understand.
*   **Development Speed:** Speeds up future development as existing building blocks can be reused.

## Example Candidates for Reusable Components:
*   Buttons (with variants)
*   Input fields (with labels, error handling)
*   Modals / Dialogs
*   Cards / Panels
*   Loading Spinners / Indicators
*   Typography elements (e.g., PageTitle, SectionHeader)
*   Form elements (e.g., Form, FormGroup)

By consistently applying these principles, we aim for a more robust, scalable, and developer-friendly codebase.
