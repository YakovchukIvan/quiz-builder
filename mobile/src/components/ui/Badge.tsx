import * as React from 'react';
import { View, Text, type ViewProps } from 'react-native';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const badgeVariants = cva(
  'inline-flex flex-row items-center rounded-full px-2.5 py-0.5 border',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-slate-900 dark:bg-slate-50',
        secondary: 'border-transparent bg-slate-100 dark:bg-slate-800',
        destructive: 'border-transparent bg-red-100 dark:bg-red-950/30',
        outline: 'border-slate-200 dark:border-slate-800 bg-transparent',
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
      default: 'text-slate-50 dark:text-slate-900',
      secondary: 'text-slate-900 dark:text-slate-50',
      destructive: 'text-red-700 dark:text-red-400',
      outline: 'text-slate-900 dark:text-slate-50',
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
