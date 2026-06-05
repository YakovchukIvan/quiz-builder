import Link from 'next/link';
import { ThemeToggle } from './ThemeToggle';

export function Navbar() {
  return (
    <header className="border-b border-border bg-bg sticky top-0 z-50">
      <div className="container flex items-center h-14 gap-4">
        <Link href="/quizzes" className="font-bold text-base text-text no-underline tracking-tight shrink-0">
          Quiz Builder
        </Link>

        <div className="flex-1" />

        <ThemeToggle />

        <Link href="/create" className="btn btn-primary shrink-0">
          + Create Quiz
        </Link>
      </div>
    </header>
  );
}
