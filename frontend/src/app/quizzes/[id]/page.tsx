import { notFound } from 'next/navigation';
import { getQuiz } from '@/lib/api';
import { QuizDetail } from '@/components/quiz/QuizDetail';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function QuizDetailPage({ params }: Props) {
  const { id } = await params;
  const quiz = await getQuiz(id);

  if (!quiz) notFound();

  return <QuizDetail quiz={quiz} />;
}
