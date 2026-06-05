import Link from 'next/link';
import { Quiz } from '@/types';
import { DeleteButton } from './DeleteButton';

type Props = {
  quiz: Quiz;
  isLast: boolean;
  onDelete: (id: string) => void;
};

export function QuizCard({ quiz, isLast, onDelete }: Props) {
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

      <DeleteButton id={quiz.id} onOptimisticDelete={onDelete} />
    </div>
  );
}
