import React, { createContext, useContext, useRef, useState, useEffect } from 'react';
import { Appearance, ColorSchemeName } from 'react-native';
import { useColorScheme as useNWColorScheme } from 'nativewind';
import { ThemeTransitionOverlay, ThemeTransitionOverlayRef } from '../components/ui/ThemeTransitionOverlay';

interface ThemeContextType {
  colorScheme: ColorSchemeName;
  isDark: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [colorScheme, setColorScheme] = useState<ColorSchemeName>(Appearance.getColorScheme());
  const { setColorScheme: setNWColorScheme } = useNWColorScheme();
  const overlayRef = useRef<ThemeTransitionOverlayRef>(null);

  const targetThemeRef = useRef<'light' | 'dark' | null>(null);
  const isManualToggleRef = useRef(false);

  useEffect(() => {
    const initialScheme = Appearance.getColorScheme();
    setNWColorScheme(initialScheme || 'light');

    const sub = Appearance.addChangeListener(({ colorScheme: newScheme }) => {
      if (isManualToggleRef.current) {
        // Skip updating states if it's already updated manually.
        // Just reset the flag.
        isManualToggleRef.current = false;
        return;
      }
      setColorScheme(newScheme);
      setNWColorScheme(newScheme || 'light');
    });
    return () => sub.remove();
  }, [setNWColorScheme]);

  const toggleTheme = () => {
    const next = colorScheme === 'dark' ? 'light' : 'dark';
    targetThemeRef.current = next;
    console.log('Theme switching to (animated):', next);
    if (overlayRef.current) {
      overlayRef.current.startTransition(next);
    } else {
      isManualToggleRef.current = true;
      Appearance.setColorScheme(next);
      setColorScheme(next);
      setNWColorScheme(next);
    }
  };

  const handleTransitionEnd = () => {
    const next = targetThemeRef.current;
    if (!next) return;
    console.log('Theme switching to:', next);
    isManualToggleRef.current = true;
    Appearance.setColorScheme(next);
    setColorScheme(next);
    setNWColorScheme(next);
  };

  const isDark = colorScheme === 'dark';

  return (
    <ThemeContext.Provider value={{ colorScheme, isDark, toggleTheme }}>
      {children}
      <ThemeTransitionOverlay
        ref={overlayRef}
        currentTheme={colorScheme}
        onTransitionEnd={handleTransitionEnd}
      />
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
