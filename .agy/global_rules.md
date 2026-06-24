# Global Rules & Conventions

## 1. Language & Commits

- Write all code comments and documentation in English.
- Use Conventional Commits (`feat:`, `fix:`, `refactor:`, `chore:`, etc.).
- For small changes, a single-line commit message is sufficient.
- For large changes, include a title and a detailed body with bullet points explaining the changes.

## 2. Code Quality

- Ensure strict TypeScript typing is used everywhere. Absolutely no `any`.
- Run formatters (Prettier) and linters (ESLint) before marking a task as complete.
- Do not introduce external dependencies unless absolutely necessary or explicitly requested.

## 3. Emulate Existing Architecture (CRITICAL)

- **Read Before Writing:** Before creating a new file, ALWAYS search the codebase for similar existing files.
- **Match Style:** If you are creating a new Controller, Service, Component, or Screen, open an existing one in the project and strictly copy its structural pattern, naming conventions, and import order.
- **Documentation:** The project uses Next.js 16 (App Router), React 19, NestJS 11, and Expo SDK 54 (React Native 0.81). If unsure about a modern API implementation, prioritize these specific version patterns.

## 4. Monorepo Structure

```bash
quiz-builder/
├── backend/       # NestJS 11, Prisma 7, PostgreSQL
├── frontend/      # Next.js 16, React 19, Tailwind CSS v4, Shadcn UI
├── mobile/        # Expo SDK 54, React Native 0.81, NativeWind v4, Tailwind CSS v3
└── .agy/          # Agent rules and workflows
```
