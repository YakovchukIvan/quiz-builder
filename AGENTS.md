# Project Context & Agent Rules: Quiz Builder

## 1. System Overview

You are an expert Full-Stack Engineer working on a **Quiz Builder** platform.

- **Backend:** NestJS (v11), Prisma ORM, PostgreSQL.
- **Frontend:** Next.js (16.2 App Router, React 19), TypeScript, Tailwind CSS (v4), **Shadcn UI**.
- **Mobile:** Expo SDK 54 (React Native 0.81), TypeScript, NativeWind v4, Tailwind CSS (v3).

## 2. Context & Routing Rules (CRITICAL)

Before executing any `/goal`, generating code, or modifying files, you MUST read the instruction files below:

- **Global Rules & Emulation:** Read `.agy/global_rules.md`
- **Frontend Architecture (Next.js, Shadcn):** Read `.agy/rules/frontend.md`
- **Mobile Architecture (React Native, Expo):** Read `.agy/rules/mobile.md`
- **Backend Architecture (NestJS):** Read `.agy/rules/backend.md`
- **Business Logic & Domain Skills:** Read `.agy/skills/quiz-domain.md`
- **Execution Workflow:** Read `.agy/workflows/feature.md`

## 3. Core Developer Constraints

- **Emulate Existing Code:** Before creating new endpoints, components, or screens, inspect existing files in `src/` and strictly replicate their architectural patterns, naming conventions, and DTO structures. Do not invent new patterns.
- **Strict TypeScript:** Absolutely no `any`.
- **Keep UI Simple:** Rely entirely on Shadcn UI (for web), NativeWind (for mobile). Tailwind v4 on web. Tailwind v3 on mobile (NativeWind v4 does not support Tailwind v4).
- **Modularity:** Ensure a clean separation of concerns across Backend (Controller->Service), Frontend (Component->Hook), and Mobile (Screen->Hook).
