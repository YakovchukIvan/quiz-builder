import { z } from 'zod';

const optionSchema = z.string().min(1, 'Option cannot be empty');

const questionSchema = z.discriminatedUnion('type', [
  z.object({
    id: z.string(),
    type: z.literal('BOOLEAN'),
    text: z.string().min(1, 'Question text is required'),
    options: z.array(z.string()).optional(),
  }),
  z.object({
    id: z.string(),
    type: z.literal('INPUT'),
    text: z.string().min(1, 'Question text is required'),
    options: z.array(z.string()).optional(),
  }),
  z.object({
    id: z.string(),
    type: z.literal('CHECKBOX'),
    text: z.string().min(1, 'Question text is required'),
    options: z.array(optionSchema).min(2, 'Add at least 2 options'),
  }),
]);

export const createQuizSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title is too long'),
  questions: z.array(questionSchema).min(1, 'At least one question is required'),
});

export type CreateQuizSchema = z.infer<typeof createQuizSchema>;
