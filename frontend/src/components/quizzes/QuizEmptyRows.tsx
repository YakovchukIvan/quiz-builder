import { TableRow, TableCell } from '@/components/ui/table';

type Props = {
  count: number;
};

export function QuizEmptyRows({ count }: Props) {
  if (count <= 0) return null;

  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <TableRow key={`empty-${i}`} className="h-16 border-b-0 hover:bg-transparent">
          <TableCell colSpan={3} />
        </TableRow>
      ))}
    </>
  );
}
