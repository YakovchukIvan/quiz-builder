'use client';

import { useTheme } from 'next-themes';
import { useCallback } from 'react';

export const useThemeToggle = () => {
  const { setTheme, resolvedTheme } = useTheme();

  const toggleTheme = useCallback(() => {
    const nextTheme = resolvedTheme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
  }, [resolvedTheme, setTheme]);

  return { resolvedTheme, toggleTheme };
};
