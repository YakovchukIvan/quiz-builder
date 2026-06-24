import { useState, useEffect, useCallback } from 'react';
import { fetchQuiz } from '../lib/api';
import { Quiz } from '../lib/types';

export function useQuiz(id: string) {
  const [data, setData] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadQuiz = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    setError(null);
    try {
      const quiz = await fetchQuiz(id);
      setData(quiz);
    } catch (e: any) {
      setError(e.message || 'Failed to load quiz');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    loadQuiz();
  }, [loadQuiz]);

  return { data, loading, error, refetch: loadQuiz };
}
