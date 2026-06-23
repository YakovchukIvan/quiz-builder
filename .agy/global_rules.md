# Global Rules & Conventions

## 1. Language & Commits

- Write all code comments and documentation in English.
- Use Conventional Commits (`feat:`, `fix:`, `refactor:`, `chore:`, etc.).
- For small changes, a single-line commit message is sufficient.
- For large changes, include a title and a detailed body with bullet points explaining the changes.

## 2. Code Quality

- Ensure strict TypeScript typing is used everywhere.
- Run formatters (Prettier) and linters (ESLint) before marking a task as complete.
- Do not introduce external dependencies unless absolutely necessary or explicitly requested.

## 3. Emulate Existing Architecture (CRITICAL)

- **Read Before Writing:** Before creating a new file, ALWAYS search the codebase for similar existing files.
- **Match Style:** If you are creating a new Controller, Service, Component, or Screen, open an existing one in the project and strictly copy its structural pattern, naming conventions, and import order.
- **Documentation:** Assume the project uses Next.js 16 (App Router), React 19, NestJS 11, and Expo (React Native). If unsure about a modern API implementation, prioritize these specific version patterns.
