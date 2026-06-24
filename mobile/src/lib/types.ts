export type QuestionType = 'BOOLEAN' | 'INPUT' | 'CHECKBOX';

export interface QuestionOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface Question {
  id: string;
  type: QuestionType;
  text: string;
  options: QuestionOption[];
}

export interface Quiz {
  id: string;
  title: string;
  questions: Question[];
  createdAt: string;
}

export interface QuizListItem {
  id: string;
  title: string;
  questionCount: number;
  createdAt: string;
}

export interface CreateQuestionPayload {
  type: QuestionType;
  text: string;
  options?: string[];
}

export interface CreateQuizPayload {
  title: string;
  questions: CreateQuestionPayload[];
}

export interface PaginatedQuizzes {
  items: QuizListItem[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

