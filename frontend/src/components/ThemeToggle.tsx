'use client';

import { useThemeToggle } from '@/hooks/use-theme-toggle';
import { Sun, Moon } from 'lucide-react';

export function ThemeToggle() {
  const { toggleTheme } = useThemeToggle();

  return (
    <button
      className="btn btn-ghost w-9 h-9 p-0 flex items-center justify-center select-none"
      onClick={toggleTheme}
      aria-label="Toggle theme"
      title="Toggle theme"
    >
      <Sun size={18} className="hidden dark:block text-text transition-transform duration-200 hover:rotate-45" />

      <Moon size={18} className="block dark:hidden text-text transition-transform duration-200 hover:-rotate-12" />
    </button>
  );
}
