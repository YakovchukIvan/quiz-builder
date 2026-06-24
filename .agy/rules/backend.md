# Backend Architecture Rules (NestJS)

## 1. Stack

- **Framework:** NestJS 11
- **ORM:** Prisma 7 with `@prisma/adapter-pg` (adapter-based PrismaClient init — see Prisma 7 breaking changes)
- **Database:** PostgreSQL

## 2. Architecture Flow

Follow a clean layer separation: **Controller -> Service -> Prisma**.

- **Controllers:** Handle HTTP requests, routing, and DTO validation only. No business logic.
- **Services:** Handle all business logic and interact directly with the database via the injected `PrismaService`. Do not build abstract Repository layers over Prisma.
- **Response Formatting:** Use `class-transformer` serialization (`@Exclude()`) and `ClassSerializerInterceptor` to strip sensitive fields before returning responses.

## 3. Code Reusability (DRY Principle)

- Extract shared interfaces, types, and base DTOs into `src/common/dto` or `src/common/interfaces`.
- Use Base classes for shared data (e.g., `BaseQuizDto` extended by `CreateQuizDto`).

## 4. Validation & Typing

- Always use `class-validator` and `class-transformer` for incoming request validation.
- Strict TypeScript: never use `any`.

## 5. Prisma ORM Usage

- Use `include` or `select` appropriately to avoid over-fetching.
- Never mutate Prisma generated types directly; always map to DTOs.

## 6. Error Handling

- Throw specific NestJS HTTP Exceptions (`NotFoundException`, `BadRequestException`) with clear English messages.
