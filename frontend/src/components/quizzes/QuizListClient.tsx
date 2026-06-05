'use client';

import { useOptimistic, useTransition } from 'react';
import { PaginatedQuizzes, Quiz } from '@/types';
import { deleteQuizAction } from '@/lib/actions';
import { QuizCard } from './QuizCard';
import { QuizPagination } from './QuizPagination';
import { QuizHeader } from './QuizHeader';
import { QuizEmptyState } from './QuizEmptyState';
import { QuizEmptyRows } from './QuizEmptyRows';

type Props = {
  paginatedData: PaginatedQuizzes;
};

export function QuizListClient({ paginatedData }: Props) {
  const [isPending, startTransition] = useTransition();

  const { items, total, page, totalPages, limit, hasPrev, hasNext } = paginatedData;

  const [optimisticQuizzes, setOptimisticQuizzes] = useOptimistic(items, (currentState: Quiz[], idToRemove: string) =>
    currentState.filter((quiz) => quiz.id !== idToRemove),
  );

  const handleDelete = async (id: string) => {
    startTransition(async () => {
      setOptimisticQuizzes(id);
      const result = await deleteQuizAction(id);

      if (!result.success) {
        alert(result.error || 'Failed to delete the quiz. Reverting...');
      }
    });
  };

  const emptyRowsCount = limit - optimisticQuizzes.length;

  return (
    <div className="container">
      <QuizHeader total={total} />

      <div className="card overflow-hidden min-h-160.5">
        {optimisticQuizzes.length === 0 ? (
          <QuizEmptyState />
        ) : (
          <>
            {optimisticQuizzes.map((quiz, i) => (
              <QuizCard
                key={quiz.id}
                quiz={quiz}
                isLast={i === optimisticQuizzes.length - 1 && emptyRowsCount === 0}
                onDelete={handleDelete}
                disabled={isPending}
              />
            ))}

            <QuizEmptyRows count={emptyRowsCount} />
          </>
        )}
      </div>

      <QuizPagination page={page} totalPages={totalPages} hasPrev={hasPrev} hasNext={hasNext} />
    </div>
  );
}
