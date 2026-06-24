import React from 'react';
import { Pressable } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withSpring } from 'react-native-reanimated';
import { Sun, Moon } from 'lucide-react-native';
import { useAppTheme } from '../../hooks/useAppTheme';

export function ThemeToggle() {
  const { isDark, toggleTheme } = useAppTheme();
  const scale = useSharedValue(1);
  const rotation = useSharedValue(0);

  const containerStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const iconStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  const handlePress = () => {
    scale.value = withTiming(0.85, { duration: 80 }, () => {
      scale.value = withSpring(1.0);
    });
    rotation.value = withTiming(rotation.value + 360, { duration: 400 });
    setTimeout(() => toggleTheme(), 150);
  };

  return (
    <Animated.View style={[containerStyle, { marginRight: 8 }]}>
      <Pressable onPress={handlePress} style={{ padding: 8 }} className="active:opacity-60">
        <Animated.View style={iconStyle}>
          {isDark ? <Sun size={20} color="#f7f8fc" /> : <Moon size={20} color="#141628" />}
        </Animated.View>
      </Pressable>
    </Animated.View>
  );
}
