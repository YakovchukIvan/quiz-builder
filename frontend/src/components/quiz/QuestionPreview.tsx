import { QuestionType } from '@/types';

type Props = {
  type: QuestionType;
  options: string[] | null;
};

export function QuestionPreview({ type, options }: Props) {
  if (type === QuestionType.BOOLEAN) {
    return (
      <div className="flex gap-4">
        {['True', 'False'].map((opt) => (
          <div key={opt} className="flex items-center gap-2 text-sm text-muted">
            <span className="w-4 h-4 rounded-full border-2 border-border shrink-0" />
            <span>{opt}</span>
          </div>
        ))}
      </div>
    );
  }

  if (type === QuestionType.INPUT) {
    return (
      <div className="h-9 rounded-md border border-dashed border-border flex items-center px-3">
        <span className="text-[13px] text-muted">Text answer…</span>
      </div>
    );
  }

  if (type === QuestionType.CHECKBOX && options) {
    return (
      <div className="flex flex-col gap-2">
        {options.map((opt, idx) => (
          <div key={idx} className="flex items-center gap-2 text-sm text-muted">
            <span className="w-4 h-4 rounded border-2 border-border shrink-0" />
            <span>{opt}</span>
          </div>
        ))}
      </div>
    );
  }

  return null;
}
