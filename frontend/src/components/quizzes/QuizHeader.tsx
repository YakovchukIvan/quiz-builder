type Props = {
  total: number;
};

export function QuizHeader({ total }: Props) {
  return (
    <div className="flex items-baseline justify-between mb-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-text m-0">Quizzes</h1>
        <p className="text-sm text-muted mt-1">{total} total</p>
      </div>
    </div>
  );
}
