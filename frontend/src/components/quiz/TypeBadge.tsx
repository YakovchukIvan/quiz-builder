import { QuestionType, QUESTION_TYPE_META } from '@/types';

export function TypeBadge({ type }: { type: QuestionType }) {
  const { label, badgeClass } = QUESTION_TYPE_META[type];

  return (
    <span className={`text-[11px] font-semibold tracking-wider uppercase rounded-full py-[0.15rem] px-2 ${badgeClass}`}>
      {label}
    </span>
  );
}
