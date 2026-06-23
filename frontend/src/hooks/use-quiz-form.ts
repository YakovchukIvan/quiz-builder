import { useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { createQuizSchema, type CreateQuizSchema } from '@/lib/schemas';
import { createQuizAction } from '@/lib/actions';
import { QuestionType } from '@/types';

export function useQuizForm() {
  const router = useRouter();
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

  const removeQuestion = (index: number) => {
    remove(index);
  };

  const addOption = (questionIndex: number) => {
    const questions = methods.getValues('questions');
    const question = questions[questionIndex];
    if (question && question.type === QuestionType.CHECKBOX) {
      const currentOptions = question.options || [];
      methods.setValue(`questions.${questionIndex}.options`, [...currentOptions, ''], {
        shouldValidate: true,
      });
    }
  };

  const removeOption = (questionIndex: number, optionIndex: number) => {
    const questions = methods.getValues('questions');
    const question = questions[questionIndex];
    if (question && question.type === QuestionType.CHECKBOX) {
      const currentOptions = question.options || [];
      methods.setValue(
        `questions.${questionIndex}.options`,
        currentOptions.filter((_, i) => i !== optionIndex),
        { shouldValidate: true },
      );
    }
  };

  const onSubmit = (data: CreateQuizSchema) => {
    startTransition(async () => {
      const result = await createQuizAction({
        title: data.title,
        questions: data.questions.map(({ type, text, options }) => ({
          type,
          text,
          options: type === QuestionType.CHECKBOX ? options : undefined,
        })),
      });

      if (result.success) {
        router.push('/quizzes');
      } else {
        methods.setError('root', {
          type: 'server',
          message: result.error || 'Failed to create quiz',
        });
      }
    });
  };

  return {
    methods,
    fields,
    isPending,
    addQuestion,
    removeQuestion,
    addOption,
    removeOption,
    onSubmit: methods.handleSubmit(onSubmit),
    errors: methods.formState.errors,
    register: methods.register,
  };
}
