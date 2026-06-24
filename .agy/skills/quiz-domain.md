# Quiz Domain & Business Logic

## 1. Core Concept

This application is a **Quiz Builder**, not a quiz-playing platform. Users create the structure of a quiz, view the list of quizzes, and preview individual quizzes in a read-only mode.

## 2. Supported Question Types

Strictly support ONLY these three question types:

1. **Boolean:** True/False radio buttons.
2. **Input:** Short text answer.
3. **Checkbox:** Multiple choice with several correct answers.

## 3. Backend API Contract

Base URL: configured per environment (see mobile rules for platform-specific URLs).

| Method | Endpoint     | Description                               |
| ------ | ------------ | ----------------------------------------- |
| POST   | /quizzes     | Create a new quiz                         |
| GET    | /quizzes     | List all quizzes (title + question count) |
| GET    | /quizzes/:id | Full quiz details including all questions |
| DELETE | /quizzes/:id | Delete a quiz                             |

## 4. Shared TypeScript Interfaces

These interfaces must be used identically across frontend and mobile:

```typescript
type QuestionType = 'BOOLEAN' | 'INPUT' | 'CHECKBOX';

interface QuestionOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

interface Question {
  id: string;
  type: QuestionType;
  text: string;
  options: QuestionOption[];
}

interface Quiz {
  id: string;
  title: string;
  questions: Question[];
  createdAt: string;
}

interface QuizListItem {
  id: string;
  title: string;
  questionCount: number;
  createdAt: string;
}
```

## 5. UI & Interaction Flow

- **Creation (`/create` or `/(tabs)/create`):** Users must be able to dynamically add or remove questions of the supported types in a single form.
- **Listing (`/quizzes` or `/(tabs)/quizzes`):** Display all quizzes showing the title and total number of questions. Include a delete button to remove the quiz.
- **Viewing (`/quizzes/:id`):** Render the quiz title and its questions in a **read-only mode**. Inputs/radios/checkboxes are visible but disabled — for structural preview only, not for submitting answers.
