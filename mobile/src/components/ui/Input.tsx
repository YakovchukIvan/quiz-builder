import * as React from 'react';
import { TextInput, type TextInputProps } from 'react-native';
import { cn } from '../../lib/utils';

export interface InputProps extends TextInputProps {}

export const Input = React.forwardRef<TextInput, InputProps>(
  ({ className, placeholderTextColor, ...props }, ref) => {
    return (
      <TextInput
        ref={ref}
        placeholderTextColor={placeholderTextColor || '#94a3b8'}
        className={cn(
          'w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900',
          'dark:border-slate-800 dark:bg-slate-900 dark:text-slate-50 dark:placeholder-slate-500',
          'focus:border-slate-400 dark:focus:border-slate-600',
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';
