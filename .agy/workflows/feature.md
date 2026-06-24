# Feature Creation Workflow

When executing a `/goal` to create a new feature, follow this exact sequence:

## For Mobile-Only Features (current scope)

Since the backend and frontend are already implemented, new work is focused exclusively on the **mobile** app.

1. **Analyze Context:** Read `.agy/rules/mobile.md` and `.agy/skills/quiz-domain.md`.
2. **Inspect Existing Mobile Code:** Before writing anything, open existing screens and hooks in `mobile/` and replicate their patterns exactly.
3. **Define Types First:** Ensure the TypeScript interfaces from `quiz-domain.md` are present in `mobile/src/lib/types.ts`.
4. **Hook First:** Implement the data-fetching or form logic in a custom hook under `mobile/src/hooks/`.
5. **Build the Screen:** Create the screen in `mobile/app/`. Keep it thin — only layout and rendering.
6. **Build UI Components:** Place reusable pieces in `mobile/src/components/` (feature blocks) or `mobile/src/components/ui/` (primitives).
7. **Verification:** Check for TypeScript errors. Confirm NativeWind classes render correctly.

## For Full-Stack Features

1. **Backend First:** Update Prisma schema → Service → Controller.
2. **Frontend Integration:** Server Actions → Hook → UI (Shadcn components).
3. **Mobile Integration:** API hook → Screen → NativeWind UI.
4. **Verification:** TypeScript check across the monorepo.
