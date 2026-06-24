import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { View, useWindowDimensions, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import { ColorSchemeName } from 'react-native';

interface ThemeTransitionOverlayProps {
  currentTheme: ColorSchemeName;
  onTransitionEnd: () => void;
}

export interface ThemeTransitionOverlayRef {
  startTransition: (targetTheme: 'light' | 'dark') => void;
}

export const ThemeTransitionOverlay = forwardRef<
  ThemeTransitionOverlayRef,
  ThemeTransitionOverlayProps
>(({ onTransitionEnd }, ref) => {
  const { width, height } = useWindowDimensions();
  const [animatingTheme, setAnimatingTheme] = useState<'light' | 'dark' | null>(null);
  
  const scale = useSharedValue(0);
  const diagonal = Math.sqrt(width * width + height * height);
  const circleSize = diagonal * 2;

  useImperativeHandle(ref, () => ({
    startTransition: (targetTheme) => {
      setAnimatingTheme(targetTheme);
      scale.value = 0;
      scale.value = withTiming(1, { duration: 600 }, (finished) => {
        if (finished) {
          runOnJS(handleAnimationEnd)();
        }
      });
    },
  }));

  const handleAnimationEnd = () => {
    onTransitionEnd();
    setAnimatingTheme(null);
    scale.value = 0;
  };

  const animatedStyle = useAnimatedStyle(() => {
    if (!animatingTheme) return { display: 'none' };

    // Set center coordinate based on transition direction:
    // - Light to Dark (target is dark): Top-Right corner (width, 0)
    // - Dark to Light (target is light): Bottom-Left corner (0, height)
    const isTargetDark = animatingTheme === 'dark';
    const top = isTargetDark ? -diagonal : height - diagonal;
    const left = isTargetDark ? width - diagonal : -diagonal;

    return {
      width: circleSize,
      height: circleSize,
      borderRadius: diagonal,
      position: 'absolute',
      top,
      left,
      backgroundColor: animatingTheme === 'dark' ? '#0f172a' : '#f8fafc',
      transform: [{ scale: scale.value }],
      zIndex: 99999,
    };
  });

  if (!animatingTheme) return null;

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="auto">
      <Animated.View style={animatedStyle} />
    </View>
  );
});

ThemeTransitionOverlay.displayName = 'ThemeTransitionOverlay';
