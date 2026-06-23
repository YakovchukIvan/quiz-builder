'use client';

import { useTransition } from 'react';
import { deleteQuizAction } from '@/lib/actions';

type UseDeleteQuizProps = {
  id: string;
  onOptimisticDelete?: (id: string) => void;
  onSuccess?: () => void;
  onError?: (error: string) => void;
};

export function useDeleteQuiz({ id, onOptimisticDelete, onSuccess, onError }: UseDeleteQuizProps) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      if (onOptimisticDelete) {
        onOptimisticDelete(id);
      }
      const result = await deleteQuizAction(id);
      if (result.success) {
        if (onSuccess) onSuccess();
      } else {
        if (onError) onError(result.error || 'Failed to delete quiz');
      }
    });
  };

  return {
    isPending,
    handleDelete,
  };
}
