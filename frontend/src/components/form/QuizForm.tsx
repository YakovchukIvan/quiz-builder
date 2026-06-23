'use client';

import { FormProvider } from 'react-hook-form';
import Link from 'next/link';
import { QUESTION_TYPE_META, QuestionType } from '@/types';
import { useQuizForm } from '@/hooks/use-quiz-form';
import { QuestionItem } from './QuestionItem';
import { Button, buttonVariants } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function QuizForm() {
  const { methods, fields, isPending, addQuestion, removeQuestion, onSubmit, errors, register } = useQuizForm();

  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit}>
        <div className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight text-text m-0">Create Quiz</h1>
          <p className="text-sm text-muted mt-1">Add a title and build your questions</p>
        </div>

        <div className="card p-5 mb-4">
          <label className="label" htmlFor="quiz-title">
            Quiz title
          </label>
          <Input id="quiz-title" placeholder="JavaScript Basics" {...register('title')} />
          {errors.title && <p className="text-xs text-danger mt-1">{errors.title.message}</p>}
        </div>

        {fields.length > 0 && (
          <div className="flex flex-col gap-3 mb-4">
            {fields.map((field, index) => (
              <QuestionItem key={field.id} index={index} onRemove={() => removeQuestion(index)} />
            ))}
          </div>
        )}

        {(errors.questions?.message || errors.questions?.root?.message) && (
          <p className="text-xs text-danger mb-3">
            {(errors.questions.message || errors.questions.root?.message) as string}
          </p>
        )}

        {errors.root && <p className="text-xs text-danger mb-3">{errors.root.message}</p>}

        <div className="card p-5 mb-6">
          <p className="label mb-3">Add question</p>
          <div className="flex gap-2 flex-wrap">
            {(Object.values(QuestionType) as QuestionType[]).map((type) => (
              <Button
                key={type}
                type="button"
                variant="ghost"
                className="text-[13px]"
                onClick={() => addQuestion(type)}
              >
                + {QUESTION_TYPE_META[type].label}
              </Button>
            ))}
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <Link href="/quizzes" className={buttonVariants({ variant: 'ghost' })}>
            Cancel
          </Link>
          <Button type="submit" variant="default" disabled={isPending}>
            {isPending ? 'Creating…' : 'Create Quiz'}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
