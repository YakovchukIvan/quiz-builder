# Quiz Domain & Business Logic

## 1. Core Concept

This application is a **Quiz Builder**, not a quiz-playing platform. Users create the structure of a quiz, view the list of quizzes, and preview individual quizzes in a read-only mode.

## 2. Supported Question Types

Strictly support ONLY these three question types:

1. **Boolean:** True/False radio buttons.
2. **Input:** Short text answer.
3. **Checkbox:** Multiple choice with several correct answers.

## 3. UI & Interaction Flow

- **Creation (`/create`):** Users must be able to dynamically add or remove questions of the supported types in a single form.
- **Listing (`/quizzes`):** Display all quizzes showing the title and total number of questions. Include a delete icon/button to remove the quiz.
- **Viewing (`/quizzes/:id`):** Render the quiz title and its questions in a **read-only mode**. The inputs/radios/checkboxes should be visible but disabled or strictly for structural preview, not for submitting answers.
