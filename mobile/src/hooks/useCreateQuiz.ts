import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createQuizSchema, type CreateQuizSchema } from '../lib/schemas';
import { createQuiz as apiCreateQuiz } from '../lib/api';
import { useState } from 'react';
import { router } from 'expo-router';
import { QuizListItem } from '../lib/types';

export function useCreateQuiz(onCreated?: (quiz: QuizListItem) => void) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const methods = useForm<CreateQuizSchema>({
    resolver: zodResolver(createQuizSchema),
    defaultValues: {
      title: '',
      questions: [],
    },
  });

  const { control, handleSubmit, setValue, getValues, formState: { errors } } = methods;

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'questions',
  });

  const addQuestion = (type: 'BOOLEAN' | 'INPUT' | 'CHECKBOX') => {
    append({
      id: Math.random().toString(),
      type,
      text: '',
      options: type === 'CHECKBOX' ? ['', ''] : [],
    });
  };

  const removeQuestion = (index: number) => {
    remove(index);
  };

  const addOption = (questionIndex: number) => {
    const questions = getValues('questions');
    const question = questions[questionIndex];
    if (question && question.type === 'CHECKBOX') {
      const currentOptions = question.options || [];
      setValue(`questions.${questionIndex}.options`, [...currentOptions, ''], {
        shouldValidate: true,
      });
    }
  };

  const removeOption = (questionIndex: number, optionIndex: number) => {
    const questions = getValues('questions');
    const question = questions[questionIndex];
    if (question && question.type === 'CHECKBOX') {
      const currentOptions = question.options || [];
      setValue(
        `questions.${questionIndex}.options`,
        currentOptions.filter((_, i) => i !== optionIndex),
        { shouldValidate: true }
      );
    }
  };

  const onSubmit = async (data: CreateQuizSchema) => {
    setLoading(true);
    setError(null);
    try {
      const payload = {
        title: data.title,
        questions: data.questions.map((q) => ({
          type: q.type,
          text: q.text,
          options: q.type === 'CHECKBOX' ? q.options : undefined,
        })),
      };
      const created = await apiCreateQuiz(payload);
      const quizListItem: QuizListItem = {
        id: created.id,
        title: created.title,
        questionCount: created.questions?.length ?? 0,
        createdAt: created.createdAt,
      };
      onCreated?.(quizListItem);
      methods.reset();
      router.push('/(tabs)/quizzes');
    } catch (e: any) {
      setError(e.message || 'Failed to create quiz');
      methods.setError('root', {
        type: 'server',
        message: e.message || 'Failed to create quiz',
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    methods,
    fields,
    addQuestion,
    removeQuestion,
    addOption,
    removeOption,
    loading,
    error,
    onSubmit: handleSubmit(onSubmit),
    errors,
  };
}
