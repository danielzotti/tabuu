---
trigger: always_on
---

# Tech Stack & Best Practices

This document outlines the technology stack used in the project and the best practices to follow during development.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/), [Radix UI](https://www.radix-ui.com/), [Shadcn/ui](https://ui.shadcn.com/)
- **State Management & Data Fetching**: [TanStack React Query](https://tanstack.com/query/latest)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Testing**: [Vitest](https://vitest.dev/), [Playwright](https://playwright.dev/)

## Project Organization & Standards

### Language & Documentation

- **Primary Language**: English is used for the entire codebase (variables, comments, documentation).
- **Commit Messages**: Use [Conventional Commits](https://www.conventionalcommits.org/).

### Component Development

- **Naming**: Use `kebab-case` for filenames and `PascalCase` for component function names.
- **Exports**: Use **named exports** instead of default exports.
- **Page Suffix**: Page components should have a `Page` suffix (e.g., `export function DashboardPage()`).

### Data Fetching & API

- Use **feature-based modules** in `src/features/{feature-name}`:
  - `{feature-name}.api.tsx`: Pure fetcher functions.
  - `{feature-name}.queries.tsx`: TanStack React Query hooks for getting data.
  - `{feature-name}.mutations.tsx`: TanStack React Query hooks for modifying data.
- **Route Handlers**: Use Next.js Route Handlers for internal API endpoints.

## Best Practices

1. **Type Safety**: Avoid `any`. Define interfaces and types in `{feature-name}.models.tsx` or shared folders.
2. **Modularity**: Keep components small and focused. Extract logic into custom hooks or feature-specific files.
3. **Performance**: Use Server Components where possible, and Client Components only when interactivity is required.
4. **Styling**: Use Tailwind utility classes. Avoid inline styles or raw CSS files unless strictly necessary (e.g., complex animations).
