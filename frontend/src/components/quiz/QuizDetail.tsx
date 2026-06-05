'use client';

import Link from 'next/link';
import { Quiz } from '@/types';
import { QuestionCard } from './QuestionCard';
import { ChevronLeft } from 'lucide-react';

interface Props {
  quiz: Quiz;
}

export function QuizDetail({ quiz }: Props) {
  return (
    <div className="container">
      <Link href="/quizzes" className="inline-flex items-center gap-1.5 text-sm text-muted no-underline mb-6">
        <ChevronLeft size={16} /> Back to quizzes
      </Link>

      <div className="mb-8">
        <h1 className="text-[1.75rem] font-bold tracking-tight text-text m-0">{quiz.title}</h1>
        <p className="text-sm text-muted mt-1.5">
          {quiz.questions?.length ?? 0} questions · Created {new Date(quiz.createdAt).toLocaleDateString()}
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {quiz.questions?.map((q, i) => (
          <QuestionCard key={q.id} question={q} index={i} />
        ))}
      </div>
    </div>
  );
}
