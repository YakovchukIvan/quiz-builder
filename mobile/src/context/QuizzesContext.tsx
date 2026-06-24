import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { fetchQuizzes, deleteQuiz as apiDeleteQuiz } from '../lib/api';
import { QuizListItem } from '../lib/types';

interface QuizzesContextType {
  data: QuizListItem[];
  loading: boolean;
  loadingMore: boolean;
  error: string | null;
  hasMore: boolean;
  total: number;
  refetch: () => void;
  loadMore: () => Promise<void>;
  deleteQuiz: (id: string) => Promise<{ success: boolean; error?: string }>;
  addQuiz: (quiz: QuizListItem) => void;
}

const QuizzesContext = createContext<QuizzesContextType | undefined>(undefined);

export function QuizzesProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<QuizListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [total, setTotal] = useState(0);

  const loadQuizzes = useCallback(async (resetPage = 1) => {
    if (resetPage === 1) {
      setLoading(true);
    } else {
      setLoadingMore(true);
    }
    setError(null);
    try {
      const response = await fetchQuizzes(resetPage, 10);
      if (resetPage === 1) {
        setData(response.items);
      } else {
        setData((prev) => [...prev, ...response.items]);
      }
      setPage(response.page);
      setHasMore(response.hasNext);
      setTotal(response.total);
    } catch (e: any) {
      setError(e.message || 'Failed to load quizzes');
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, []);

  useEffect(() => {
    loadQuizzes(1);
  }, [loadQuizzes]);

  const loadMore = useCallback(async () => {
    if (loadingMore || !hasMore) return;
    await loadQuizzes(page + 1);
  }, [page, hasMore, loadingMore, loadQuizzes]);

  const deleteQuiz = useCallback(async (id: string) => {
    try {
      await apiDeleteQuiz(id);
      setData((prev) => prev.filter((item) => item.id !== id));
      setTotal((prev) => Math.max(0, prev - 1));
      return { success: true };
    } catch (e: any) {
      return { success: false, error: e.message || 'Failed to delete quiz' };
    }
  }, []);

  const addQuiz = useCallback((quiz: QuizListItem) => {
    setData((prev) => [quiz, ...prev]);
    setTotal((prev) => prev + 1);
  }, []);

  const refetch = useCallback(() => {
    loadQuizzes(1);
  }, [loadQuizzes]);

  return (
    <QuizzesContext.Provider
      value={{
        data,
        loading,
        loadingMore,
        error,
        hasMore,
        total,
        refetch,
        loadMore,
        deleteQuiz,
        addQuiz,
      }}
    >
      {children}
    </QuizzesContext.Provider>
  );
}

export function useQuizzesContext() {
  const context = useContext(QuizzesContext);
  if (!context) {
    throw new Error('useQuizzesContext must be used within a QuizzesProvider');
  }
  return context;
}
