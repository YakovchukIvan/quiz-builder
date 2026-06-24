import * as React from 'react';
import { View, Text, type ViewProps, type TextProps } from 'react-native';
import { cn } from '../../lib/utils';

export function Card({ className, ...props }: ViewProps) {
  return (
    <View
      className={cn('rounded-2xl border border-border-light dark:border-border-dark bg-card-light dark:bg-card-dark shadow-sm overflow-hidden', className)}
      {...props}
    />
  );
}

export function CardHeader({ className, ...props }: ViewProps) {
  return (
    <View
      className={cn('p-5 gap-1.5', className)}
      {...props}
    />
  );
}

export function CardTitle({ className, ...props }: TextProps) {
  return (
    <Text
      className={cn('text-lg font-semibold leading-none tracking-tight text-text-main-light dark:text-text-main-dark', className)}
      {...props}
    />
  );
}

export function CardDescription({ className, ...props }: TextProps) {
  return (
    <Text
      className={cn('text-sm text-text-muted-light dark:text-text-muted-dark', className)}
      {...props}
    />
  );
}

export function CardContent({ className, ...props }: ViewProps) {
  return (
    <View
      className={cn('p-5 pt-0', className)}
      {...props}
    />
  );
}

export function CardFooter({ className, ...props }: ViewProps) {
  return (
    <View
      className={cn('flex-row items-center p-5 pt-0', className)}
      {...props}
    />
  );
}
