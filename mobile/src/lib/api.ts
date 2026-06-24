import { Platform } from 'react-native';
import { Quiz, QuizListItem, CreateQuizPayload, PaginatedQuizzes } from './types';

const LOCAL_HOST = Platform.OS === 'android' ? '10.0.2.2' : 'localhost';
export const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL ?? `http://${LOCAL_HOST}:3000`;

export async function fetchQuizzes(page: number = 1, limit: number = 10): Promise<PaginatedQuizzes> {
  const response = await fetch(`${API_BASE_URL}/quizzes?page=${page}&limit=${limit}`);
  if (!response.ok) {
    throw new Error('Failed to fetch quizzes');
  }
  const data = await response.json();
  const items = data.items || [];
  const mappedItems = items.map((item: { id: string; title: string; createdAt: string; _count?: { questions: number } }) => ({
    id: item.id,
    title: item.title,
    questionCount: item._count?.questions ?? 0,
    createdAt: item.createdAt,
  }));
  return {
    items: mappedItems,
    total: data.total ?? 0,
    page: data.page ?? page,
    limit: data.limit ?? limit,
    totalPages: data.totalPages ?? 0,
    hasNext: data.hasNext ?? false,
    hasPrev: data.hasPrev ?? false,
  };
}


export async function fetchQuiz(id: string): Promise<Quiz> {
  const response = await fetch(`${API_BASE_URL}/quizzes/${id}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch quiz with id: ${id}`);
  }
  const data = await response.json();
  
  // Transform questions options from string[] to QuestionOption[]
  const questions = (data.questions || []).map((q: { id: string; type: any; text: string; options?: string[] | null }) => {
    const rawOptions = Array.isArray(q.options) ? q.options : [];
    return {
      id: q.id,
      type: q.type,
      text: q.text,
      options: rawOptions.map((opt: string, idx: number) => ({
        id: idx.toString(),
        text: opt,
        isCorrect: false,
      })),
    };
  });

  return {
    id: data.id,
    title: data.title,
    questions,
    createdAt: data.createdAt,
  };
}

export async function createQuiz(payload: CreateQuizPayload): Promise<Quiz> {
  const response = await fetch(`${API_BASE_URL}/quizzes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    throw new Error('Failed to create quiz');
  }
  const data = await response.json();
  
  const questions = (data.questions || []).map((q: { id: string; type: any; text: string; options?: string[] | null }) => {
    const rawOptions = Array.isArray(q.options) ? q.options : [];
    return {
      id: q.id,
      type: q.type,
      text: q.text,
      options: rawOptions.map((opt: string, idx: number) => ({
        id: idx.toString(),
        text: opt,
        isCorrect: false,
      })),
    };
  });

  return {
    id: data.id,
    title: data.title,
    questions,
    createdAt: data.createdAt,
  };
}

export async function deleteQuiz(id: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/quizzes/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete quiz');
  }
}
