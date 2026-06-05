import Link from 'next/link';

const MOCK_QUIZ = {
  id: '1',
  title: 'JavaScript Basics',
  createdAt: '2025-06-01T10:00:00Z',
  questions: [
    { id: 'q1', type: 'BOOLEAN' as const, text: 'JavaScript is a statically typed language.', options: null },
    { id: 'q2', type: 'INPUT' as const, text: 'What does the acronym "DOM" stand for?', options: null },
    {
      id: 'q3',
      type: 'CHECKBOX' as const,
      text: 'Which of the following are JavaScript data types?',
      options: ['String', 'Integer', 'Boolean', 'Float', 'Symbol'],
    },
    { id: 'q4', type: 'BOOLEAN' as const, text: 'Arrow functions have their own "this" binding.', options: null },
    { id: 'q5', type: 'INPUT' as const, text: 'What method converts a JSON string into an object?', options: null },
  ],
};

type QuestionType = 'BOOLEAN' | 'INPUT' | 'CHECKBOX';

export default function QuizDetailPage() {
  const quiz = MOCK_QUIZ;

  return (
    <div className="container">
      <Link href="/quizzes" className="inline-flex items-center gap-1.5 text-sm text-muted no-underline mb-6">
        ← Back to quizzes
      </Link>

      <div className="mb-8">
        <h1 className="text-[1.75rem] font-bold tracking-tight text-text m-0">{quiz.title}</h1>
        <p className="text-sm text-muted mt-1.5">
          {quiz.questions.length} questions · Created {new Date(quiz.createdAt).toLocaleDateString()}
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {quiz.questions.map((q, i) => (
          <QuestionCard key={q.id} question={q} index={i} />
        ))}
      </div>
    </div>
  );
}

function QuestionCard({
  question,
  index,
}: {
  question: { id: string; type: QuestionType; text: string; options: string[] | null };
  index: number;
}) {
  return (
    <div className="card p-5">
      <div className="flex gap-3 mb-3.5">
        <span className="shrink-0 w-6 h-6 rounded-full bg-muted/12 flex items-center justify-center text-xs font-semibold text-muted">
          {index + 1}
        </span>

        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <TypeBadge type={question.type} />
          </div>
          <p className="text-[15px] font-medium text-text m-0">{question.text}</p>
        </div>
      </div>

      <div className="pl-9">
        <QuestionPreview type={question.type} options={question.options} />
      </div>
    </div>
  );
}

function TypeBadge({ type }: { type: QuestionType }) {
  const map: Record<QuestionType, { label: string; className: string }> = {
    BOOLEAN: { label: 'True / False', className: 'text-blue-500 bg-blue-500/[0.12]' },
    INPUT: { label: 'Short answer', className: 'text-violet-500 bg-violet-500/[0.12]' },
    CHECKBOX: { label: 'Multiple choice', className: 'text-amber-500 bg-amber-500/[0.12]' },
  };

  const { label, className } = map[type];

  return (
    <span className={`text-[11px] font-semibold tracking-wider uppercase rounded-full py-[0.15rem] px-2 ${className}`}>
      {label}
    </span>
  );
}

function QuestionPreview({ type, options }: { type: QuestionType; options: string[] | null }) {
  if (type === 'BOOLEAN') {
    return (
      <div className="flex gap-6">
        <label className="flex items-center gap-2 text-sm text-muted">
          <span className="w-4 h-4 rounded-full border-2 border-border shrink-0" /> True
        </label>
        <label className="flex items-center gap-2 text-sm text-muted">
          <span className="w-4 h-4 rounded-full border-2 border-border shrink-0" /> False
        </label>
      </div>
    );
  }

  if (type === 'INPUT') {
    return (
      <div className="h-9 rounded-md border border-dashed border-border flex items-center px-3">
        <span className="text-[13px] text-muted">Text answer…</span>
      </div>
    );
  }

  if (type === 'CHECKBOX' && options) {
    return (
      <div className="flex flex-col gap-2">
        {options.map((opt) => (
          <label key={opt} className="flex items-center gap-2 text-sm text-muted">
            <span className="w-4 h-4 rounded border-2 border-border shrink-0" />
            {opt}
          </label>
        ))}
      </div>
    );
  }

  return null;
}
