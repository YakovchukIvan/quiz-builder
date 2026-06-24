# Frontend Architecture Rules (Next.js & React)

## 1. Stack

- **Framework:** Next.js 16.2 (App Router)
- **Runtime:** React 19.2
- **Styling:** Tailwind CSS v4 + Shadcn UI
- **Forms:** react-hook-form v7 + Zod v4
- **Language:** TypeScript 5

## 2. Next.js App Router Constraints

- **Server vs Client Components:** Default to Server Components. Use `"use client"` ONLY when necessary (hooks, event listeners).
- **Data Fetching:** Prefer fetching on the server. Use Server Actions in `src/lib/actions.ts` for mutations.
- **Routing:** Keep `page.tsx` minimal — data-fetching and layout only. Pass data to isolated UI components.

## 3. UI & Styling (Shadcn + Tailwind v4)

- **Component Library:** Strictly use Shadcn UI components from `src/components/ui`. Do not build custom primitives if a Shadcn equivalent exists.
- **Styling:** Tailwind CSS v4 utilities. Use `cn()` (clsx + tailwind-merge) for conditional class merging.
- Avoid inline styles or separate CSS files unless absolutely necessary.

## 4. State Management & Hooks

- **Custom Hooks:** Extract complex logic into `src/hooks/`.
- **Single Responsibility:** Components handle UI only. Logic (filtering, mapping, state) goes to hooks.
- **Function Size:** Maximum 10 logical conditions per function.

## 5. Forms & Validation

- **Forms:** Always use `react-hook-form` for complex forms.
- **Validation:** Zod schemas defined in `src/lib/schemas.ts`, shared between client and server actions.

## 6. File Structure

```bash
frontend/src/
├── app/              # Next.js App Router pages
├── components/
│   ├── ui/           # Shadcn primitives
│   └── quiz/         # Feature-specific blocks
├── hooks/            # Custom hooks
└── lib/
    ├── actions.ts    # Server Actions
    └── schemas.ts    # Zod schemas
```
