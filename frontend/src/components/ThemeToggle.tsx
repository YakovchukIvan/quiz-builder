'use client';

import { useThemeToggle } from '@/hooks/use-theme-toggle';

export function ThemeToggle() {
  const { resolvedTheme, toggleTheme } = useThemeToggle();

  const isDark = resolvedTheme === 'dark';

  return (
    <button
      className="btn btn-ghost w-9 h-9 p-0 flex items-center justify-center"
      onClick={toggleTheme}
      aria-label="Toggle theme"
    >
      {isDark ? '☀️' : '🌙'}
    </button>
  );
}
