'use client';

import { useTransition } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';

type Props = {
  page: number;
  totalPages: number;
  hasPrev: boolean;
  hasNext: boolean;
};

export function QuizPagination({ page, totalPages, hasPrev, hasNext }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', newPage.toString());

    startTransition(() => {
      router.push(`/quizzes?${params.toString()}`);
    });
  };

  return (
    <div className="flex items-center justify-between mt-4 gap-2">
      <button
        onClick={() => handlePageChange(page - 1)}
        disabled={!hasPrev || isPending}
        className="btn btn-ghost disabled:cursor-not-allowed disabled:opacity-40 select-none"
      >
        {isPending ? <Loader2 size={16} className="animate-spin" /> : <ChevronLeft size={16} />}
        Prev
      </button>

      <span className="text-sm text-muted select-none">
        Page {page} of {totalPages || 1}
      </span>

      <button
        onClick={() => handlePageChange(page + 1)}
        disabled={!hasNext || isPending}
        className="btn btn-ghost disabled:cursor-not-allowed disabled:opacity-40 select-none"
      >
        Next
        {isPending ? <Loader2 size={16} className="animate-spin" /> : <ChevronRight size={16} />}
      </button>
    </div>
  );
}
