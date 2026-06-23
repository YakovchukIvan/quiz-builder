import Link from 'next/link';
import { Quiz } from '@/types';
import { DeleteButton } from './DeleteButton';
import { TableRow, TableCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

type Props = {
  quiz: Quiz;
  onDelete: (id: string) => void;
};

export function QuizCard({ quiz, onDelete }: Props) {
  return (
    <TableRow className="h-16">
      <TableCell className="font-medium max-w-[300px] sm:max-w-none truncate">
        <Link
          href={`/quizzes/${quiz.id}`}
          className="text-[15px] text-text no-underline hover:underline truncate block"
        >
          {quiz.title}
        </Link>
      </TableCell>
      <TableCell className="w-32">
        <Badge variant="secondary">
          {quiz._count?.questions ?? 0} {quiz._count?.questions === 1 ? 'question' : 'questions'}
        </Badge>
      </TableCell>
      <TableCell className="w-16 text-right">
        <DeleteButton id={quiz.id} onOptimisticDelete={onDelete} />
      </TableCell>
    </TableRow>
  );
}
