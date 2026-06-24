import { useState, useEffect, useCallback } from 'react';
import { fetchQuizzes, deleteQuiz as apiDeleteQuiz } from '../lib/api';
import { QuizListItem } from '../lib/types';

export function useQuizzes() {
  const [data, setData] = useState<QuizListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);

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
      return { success: true };
    } catch (e: any) {
      return { success: false, error: e.message || 'Failed to delete quiz' };
    }
  }, []);

  return {
    data,
    loading,
    loadingMore,
    error,
    hasMore,
    refetch: () => loadQuizzes(1),
    loadMore,
    deleteQuiz,
  };
}
