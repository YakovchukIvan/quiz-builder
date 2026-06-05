import Link from 'next/link';
import { Quiz } from '@/types';

type Props = {
  quiz: Quiz;
  isLast: boolean;
  onDelete: (id: string) => void;
  disabled: boolean;
};

export function QuizCard({ quiz, isLast, onDelete, disabled }: Props) {
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
        {quiz._count?.questions ?? 0} {quiz._count?.questions === 1 ? 'question' : 'questions'}
      </span>

      <button
        onClick={() => onDelete(quiz.id)}
        disabled={disabled}
        className="btn btn-danger py-1.5 px-2 shrink-0 disabled:opacity-50"
        aria-label="Delete quiz"
        title="Delete quiz"
      >
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
