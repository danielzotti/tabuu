---
trigger: model_decision
description: When working on Next API
---

# Standardize Next.js API Routes to use NextRequest

All Next.js API route handlers in this project must use `NextRequest` from `next/server` for the request parameter instead of the standard `Request`.

## Rationale

- **Next.js Features**: `NextRequest` provides built-in methods for handling cookies, headers, and query parameters (e.g., `request.nextUrl`).
- **Consistency**: Maintaining a single way to handle requests across all API routes improves maintainability.
- **Better Developer Experience**: Provides better type safety and utility methods specific to the Next.js environment.

## Requirements

1. **Parameter Type**: The first parameter of a route handler (GET, POST, PUT, DELETE, etc.) should be typed as `NextRequest`.
2. **Import**: `NextRequest` must be imported from `next/server`.

## Examples

### Correct Usage

```typescript
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  // ... logic
  return NextResponse.json({ message: 'Success' });
}
```

### Incorrect Usage

```typescript
// Avoid using the standard Request object
export async function GET(request: Request) {
  // ... logic
}
```
