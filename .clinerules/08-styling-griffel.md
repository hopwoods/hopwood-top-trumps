# Styling with Griffel and CSS Variables

## 1. Griffel for Component Styling
*   **Exclusive Use:** All component-specific styling MUST be implemented using Griffel (`@griffel/react`).
    *   Utilize `makeStyles()` for creating style rules.
    *   Use `mergeClasses()` when conditional or combined class names are necessary.
    *   **Shorthands vs. Longhands:** Prefer direct CSS longhand properties (e.g., `paddingTop`, `marginLeft`, `borderStyle`, `borderRadius`) over Griffel's generic `shorthands.*` helper if the shorthand is deprecated or causes TypeScript/linting issues (e.g., `shorthands.padding`, `shorthands.border`). Some specific shorthands like `shorthands.borderColor` might be acceptable if they are not deprecated and work well with type checking. When in doubt, explicit longhand properties are safer.
*   **No Inline Styles:** Avoid using inline `style={{ ... }}` attributes on React components. All dynamic styling should be achievable through Griffel's class generation.
*   **No Component-Specific CSS Files:** Do not create separate `.css`, `.scss`, or `.less` files for individual components. Styling logic should be co-located with the component, typically in a `Component.styles.ts` file or directly within the component's `.tsx` file if the styles are minimal and highly specific.
    *   `src/index.css` is an exception for global `@fontsource` imports and very minimal, truly global resets if not covered by `GlobalStyles.ts`.

## 2. Theming with CSS Variables and Tokens
*   **Centralized Tokens:** All theme-related values (colors, typography, spacing, radii, shadows, etc.) MUST be defined as JavaScript constants in `src/Theme/Tokens.ts`.
*   **CSS Variables:** These tokens MUST be translated into CSS custom properties (variables) in `src/Theme/GlobalStyles.ts` using Griffel's `makeStaticStyles` on the `:root` element.
    *   Adopt a consistent naming convention for CSS variables (e.g., `--hopwood-color-primary`, `--hopwood-spacing-m`).
*   **Usage in Griffel:** Griffel `makeStyles` rules MUST reference these CSS variables for all themeable properties.
    *   Example: `backgroundColor: 'var(--hopwood-color-background-surface)'`
    *   Example: `padding: 'var(--hopwood-spacing-m)'`

## 3. File Structure and Co-location
*   **Theme Directory:** All core theming files (tokens, global static styles, theme provider) reside in `src/Theme/`.
*   **Component Styles:**
    *   For components with more than a few simple style rules, create a co-located `MyComponent.styles.ts` file. This file will export the result of `makeStyles()`.
        ```
        // src/Components/MyComponent/MyComponent.styles.ts
        import { makeStyles } from '@griffel/react';

        export const useMyComponentStyles = makeStyles({
          root: {
            backgroundColor: 'var(--fableforge-color-primary)',
            padding: 'var(--fableforge-spacing-m)',
          },
          // ... other slots
        });
        ```
    *   For very simple components, `makeStyles` can be defined directly within the `.tsx` file.

## 4. Scalable Units
*   **Root Font Size:** `src/Theme/GlobalStyles.ts` defines a scalable root `font-size` (e.g., using `clamp()`).
*   **Relative Units:** All typography-related CSS properties (e.g., `font-size` in components, `padding`, `margin`, `line-height` where contextually appropriate) should primarily use `rem` units (relative to the root font size) or `em` units (relative to the parent element's font size) to ensure proper scaling and accessibility. Fixed `px` values should be used sparingly and only when a non-scalable dimension is explicitly required.

## 5. Accessibility
*   Ensure sufficient color contrast by defining accessible color combinations in `src/Theme/Tokens.ts` and using them appropriately.
*   Leverage relative units for text to respect user's browser font size preferences.

By adhering to these rules, we ensure a consistent, maintainable, and themeable styling architecture across the application.
