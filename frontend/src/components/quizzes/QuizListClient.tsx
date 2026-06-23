'use client';

import { useOptimistic } from 'react';
import { PaginatedQuizzes } from '@/types';
import { QuizCard } from './QuizCard';
import { QuizPagination } from './QuizPagination';
import { QuizHeader } from './QuizHeader';
import { QuizEmptyState } from './QuizEmptyState';
import { QuizEmptyRows } from './QuizEmptyRows';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table';

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

      <Card className="overflow-hidden min-h-160.5">
        <CardContent className="p-0">
          {items.length === 0 && total === 0 ? (
            <QuizEmptyState />
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-semibold">Quiz Title</TableHead>
                  <TableHead className="w-32 font-semibold">Questions</TableHead>
                  <TableHead className="w-16 text-right font-semibold">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((quiz) => (
                  <QuizCard key={quiz.id} quiz={quiz} onDelete={setOptimisticData} />
                ))}

                <QuizEmptyRows count={emptyRowsCount} />
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <QuizPagination page={page} totalPages={totalPages} hasPrev={hasPrev} hasNext={hasNext} />
    </div>
  );
}
