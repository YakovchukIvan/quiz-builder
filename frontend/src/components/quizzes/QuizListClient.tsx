'use client';

import { useOptimistic } from 'react';
import { PaginatedQuizzes } from '@/types';
import { QuizCard } from './QuizCard';
import { QuizPagination } from './QuizPagination';
import { QuizHeader } from './QuizHeader';
import { QuizEmptyState } from './QuizEmptyState';
import { QuizEmptyRows } from './QuizEmptyRows';

type Props = {
  paginatedData: PaginatedQuizzes;
};

export function QuizListClient({ paginatedData }: Props) {
  const [optimisticData, setOptimisticData] = useOptimistic(paginatedData, (currentState, idToRemove) => {
    const updatedItems = currentState.items.filter((quiz) => quiz.id !== idToRemove);
    const isItemRemoved = currentState.items.length !== updatedItems.length;

    return {
      ...currentState,
      items: updatedItems,
      total: isItemRemoved ? Math.max(0, currentState.total - 1) : currentState.total,
    };
  });

  const { items, total, page, totalPages, limit, hasPrev, hasNext } = optimisticData;
  const emptyRowsCount = limit - items.length;

  return (
    <div className="container">
      <QuizHeader total={total} />

      <div className="card overflow-hidden min-h-160.5">
        {items.length === 0 && total === 0 ? (
          <QuizEmptyState />
        ) : (
          <>
            {items.map((quiz, i) => (
              <QuizCard
                key={quiz.id}
                quiz={quiz}
                isLast={i === items.length - 1 && emptyRowsCount === 0}
                onDelete={setOptimisticData}
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
