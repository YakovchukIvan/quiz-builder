
https://github.com/user-attachments/assets/1a3d6e5c-9a34-48a6-be1f-1d5121cb4893

# Quiz Builder

A full-stack web and mobile ecosystem for creating and managing quizzes. 
Users can create quizzes with three question types — True/False, Short answer, 
and Multiple choice — view all quizzes in a dashboard, and inspect each quiz in detail.

Built as a monorepo with a NestJS backend, a Next.js web frontend, a React Native mobile application, and integrated Antigravity CLI for AI-assisted development.

---

## Tech Stack

**Backend** — NestJS · TypeScript · Prisma · PostgreSQL
**Web Frontend** — Next.js · React · TypeScript · Tailwind CSS · React Hook Form · Zod
**Mobile** — React Native · Expo · TypeScript · StyleSheet
**AI / Tools** — Antigravity CLI

---

## Project Structure

```text
quiz-builder/
├── .agy/                 # Antigravity CLI Agent configurations
│   ├── rules/            # Stack-specific rules (backend.md, frontend.md, mobile.md)
│   ├── skills/           # Domain knowledge (quiz-domain.md)
│   ├── workflows/        # Automated processes (feature.md)
│   └── global_rules.md   # Shared agent instructions
├── backend/              # NestJS REST API
├── frontend/             # Next.js App Router (Web Client)
├── mobile/               # React Native (Expo) Mobile App
├── .husky/               # Git hooks (lint + typecheck on commit/push)
├── AGENTS.md             # Main documentation and entry point for AI Agents
├── package.json          # Monorepo root with shared scripts
└── README.md             # Project documentation

```

## Prerequisites

* Node.js 20+
* Docker (for local PostgreSQL)
* **Expo Go** app installed on your iOS/Android device (for mobile testing)
* Windows PowerShell (for Antigravity CLI installation)

---

## Getting Started

### 1. Clone the repo

```bash
git clone [https://github.com/your-username/quiz-builder.git](https://github.com/your-username/quiz-builder.git)
cd quiz-builder

```

### 2. Install dependencies

```bash
npm install
npm --prefix backend install
npm --prefix frontend install
npm --prefix mobile install

```

### 3. Start the database (Docker commands)

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

# Allowed frontend origins for CORS
FRONTEND_URL="http://localhost:3000"

```

**Frontend** — create `frontend/.env.local`:

```dotenv
# Backend API base URL
NEXT_PUBLIC_API_URL=[http://127.0.0.1:8000](http://127.0.0.1:8000)

```

**Mobile** — create `mobile/.env`:

```dotenv
# Backend API base URL (Use your local network IP for physical device testing, e.g., 192.168.x.x)
EXPO_PUBLIC_API_URL=[http://127.0.0.1:8000](http://127.0.0.1:8000) 

```

### 5. Run database migrations & seed

```bash
npm run prisma:migrate
npm run prisma:seed

```

### 6. Start the Web App

```bash
npm run dev

```

* Frontend: [http://localhost:3000](http://localhost:3000)
* Backend API: [http://localhost:8000](http://localhost:8000)

### 7. Start the Mobile App (React Native)

Open a new terminal window and run:

```bash
cd mobile
npx expo start

```

*To view the app, scan the generated QR code with the **Expo Go** app on your phone, or press `a` to open in Android Emulator / `i` for iOS Simulator.*

---

## AI Agent Integration (Antigravity CLI)

This monorepo is fully configured to work with the **Antigravity CLI**, enabling AI-assisted feature development, refactoring, and code generation tailored specifically to the project's architecture.

### Setup & Installation

1. **Install the CLI tool** via PowerShell:

```powershell
   irm [https://antigravity.google/cli/install.ps1](https://antigravity.google/cli/install.ps1) | iex

```

2. **Review the Agent configuration:**
Check the `AGENTS.md` file in the root directory for available commands and agent capabilities.
3. **Run the Agent:**
The agent automatically reads the context from the `.agy/` folder, adapting its behavior based on whether it is touching the `backend/`, `frontend/`, or `mobile/` environments.

---

## Available Scripts

All scripts run from the **monorepo root**.

| Script | Description |
| --- | --- |
| `npm run dev` | Start backend and frontend concurrently |
| `npm run dev:backend` | Start backend only in watch mode |
| `npm run dev:frontend` | Start web frontend only |
| `npm run dev:mobile` | Start React Native Expo server |
| `npm run lint:all` | Lint backend, frontend, and mobile |
| `npm run format` | Format all files with Prettier |
| `npm run prisma:generate` | Generate Prisma client |
| `npm run prisma:migrate` | Run database migrations |
| `npm run prisma:studio` | Open Prisma Studio — database GUI |
| `npm run prisma:seed` | Seed the database with sample data |

---

## API Endpoints

| Method | Endpoint | Description |
| --- | --- | --- |
| `POST` | `/quizzes` | Create a new quiz |
| `GET` | `/quizzes` | Get paginated list of quizzes |
| `GET` | `/quizzes/:id` | Get full quiz details |
| `DELETE` | `/quizzes/:id` | Delete a quiz |

---

## Pagination

The `GET /quizzes` endpoint supports pagination via query parameters.

| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| `page` | integer | `1` | Page number (min: 1) |
| `limit` | integer | `10` | Items per page (min: 1) |

---

## Pages / Screens

| Environment | Route / Screen | Description |
| --- | --- | --- |
| **Web** | `/quizzes` | Dashboard — list of all quizzes with question count |
| **Web** | `/create` | Quiz builder — form to create a quiz with dynamic questions |
| **Mobile** | `Home` | Mobile dashboard with native `FlatList` of quizzes |
| **Mobile** | `QuizDetails` | Read-only view of a specific quiz optimized for mobile |

---

## Question Types

| Type | Description |
| --- | --- |
| **True / False** | Boolean question with two fixed options |
| **Short answer** | Open text input field |
| **Multiple choice** | Checkbox list with 2 or more custom options |

```

```
