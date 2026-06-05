import Link from 'next/link';

type Props = {
  page: number;
  totalPages: number;
  hasPrev: boolean;
  hasNext: boolean;
};

export function QuizPagination({ page, totalPages, hasPrev, hasNext }: Props) {
  return (
    <div className="flex items-center justify-between mt-4 gap-2">
      <Link
        href={`/quizzes?page=${page - 1}`}
        className={`btn btn-ghost ${!hasPrev ? 'pointer-events-none opacity-40' : ''}`}
      >
        ← Prev
      </Link>

      <span className="text-sm text-muted">
        Page {page} of {totalPages || 1}
      </span>

      <Link
        href={`/quizzes?page=${page + 1}`}
        className={`btn btn-ghost ${!hasNext ? 'pointer-events-none opacity-40' : ''}`}
      >
        Next →
      </Link>
    </div>
  );
}
