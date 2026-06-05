export enum QuestionType {
  BOOLEAN = 'BOOLEAN',
  INPUT = 'INPUT',
  CHECKBOX = 'CHECKBOX',
}

export const QUESTION_TYPE_META: Record<QuestionType, { label: string; badgeClass: string }> = {
  [QuestionType.BOOLEAN]: { label: 'True / False', badgeClass: 'text-blue-500 bg-blue-500/[0.12]' },
  [QuestionType.INPUT]: { label: 'Short answer', badgeClass: 'text-violet-500 bg-violet-500/[0.12]' },
  [QuestionType.CHECKBOX]: { label: 'Multiple choice', badgeClass: 'text-amber-500 bg-amber-500/[0.12]' },
};

export type CreateQuestionPayload = {
  type: QuestionType;
  text: string;
  options?: string[];
};

export type CreateQuizPayload = {
  title: string;
  questions: CreateQuestionPayload[];
};

export type Question = {
  id: string;
  type: QuestionType;
  text: string;
  options: string[] | null;
  quizId: string;
};

export type Quiz = {
  id: string;
  title: string;
  createdAt: string;
  questions?: Question[];
  _count?: {
    questions: number;
  };
};

export type PaginatedQuizzes = {
  items: Quiz[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
};

export type ActionResponse = {
  success: boolean;
  error?: string;
};
