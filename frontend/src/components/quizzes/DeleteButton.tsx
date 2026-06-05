'use client';

import { useTransition } from 'react';
import { deleteQuizAction } from '@/lib/actions';
import { Trash2 } from 'lucide-react';

type Props = {
  id: string;
  onOptimisticDelete: (id: string) => void;
};

export function DeleteButton({ id, onOptimisticDelete }: Props) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      onOptimisticDelete(id);
      await deleteQuizAction(id);
    });
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      className="btn btn-danger py-1.5 px-2 shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
      aria-label="Delete quiz"
      title="Delete quiz"
    >
      <Trash2 size={16} className={isPending ? 'animate-pulse opacity-50' : ''} />
    </button>
  );
}
