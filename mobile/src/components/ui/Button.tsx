import * as React from 'react';
import { Pressable, Text, type PressableProps } from 'react-native';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const buttonVariants = cva(
  'active:opacity-80 flex-row items-center justify-center rounded-xl py-3 px-4 gap-2',
  {
    variants: {
      variant: {
        default: 'bg-primary',
        destructive: 'bg-destructive',
        outline: 'border border-border-light bg-card-light dark:border-border-dark dark:bg-card-dark',
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
        default: 'text-white',
        destructive: 'text-white',
        outline: 'text-text-main-light dark:text-text-main-dark',
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
