'use client';

import { useDeleteQuiz } from '@/hooks/use-delete-quiz';
import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

type Props = {
  id: string;
  onOptimisticDelete: (id: string) => void;
};

export function DeleteButton({ id, onOptimisticDelete }: Props) {
  const { isPending, handleDelete } = useDeleteQuiz({
    id,
    onOptimisticDelete,
  });

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleDelete}
      disabled={isPending}
      className="text-danger hover:bg-danger/10 py-1.5 px-2 shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
      aria-label="Delete quiz"
      title="Delete quiz"
    >
      <Trash2 size={16} className={isPending ? 'animate-pulse opacity-50' : ''} />
    </Button>
  );
}
