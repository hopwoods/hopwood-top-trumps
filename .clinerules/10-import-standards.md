# Import Standards and Best Practices

## 1. No Inline Imports

**RULE: Inline imports are strictly prohibited.**

Inline imports (using `import()` within expressions) make code harder to read, maintain, and debug. They also complicate TypeScript's type checking and can lead to unexpected behavior.

```typescript
// ❌ BAD: Using inline imports
return (event as import('./SomeFile').SomeType).property;

// ✅ GOOD: Import at the top of the file
import type { SomeType } from './SomeFile';
// ...later in code
return (event as SomeType).property;
```

## 2. Import Organization

1. **Group and Order Imports:**
   - External libraries first (React, XState, etc.)
   - Internal modules next (grouped by domain/feature)
   - Relative imports last (closest to furthest)
   - Separate groups with a blank line

2. **Type Imports:**
   - Use `import type` for type-only imports
   - Group type imports separately from value imports

```typescript
// External libraries
import { useState, useEffect } from 'react';
import { setup, assign } from 'xstate';

// Internal modules
import { someUtility } from '../../utils/helpers';

// Types
import type { AppContext, AppEvent } from './AppMachine.types';
import type { AuthenticationSuccessEventFromChild, AuthenticationFailureEventFromChild } from './AppMachine.types';
```

## 3. Import Naming

1. **Consistency:** Use consistent naming conventions for imports.
2. **Descriptiveness:** Use descriptive names that indicate the purpose or origin of the import.
3. **Avoid Renaming:** Avoid renaming imports unless necessary to prevent name collisions.

## 4. Path Aliases

When the project uses path aliases (configured in `tsconfig.json`), prefer using them for imports from distant directories to improve readability and maintainability.

```typescript
// ❌ Less readable with deep relative paths
import { Button } from '../../../Components/Common/Button/Button';

// ✅ More readable with path aliases
import { Button } from '@components/Common/Button/Button';
```

## 5. Import What You Need

Only import what you actually use. Avoid importing entire modules when you only need specific parts.

```typescript
// ❌ BAD: Importing the entire module
import * as React from 'react';
React.useState();

// ✅ GOOD: Importing only what you need
import { useState } from 'react';
useState();
```

By following these standards, we ensure code consistency, improve maintainability, and avoid common pitfalls associated with imports.
