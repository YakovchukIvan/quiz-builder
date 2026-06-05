'use client';

import { useFormContext } from 'react-hook-form';
import { QUESTION_TYPE_META, QuestionType } from '@/types';
import type { CreateQuizSchema } from '@/lib/schemas';

type Props = {
  index: number;
  onRemove: () => void;
};

export function QuestionItem({ index, onRemove }: Props) {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<CreateQuizSchema>();

  const type = watch(`questions.${index}.type`);
  const options = watch(`questions.${index}.options`) ?? [];
  const questionError = errors.questions?.[index];
  const optionErrors =
    questionError && 'options' in questionError ? (questionError.options as Record<number, { message?: string }>) : {};

  const addOption = () => {
    setValue(`questions.${index}.options`, [...options, ''], { shouldValidate: true });
  };

  const removeOption = (idx: number) => {
    setValue(
      `questions.${index}.options`,
      options.filter((_, i) => i !== idx),
      { shouldValidate: true },
    );
  };

  return (
    <div className="card p-5">
      <div className="flex items-center gap-3 mb-3.5">
        <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold text-muted shrink-0 border border-border">
          {index + 1}
        </span>
        <span className="text-xs font-semibold tracking-wider uppercase text-muted">
          {QUESTION_TYPE_META[type].label}
        </span>
        <div className="flex-1" />
        <button type="button" className="btn btn-danger py-1 px-2 text-xs" onClick={onRemove}>
          ✕ Remove
        </button>
      </div>

      <div className="mb-3.5">
        <label className="label">Question text</label>
        <input className="input" placeholder="Enter your question…" {...register(`questions.${index}.text`)} />
        {questionError && 'text' in questionError && questionError.text?.message && (
          <p className="text-xs text-danger mt-1">{questionError.text.message as string}</p>
        )}
      </div>

      {type === QuestionType.BOOLEAN && (
        <div className="flex gap-4">
          {['True', 'False'].map((opt) => (
            <div key={opt} className="flex items-center gap-2 text-sm text-muted">
              <span className="w-4 h-4 rounded-full border-2 border-border shrink-0" />
              <span>{opt}</span>
            </div>
          ))}
        </div>
      )}

      {type === QuestionType.INPUT && (
        <div className="h-9 rounded-md border border-dashed border-border flex items-center px-3">
          <span className="text-[13px] text-muted">Text answer field</span>
        </div>
      )}

      {type === QuestionType.CHECKBOX && (
        <div className="flex flex-col gap-2">
          {options.map((_, idx) => (
            <div key={idx} className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <input
                  className={`input flex-1 ${optionErrors[idx] ? 'border-danger' : ''}`}
                  placeholder={`Option ${idx + 1}`}
                  {...register(`questions.${index}.options.${idx}`)}
                />
                {options.length > 2 && (
                  <button
                    type="button"
                    className="btn btn-danger py-1 px-1.5 shrink-0"
                    onClick={() => removeOption(idx)}
                  >
                    ✕
                  </button>
                )}
              </div>
              {optionErrors[idx]?.message && <p className="text-xs text-danger">{optionErrors[idx].message}</p>}
            </div>
          ))}

          {questionError && 'options' in questionError && questionError.options?.root?.message && (
            <p className="text-xs text-danger">{questionError.options.root.message as string}</p>
          )}

          <button type="button" className="btn btn-ghost self-start text-[13px] mt-1" onClick={addOption}>
            + Add option
          </button>
        </div>
      )}
    </div>
  );
}
