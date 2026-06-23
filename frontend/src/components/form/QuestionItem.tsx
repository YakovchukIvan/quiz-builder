'use client';

import { useFormContext } from 'react-hook-form';
import { QUESTION_TYPE_META, QuestionType } from '@/types';
import type { CreateQuizSchema } from '@/lib/schemas';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card } from '@/components/ui/card';

type Props = {
  index: number;
  onRemove: () => void;
  onAddOption: (questionIndex: number) => void;
  onRemoveOption: (questionIndex: number, optionIndex: number) => void;
};

export function QuestionItem({ index, onRemove, onAddOption, onRemoveOption }: Props) {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<CreateQuizSchema>();

  const type = watch(`questions.${index}.type`);
  const options = watch(`questions.${index}.options`) ?? [];
  const questionError = errors.questions?.[index];
  const optionErrors =
    questionError && 'options' in questionError ? (questionError.options as Record<number, { message?: string }>) : {};

  const addOption = () => {
    onAddOption(index);
  };

  const removeOption = (idx: number) => {
    onRemoveOption(index, idx);
  };

  return (
    <Card className="p-5">
      <div className="flex items-center gap-3 mb-3.5">
        <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold text-muted shrink-0 border border-border">
          {index + 1}
        </span>
        <span className="text-xs font-semibold tracking-wider uppercase text-muted">
          {QUESTION_TYPE_META[type].label}
        </span>
        <div className="flex-1" />
        <Button type="button" variant="destructive" size="sm" onClick={onRemove}>
          ✕ Remove
        </Button>
      </div>

      <div className="mb-3.5">
        <label className="label">Question text</label>
        <Input placeholder="Enter your question…" {...register(`questions.${index}.text`)} />
        {questionError && 'text' in questionError && questionError.text?.message && (
          <p className="text-xs text-danger mt-1">{questionError.text.message as string}</p>
        )}
      </div>

      {type === QuestionType.BOOLEAN && (
        <RadioGroup defaultValue="True" className="flex flex-row gap-4" disabled>
          {['True', 'False'].map((opt) => (
            <div key={opt} className="flex items-center gap-2 text-sm text-muted">
              <RadioGroupItem value={opt} id={`bool-${index}-${opt}`} />
              <label htmlFor={`bool-${index}-${opt}`}>{opt}</label>
            </div>
          ))}
        </RadioGroup>
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
                <Checkbox id={`check-${index}-${idx}`} disabled />
                <Input
                  className={optionErrors[idx] ? 'border-danger' : ''}
                  placeholder={`Option ${idx + 1}`}
                  {...register(`questions.${index}.options.${idx}`)}
                />
                {options.length > 2 && (
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="h-9 w-9 shrink-0"
                    onClick={() => removeOption(idx)}
                  >
                    ✕
                  </Button>
                )}
              </div>
              {optionErrors[idx]?.message && <p className="text-xs text-danger">{optionErrors[idx].message}</p>}
            </div>
          ))}

          {questionError &&
            'options' in questionError &&
            (questionError.options?.message || questionError.options?.root?.message) && (
              <p className="text-xs text-danger">
                {(questionError.options.message || questionError.options.root?.message) as string}
              </p>
            )}

          <Button type="button" variant="ghost" size="sm" className="self-start mt-1" onClick={addOption}>
            + Add option
          </Button>
        </div>
      )}
    </Card>
  );
}
