# Feature Creation Workflow

When executing a `/goal` to create a new feature, follow this exact sequence:

1. **Analyze Context:** Read the relevant rules from `.agy/rules/` and domain logic from `.agy/skills/`.
2. **Backend First:** - Define or update Prisma models if necessary.
   - Create shared DTOs/interfaces.
   - Implement the NestJS Service logic.
   - Expose the Endpoint in the Controller.
3. **Frontend Integration:**
   - Define Zod schemas and Next.js Server Actions (`src/lib/actions.ts`) to communicate with the backend.
   - Extract UI logic into a custom hook (`src/hooks`).
   - Build the UI using Shadcn components (`src/components`).
4. **Verification:** Check for TypeScript errors across the monorepo.
