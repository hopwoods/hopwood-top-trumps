# Theme and Styling Documentation

This section outlines the theming and styling architecture of the FableForge application, primarily using Griffel for CSS-in-JS and CSS Custom Properties for dynamic theming.

## Core Styling Philosophy

*   **Griffel for Component Styles:** All component-specific styling is implemented using `@griffel/react`. This provides type-safe styles, atomic CSS generation for performance, and a clear way to define styles co-located with components (often in `Component.styles.ts` files).
*   **CSS Custom Properties for Theming:** Dynamic theming (e.g., colors, spacing, typography, radii) is achieved through CSS Custom Properties (variables).
*   **Centralized Design Tokens:** All design tokens (raw values for colors, font sizes, spacing units, etc.) are defined as JavaScript constants in `src/Theme/Tokens.ts`.
*   **Global Styles:** The tokens are translated into CSS Custom Properties on the `:root` element in `src/Theme/GlobalStyles.ts` using Griffel's `makeStaticStyles`. This makes them available globally.
*   **Usage in Components:** Griffel `makeStyles` in components reference these CSS variables (e.g., `backgroundColor: 'var(--fableforge-color-primary)'`).
*   **Responsive Design:** A mobile-first approach is generally preferred, using `rem` and `em` units for scalability, and predefined breakpoint tokens for media queries.

## Key Files and Structure

*   **`src/Theme/Tokens.ts`**:
    *   Defines all fundamental design tokens as JavaScript constants (e.g., `colorTokens`, `typographyTokens`, `spacingTokens`, `breakpointTokens`).
    *   This is the single source of truth for themeable values.

*   **`src/Theme/GlobalStyles.ts`**:
    *   Uses Griffel's `makeStaticStyles` to apply global styles.
    *   Translates tokens from `Tokens.ts` into CSS Custom Properties on the `:root` element.
        *   Example: `--fableforge-color-primary: ${colorTokens.brandPrimary};`
    *   Includes global resets, base body styling (like background color, default font), and potentially a scalable root `font-size` (e.g., using `clamp()`).

*   **`src/Theme/GriffelProvider.tsx` (if it exists, or equivalent setup)**:
    *   The root component that provides the Griffel renderer and theme context to the application if advanced Griffel theming features are used (beyond CSS variables). Often, `makeStaticStyles` for CSS variables is sufficient.

*   **Component Style Files (e.g., `src/Components/MyComponent/MyComponent.styles.ts`)**:
    *   Use `makeStyles()` from `@griffel/react`.
    *   Rules within `makeStyles` should consume the CSS variables defined in `GlobalStyles.ts`.
        *   Example: `root: { color: 'var(--fableforge-color-text-primary)', padding: 'var(--fableforge-spacing-m)' }`
    *   Prefer CSS longhand properties over Griffel shorthands if shorthands are deprecated or cause issues.

## Theming Principles

*   **Consistency:** Using a token-based system ensures visual consistency across the application.
*   **Maintainability:** Changes to the theme (e.g., updating a brand color) can be made in `Tokens.ts`, and these changes will propagate throughout the app.
*   **Scalability:** The system is designed to easily accommodate new tokens or theme variations if needed in the future.
*   **Performance:** Griffel's atomic CSS generation helps keep stylesheet sizes small.

## Responsive Design

*   **Units:** Prioritize relative units (`rem`, `em`) for layout and typography to ensure scalability and respect user font size preferences. Use `px` sparingly for elements that should not scale (e.g., borders).
*   **Breakpoints:** Utilize breakpoint tokens defined in `Tokens.ts` for consistent media queries.
*   **Mobile-First:** Styles are generally written for mobile viewports first, with overrides for larger screens using `min-width` media queries.

## Example Workflow for Adding a New Themed Style

1.  **Define Token (if new):** If the value isn't already a token, add it to `src/Theme/Tokens.ts` (e.g., a new color or spacing unit).
2.  **Expose as CSS Variable:** In `src/Theme/GlobalStyles.ts`, add a new CSS Custom Property that uses this token.
    ```typescript
    // In GlobalStyles.ts
    ':root': {
      // ... other variables
      '--fableforge-new-custom-property': newTokenValue,
    }
    ```
3.  **Use in Component Style:** In your component's `.styles.ts` file, use the new CSS variable.
    ```typescript
    // In MyComponent.styles.ts
    import { makeStyles } from '@griffel/react';
    export const useMyComponentStyles = makeStyles({
      someElement: {
        property: 'var(--fableforge-new-custom-property)',
      },
    });
    ```

This systematic approach ensures that all themeable aspects of the application are managed centrally and applied consistently.
