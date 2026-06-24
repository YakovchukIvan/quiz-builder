import * as React from 'react';
import { Pressable, Text, type PressableProps } from 'react-native';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const buttonVariants = cva(
  'active:opacity-80 flex-row items-center justify-center rounded-xl py-3 px-4 gap-2',
  {
    variants: {
      variant: {
        default: 'bg-slate-950 dark:bg-slate-50',
        destructive: 'bg-red-600 dark:bg-red-700',
        outline: 'border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

const buttonTextVariants = cva(
  'text-sm font-semibold text-center',
  {
    variants: {
      variant: {
        default: 'text-white dark:text-slate-900',
        destructive: 'text-white',
        outline: 'text-slate-900 dark:text-slate-50',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface ButtonProps
  extends PressableProps,
    VariantProps<typeof buttonVariants> {
  children?: React.ReactNode;
  textClassName?: string;
  title?: string;
}

export function Button({
  className,
  textClassName,
  variant,
  title,
  children,
  ...props
}: ButtonProps) {
  return (
    <Pressable
      className={cn(buttonVariants({ variant }), className)}
      {...props}
    >
      {title ? (
        <Text className={cn(buttonTextVariants({ variant }), textClassName)}>
          {title}
        </Text>
      ) : typeof children === 'string' ? (
        <Text className={cn(buttonTextVariants({ variant }), textClassName)}>
          {children}
        </Text>
      ) : (
        children
      )}
    </Pressable>
  );
}
