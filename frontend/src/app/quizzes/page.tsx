import Link from 'next/link';

const MOCK_QUIZZES = [
  { id: '1', title: 'JavaScript Basics', _count: { questions: 8 } },
  { id: '2', title: 'React Fundamentals', _count: { questions: 12 } },
  { id: '3', title: 'TypeScript Deep Dive', _count: { questions: 5 } },
];

const PAGE_SIZE = 10;

export default function QuizzesPage() {
  const quizzes = MOCK_QUIZZES;
  const totalPages = 3;
  const currentPage = 1;
  const total = 28;

  return (
    <div className="container">
      <div className="flex items-baseline justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-text m-0">Quizzes</h1>
          <p className="text-sm text-muted mt-1">{total} total</p>
        </div>
      </div>

      <div className="card overflow-hidden min-h-160.5">
        {quizzes.length === 0 ? (
          <div className="h-160 flex flex-col items-center justify-center gap-2">
            <span className="text-3xl">📋</span>
            <p className="text-sm text-muted">No quizzes yet</p>
          </div>
        ) : (
          <>
            {quizzes.map((quiz, i) => (
              <QuizRow key={quiz.id} quiz={quiz} isLast={i === quizzes.length - 1} />
            ))}

            {Array.from({ length: PAGE_SIZE - quizzes.length }).map((_, i) => (
              <div
                key={`empty-${i}`}
                className={`h-16 ${i < PAGE_SIZE - quizzes.length - 1 ? 'border-b border-border' : ''}`}
              />
            ))}
          </>
        )}
      </div>

      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </div>
  );
}

function QuizRow({
  quiz,
  isLast,
}: {
  quiz: { id: string; title: string; _count: { questions: number } };
  isLast: boolean;
}) {
  return (
    <div
      className={`h-16 flex items-center px-5 gap-4 transition-colors duration-150 hover:bg-muted/10 ${
        isLast ? '' : 'border-b border-border'
      }`}
    >
      <Link href={`/quizzes/${quiz.id}`} className="flex-1 font-medium text-[15px] text-text no-underline truncate">
        {quiz.title}
      </Link>

      <span className="text-xs text-muted bg-muted/10 rounded-full py-1 px-2.5 shrink-0">
        {quiz._count.questions} {quiz._count.questions === 1 ? 'question' : 'questions'}
      </span>

      <button className="btn btn-danger py-1.5 px-2 shrink-0" aria-label="Delete quiz" title="Delete quiz">
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="3 6 5 6 21 6" />
          <path d="M19 6l-1 14H6L5 6" />
          <path d="M10 11v6M14 11v6" />
          <path d="M9 6V4h6v2" />
        </svg>
      </button>
    </div>
  );
}

function Pagination({ currentPage, totalPages }: { currentPage: number; totalPages: number }) {
  return (
    <div className="flex items-center justify-between mt-4 gap-2">
      <button className="btn btn-ghost disabled:opacity-40" disabled={currentPage <= 1}>
        ← Prev
      </button>

      <span className="text-sm text-muted">
        Page {currentPage} of {totalPages}
      </span>

      <button className="btn btn-ghost disabled:opacity-40" disabled={currentPage >= totalPages}>
        Next →
      </button>
    </div>
  );
}
