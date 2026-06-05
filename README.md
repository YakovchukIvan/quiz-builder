# Quiz Builder

A full-stack web application for creating and managing quizzes.
Users can create quizzes with three question types — True/False, Short answer,
and Multiple choice — view all quizzes in a dashboard, and inspect each quiz in detail.

Built as a monorepo with a NestJS backend and a Next.js frontend.

---

## Tech Stack

**Backend** — NestJS · TypeScript · Prisma · PostgreSQL

**Frontend** — Next.js · React · TypeScript · Tailwind CSS · React Hook Form · Zod

---

## Project Structure

quiz-builder/
├── backend/ # NestJS REST API
├── frontend/ # Next.js App Router
├── .husky/ # Git hooks (lint + typecheck on commit/push)
├── .prettierrc # Shared Prettier config
└── package.json # Monorepo root with shared scripts

---

## Prerequisites

- Node.js 20+
- Docker (for local PostgreSQL)

---

## Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/your-username/quiz-builder.git
cd quiz-builder
```

### 2. Install dependencies

```bash
npm install
npm --prefix backend install
npm --prefix frontend install
```

### 3. Start the database. Docker commands:

```bash
# Start the container
docker start quiz-postgres

# Stop the container
docker stop quiz-postgres

# Restart the container
docker restart quiz-postgres

# Remove the container (data will be lost)
docker rm -f quiz-postgres

# View logs
docker logs quiz-postgres
```

### 4. Configure environment variables

**Backend** — create `backend/.env`:

```dotenv
# Server port
PORT=8000

# PostgreSQL connection string
DATABASE_URL="postgresql://postgres:postgres@localhost:5555/quiz_builder"

# Allowed frontend origin for CORS
FRONTEND_URL="http://localhost:3000"
```

**Frontend** — create `frontend/.env.local`:

```dotenv
# Backend API base URL
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000
```

### 5. Run database migrations

```bash
npm run prisma:migrate
```

### 6. Start the app

```bash
npm run dev
```

- Frontend: <http://localhost:3000>
- Backend API: <http://localhost:8000>

---

## Available Scripts

All scripts run from the **monorepo root**.

| Script                    | Description                             |
| ------------------------- | --------------------------------------- |
| `npm run dev`             | Start backend and frontend concurrently |
| `npm run dev:backend`     | Start backend only in watch mode        |
| `npm run dev:frontend`    | Start frontend only                     |
| `npm run lint:all`        | Lint backend and frontend concurrently  |
| `npm run lint:backend`    | Lint backend only                       |
| `npm run lint:frontend`   | Lint frontend only                      |
| `npm run format`          | Format all files with Prettier          |
| `npm run prisma:generate` | Generate Prisma client                  |
| `npm run prisma:migrate`  | Run database migrations                 |
| `npm run prisma:studio`   | Open Prisma Studio — database GUI       |
| `npm run prisma:seed`     | Seed the database with sample data      |

---

## API Endpoints

| Method   | Endpoint       | Description                   |
| -------- | -------------- | ----------------------------- |
| `POST`   | `/quizzes`     | Create a new quiz             |
| `GET`    | `/quizzes`     | Get paginated list of quizzes |
| `GET`    | `/quizzes/:id` | Get full quiz details         |
| `DELETE` | `/quizzes/:id` | Delete a quiz                 |

---

## Pagination

The `GET /quizzes` endpoint supports pagination via query parameters.

| Parameter | Type    | Default | Description             |
| --------- | ------- | ------- | ----------------------- |
| `page`    | integer | `1`     | Page number (min: 1)    |
| `limit`   | integer | `10`    | Items per page (min: 1) |

**Example request:**

```bash
GET /quizzes?page=1&limit=5
```

**Example response:**

```json
{
  "items": [...],
  "total": 12,
  "page": 1,
  "limit": 5,
  "totalPages": 3,
  "hasNext": true,
  "hasPrev": false
}
```

---

## Pages

| Route          | Description                                                 |
| -------------- | ----------------------------------------------------------- |
| `/quizzes`     | Dashboard — list of all quizzes with question count         |
| `/quizzes/:id` | Quiz detail — read-only view of all questions               |
| `/create`      | Quiz builder — form to create a quiz with dynamic questions |

---

## Question Types

| Type                | Description                                 |
| ------------------- | ------------------------------------------- |
| **True / False**    | Boolean question with two fixed options     |
| **Short answer**    | Open text input field                       |
| **Multiple choice** | Checkbox list with 2 or more custom options |

---

## Sample Data

Seed the database with a sample JavaScript Basics quiz covering all three question types:

```bash
npm run prisma:seed
```
