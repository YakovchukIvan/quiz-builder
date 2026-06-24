import React, { createContext, useContext, useState, useEffect } from 'react';
import { Appearance, ColorSchemeName } from 'react-native';
import { colorScheme as nwColorScheme } from 'nativewind';

interface ThemeContextType {
  colorScheme: ColorSchemeName;
  isDark: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [colorScheme, setColorScheme] = useState<ColorSchemeName>(Appearance.getColorScheme());

  useEffect(() => {
    const initialScheme = Appearance.getColorScheme();
    nwColorScheme.set(initialScheme ?? 'light');

    const sub = Appearance.addChangeListener(({ colorScheme: newScheme }) => {
      setColorScheme(newScheme);
      nwColorScheme.set(newScheme ?? 'light');
    });
    return () => sub.remove();
  }, []);

  const toggleTheme = () => {
    const next = colorScheme === 'dark' ? 'light' : 'dark';
    setColorScheme(next);
    nwColorScheme.set(next);
  };

  const isDark = colorScheme === 'dark';

  return (
    <ThemeContext.Provider value={{ colorScheme, isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useAppTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useAppTheme must be used within a ThemeProvider');
  }
  return context;
}
