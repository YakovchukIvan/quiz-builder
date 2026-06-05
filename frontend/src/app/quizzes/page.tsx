import { getQuizzes } from '@/lib/api';
import { QuizListClient } from '@/components/quizzes/QuizListClient';

type Props = {
  searchParams: Promise<{ page?: string }>;
};

export default async function QuizzesPage({ searchParams }: Props) {
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;
  const pageSize = 10;

  const paginatedData = await getQuizzes(currentPage, pageSize);

  return <QuizListClient paginatedData={paginatedData} />;
}
