export enum QuestionType {
  BOOLEAN = 'BOOLEAN',
  INPUT = 'INPUT',
  CHECKBOX = 'CHECKBOX',
}

// Типи для POST запиту (відповідають твоїм DTO в NestJS)
export interface CreateQuestionPayload {
  type: QuestionType;
  text: string;
  options?: string[];
}

export interface CreateQuizPayload {
  title: string;
  questions: CreateQuestionPayload[];
}

// Типи для отримання даних з БД (відповідають Prisma Models)
export interface Question {
  id: string;
  type: QuestionType;
  text: string;
  options: string[] | null; // Prisma Json? повертає null, якщо немає даних
  quizId: string;
}

export interface Quiz {
  id: string;
  title: string;
  createdAt: string; // NestJS повертає DateTime як ISO рядок
  questions?: Question[];
  _count?: {
    questions: number;
  };
}

export interface PaginatedQuizzes {
  items: Quiz[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

// Тип для відповідей Server Actions
export interface ActionResponse {
  success: boolean;
  error?: string;
}
