# The Author's Nexus — Component Directory

This directory contains all React components, organized by concern:

- `ui/` — Generic UI primitives (Button, Card, Modal, etc.) — realm-aware via CSS variables
- `realm/` — Realm-specific components (AtelierHero, LibraryShelf, etc.)
- `layout/` — Layout chrome (Header, Footer, Navigation)

## Rules

1. **No hardcoded colors.** All colors via `var(--color-*)` CSS custom properties.
2. **Server Components by default.** Add `'use client'` only when strictly needed.
3. **Accessibility first.** Every interactive element must have ARIA labels, keyboard support, focus rings.

Components are built sprint by sprint. This directory is intentionally empty in Sprint 0.
