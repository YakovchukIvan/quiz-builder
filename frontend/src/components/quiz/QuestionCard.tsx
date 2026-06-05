import { Question } from '@/types';
import { TypeBadge } from './TypeBadge';
import { QuestionPreview } from './QuestionPreview';

type Props = {
  question: Question;
  index: number;
};

export function QuestionCard({ question, index }: Props) {
  return (
    <div className="card p-5">
      <div className="flex gap-3 mb-3.5">
        <span className="shrink-0 w-6 h-6 rounded-full border border-border flex items-center justify-center text-xs font-semibold text-muted">
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
