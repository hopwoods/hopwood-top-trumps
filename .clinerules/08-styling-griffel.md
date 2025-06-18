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

    The `Button` component in `src/Components/Common/Button/` should now be considered the standard way to style buttons, using the principles outlined above.

## 4. Scalable Units and Responsive Design
*   **Root Font Size:** `src/Theme/GlobalStyles.ts` defines a scalable root `font-size` (e.g., using `clamp()`). This is the basis for `rem` units.
*   **Prioritize Relative Units (`em`, `rem`):**
    *   For layout dimensions (widths, heights, padding, margins, etc.) that should scale proportionally with text size and respond to user font preferences, `em` units (relative to the current element's font size) or `rem` units (relative to the root font size) MUST be prioritized.
    *   This ensures that as the base font size changes (e.g., due to viewport width via `clamp()` or user accessibility settings), the layout scales harmoniously.
*   **Viewport Units (`vw`, `vh`):**
    *   Use `vw` (viewport width) and `vh` (viewport height) units for dimensions that need to be directly relative to the viewport size (e.g., full-width hero sections, or ensuring a container takes up 95% of the viewport width on mobile as seen in `AuthPage.styles.ts`).
*   **Fixed Units (`px`):**
    *   Use `px` units sparingly. They are appropriate for elements that should not scale with font size, such as:
        *   Borders (e.g., `border: 1px solid ...`).
        *   Fine-grained adjustments where a precise, non-scalable dimension is critical (e.g., icon sizes if they are not meant to scale with text, specific offsets).
        *   Maximum or minimum widths/heights that define hard limits not meant to be relative to font size (though `em` can also be used here if the limit *should* be font-relative).
*   **Breakpoint Tokens:**
    *   Responsive design MUST utilize predefined breakpoint tokens from `src/Theme/Tokens.ts` (e.g., `breakpointTokens.tablet`).
    *   These tokens provide consistent media query thresholds across the application.
*   **Mobile-First Approach:**
    *   Styles should generally be written for mobile (smallest viewports) first.
    *   Use `min-width` media queries to add or override styles for larger viewports (tablet, desktop). Alternatively, `max-width` queries can be used to apply styles *up to* a certain breakpoint, as demonstrated in recent `AuthPage` adjustments. Choose the approach that leads to cleaner and more maintainable CSS for the specific component.
*   **Layout Techniques:**
    *   Utilize modern CSS layout techniques like Flexbox and Grid for structuring components and pages.
    *   Ensure layouts are fluid and adapt gracefully to different screen sizes and content variations.
    *   For common layout patterns like centered content or card layouts, establish consistent styling approaches (e.g., the `AuthPage` "card" pattern).

## 5. Accessibility
*   Ensure sufficient color contrast by defining accessible color combinations in `src/Theme/Tokens.ts` and using them appropriately.
*   Leverage relative units for text to respect user's browser font size preferences.

By adhering to these rules, we ensure a consistent, maintainable, and themeable styling architecture across the application.
