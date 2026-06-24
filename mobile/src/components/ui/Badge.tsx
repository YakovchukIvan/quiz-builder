import * as React from 'react';
import { View, Text, type ViewProps } from 'react-native';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const badgeVariants = cva(
  'inline-flex flex-row items-center rounded-full px-2.5 py-0.5 border',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-text-main-light dark:bg-text-main-dark',
        secondary: 'border-transparent bg-bg-light dark:bg-border-dark',
        destructive: 'border-transparent bg-destructive/10 dark:bg-destructive/20',
        outline: 'border-border-light dark:border-border-dark bg-transparent',
        boolean: 'border-transparent bg-blue-50 dark:bg-blue-950/30',
        input: 'border-transparent bg-violet-50 dark:bg-violet-950/30',
        checkbox: 'border-transparent bg-amber-50 dark:bg-amber-950/30',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

const badgeTextVariants = cva('text-xs font-semibold leading-none py-0.5', {
  variants: {
    variant: {
      default: 'text-card-light dark:text-card-dark',
      secondary: 'text-text-main-light dark:text-text-main-dark',
      destructive: 'text-destructive dark:text-red-400',
      outline: 'text-text-main-light dark:text-text-main-dark',
      boolean: 'text-blue-600 dark:text-blue-400',
      input: 'text-violet-600 dark:text-violet-400',
      checkbox: 'text-amber-600 dark:text-amber-400',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export interface BadgeProps
  extends ViewProps,
    VariantProps<typeof badgeVariants> {
  children?: React.ReactNode;
  textClassName?: string;
  label?: string;
}

export function Badge({
  className,
  textClassName,
  variant,
  label,
  children,
  ...props
}: BadgeProps) {
  return (
    <View
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    >
      {label ? (
        <Text className={cn(badgeTextVariants({ variant }), textClassName)}>
          {label}
        </Text>
      ) : typeof children === 'string' ? (
        <Text className={cn(badgeTextVariants({ variant }), textClassName)}>
          {children}
        </Text>
      ) : (
        children
      )}
    </View>
  );
}
