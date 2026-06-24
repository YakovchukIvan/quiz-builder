import { Stack } from 'expo-router';
import { Pressable } from 'react-native';
import { Sun, Moon } from 'lucide-react-native';
import { useAppTheme } from '../../../src/hooks/useAppTheme';

function ThemeToggle() {
  const { isDark, toggleTheme } = useAppTheme();
  return (
    <Pressable onPress={toggleTheme} className="mr-4 p-2 active:opacity-60">
      {isDark ? <Sun size={20} color="#e2e8f0" /> : <Moon size={20} color="#0f172a" />}
    </Pressable>
  );
}

export default function QuizzesLayout() {
  const { isDark } = useAppTheme();

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: isDark ? '#0f172a' : '#ffffff',
        },
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 20,
          color: isDark ? '#f8fafc' : '#0f172a',
        },
        headerTintColor: isDark ? '#f8fafc' : '#0f172a',
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerShown: true,
          headerTitle: 'Quiz Builder',
          headerRight: () => <ThemeToggle />,
        }}
      />
      <Stack.Screen
        name="[id]"
        options={{
          headerShown: true,
          headerTitle: 'Quiz Details',
        }}
      />
    </Stack>
  );
}
