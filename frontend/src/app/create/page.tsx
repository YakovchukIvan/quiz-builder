import type { Metadata } from 'next';
import { QuizForm } from '@/components/form/QuizForm';

export const metadata: Metadata = {
  title: 'Create Quiz | Quiz Builder',
  description: 'Design and publish a new custom quiz with Boolean, Input, and Checkbox questions.',
};

export default function CreatePage() {
  return (
    <div className="container">
      <QuizForm />
    </div>
  );
}
