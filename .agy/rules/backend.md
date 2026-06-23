# Backend Architecture Rules (NestJS)

## 1. Architecture Flow

Follow a clean layer separation: **Controller -> Service -> Prisma**.

- **Controllers:** Handle HTTP requests, routing, and DTO validation only. No business logic.
- **Services:** Handle all business logic and interact directly with the database via the injected `PrismaService`. Do not build abstract Repository layers over Prisma.
- **Response Formatting:** Use `class-transformer` serialization (e.g., `@Exclude()`) and `ClassSerializerInterceptor` to strip sensitive or internal database fields before returning responses. Avoid boilerplate Mapper classes unless the data transformation is highly complex.

## 2. Code Reusability (DRY Principle)

- Extract shared interfaces, types, and base DTOs into a common folder (e.g., `src/common/dto` or `src/common/interfaces`).
- Use Base classes for shared data. For example, create a `BaseQuizDto` and extend it for `CreateQuizDto` and `UpdateQuizDto`.

## 3. Validation & Typing

- Always use `class-validator` and `class-transformer` for incoming request validation.
- Strict TypeScript typing is mandatory. Never use `any`.

## 4. Prisma ORM Usage

- Handle Prisma relational queries efficiently (use `include` or `select` appropriately to avoid over-fetching).
- Never mutate Prisma generated types directly; always map them to your DTOs or custom interfaces if needed for the frontend.

## 5. Error Handling

- Throw specific NestJS HTTP Exceptions (e.g., `NotFoundException`, `BadRequestException`) with clear, descriptive messages in English. Do not return standard Error objects.
