import { PaginatedQuizzes, Quiz } from '@/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export async function getQuizzes(page: number = 1, limit: number = 10): Promise<PaginatedQuizzes> {
  try {
    const res = await fetch(`${API_URL}/quizzes?page=${page}&limit=${limit}`, {
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error('Failed to fetch quizzes list');
    }

    return await res.json();
  } catch (error) {
    console.error('Backend is offline or returned an error:', error);
    return {
      items: [],
      total: 0,
      page,
      limit,
      totalPages: 0,
      hasNext: false,
      hasPrev: false,
    };
  }
}

export async function getQuiz(id: string): Promise<Quiz | null> {
  try {
    const res = await fetch(`${API_URL}/quizzes/${id}`, {
      cache: 'no-store',
    });

    if (res.status === 404) {
      return null;
    }

    if (!res.ok) {
      throw new Error(`Failed to fetch quiz with id: ${id}`);
    }

    return await res.json();
  } catch (error) {
    console.error(`Error fetching quiz (${id}):`, error);
    return null;
  }
}
