import { useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTransition } from 'react';
import { createQuizSchema, type CreateQuizSchema } from '@/lib/schemas';
import { createQuizAction } from '@/lib/actions';
import { QuestionType } from '@/types';

export function useQuizForm() {
  const [isPending, startTransition] = useTransition();

  const methods = useForm<CreateQuizSchema>({
    resolver: zodResolver(createQuizSchema),
    defaultValues: {
      title: '',
      questions: [],
    },
  });

  const { fields, append, remove } = useFieldArray<CreateQuizSchema>({
    control: methods.control,
    name: 'questions',
  });

  const addQuestion = (type: QuestionType) => {
    append({
      id: crypto.randomUUID(),
      type,
      text: '',
      options: type === QuestionType.CHECKBOX ? ['', ''] : [],
    });
  };

  const onSubmit = (data: CreateQuizSchema) => {
    startTransition(async () => {
      await createQuizAction({
        title: data.title,
        questions: data.questions.map(({ type, text, options }) => ({
          type,
          text,
          options: type === QuestionType.CHECKBOX ? options : undefined,
        })),
      });
    });
  };

  return {
    methods,
    fields,
    isPending,
    addQuestion,
    removeQuestion: remove,
    onSubmit: methods.handleSubmit(onSubmit),
    errors: methods.formState.errors,
    register: methods.register,
  };
}
