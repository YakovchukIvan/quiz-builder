import * as React from 'react';
import { TextInput, type TextInputProps } from 'react-native';
import { cn } from '../../lib/utils';
import { useAppTheme } from '../../hooks/useAppTheme';

export interface InputProps extends TextInputProps {}

export const Input = React.forwardRef<TextInput, InputProps>(
  ({ className, placeholderTextColor, ...props }, ref) => {
    const { isDark } = useAppTheme();
    const defaultPlaceholderColor = isDark ? '#9ca3af' : '#6b7280';

    return (
      <TextInput
        ref={ref}
        placeholderTextColor={placeholderTextColor || defaultPlaceholderColor}
        className={cn(
          'w-full rounded-xl border border-border-light bg-card-light px-4 py-3 text-sm text-text-main-light',
          'dark:border-border-dark dark:bg-card-dark dark:text-text-main-dark',
          'focus:border-text-muted-light dark:focus:border-text-muted-dark',
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';
