# Frontend Architecture Rules (Next.js & React)

## 1. Next.js App Router Constraints

- **Server vs Client Components:** Default to Server Components. Use the `"use client"` directive ONLY when necessary (e.g., when using React hooks like `useState`, `useEffect`, or event listeners like `onClick`).
- **Data Fetching:** Prefer fetching data on the server (Server Components or Server Actions). Use Server Actions in `src/lib/actions.ts` for form submissions or mutations.
- **Routing:** Keep page components (`page.tsx`) minimal. They should primarily act as data-fetchers and layout wrappers, passing data to smaller, isolated UI components.

## 2. UI & Styling (Shadcn + Tailwind v4)

- **Component Library:** Strictly use **Shadcn UI** components located in `src/components/ui`. Do not build custom UI primitives (like buttons or dialogs) if a Shadcn equivalent exists.
- **Styling:** Use Tailwind CSS v4. Use utility functions like `cn()` (which combines `clsx` and `tailwind-merge`) for conditional class merging.
- Avoid heavy inline styles or creating separate CSS files unless absolutely necessary.

## 3. State Management & Hooks

- **Custom Hooks:** Extract complex component logic (especially related to form state, data formatting, or external interactions) into custom hooks located in `src/hooks`.
- **Single Responsibility:** A component should handle UI rendering. If a file contains a large amount of logic (e.g., filtering, mapping, and state updates), that logic MUST be moved to a custom hook.
- **Function Size Limits:** Maximum 10 logical conditions (`if/else`, `&&`, `||`) per function to prevent spaghetti code.

## 4. Forms & Validation

- **Forms:** Always use `react-hook-form` for complex forms (like the Quiz creation form).
- **Validation:** Use `zod` for all form validation. Schemas must be defined in `src/lib/schemas.ts` and shared between the client (form validation) and server (action validation).

## 5. File Structure

- Reusable UI elements go to `src/components`.
- Page-specific blocks or complex views go into feature-specific folders (e.g., `src/components/quiz/`).
