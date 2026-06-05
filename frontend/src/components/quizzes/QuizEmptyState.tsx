export function QuizEmptyState() {
  return (
    <div className="h-160 flex flex-col items-center justify-center gap-2">
      <span className="text-3xl" role="img" aria-label="Clipboard">
        📋
      </span>
      <p className="text-sm text-muted">No quizzes yet</p>
    </div>
  );
}
