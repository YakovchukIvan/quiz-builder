import * as React from 'react';
import { SafeAreaView, type Edge } from 'react-native-safe-area-context';
import { cn } from '../../lib/utils';

interface ScreenWrapperProps {
  children: React.ReactNode;
  className?: string;
  edges?: Edge[];
}

export function ScreenWrapper({ children, className, edges = ['left', 'right'] }: ScreenWrapperProps) {
  return (
    <SafeAreaView className={cn('flex-1 bg-bg-light dark:bg-bg-dark', className)} edges={edges}>
      {children}
    </SafeAreaView>
  );
}
