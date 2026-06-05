type Props = {
  count: number;
};

export function QuizEmptyRows({ count }: Props) {
  if (count <= 0) return null;

  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div key={`empty-${i}`} className={`h-16 ${i < count - 1 ? 'border-b border-border' : ''}`} />
      ))}
    </>
  );
}
