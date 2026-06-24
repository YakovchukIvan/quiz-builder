import { Stack } from 'expo-router';
import { Pressable } from 'react-native';
import { Sun, Moon } from 'lucide-react-native';
import { useAppTheme } from '../../../src/hooks/useAppTheme';

function ThemeToggle() {
  const { isDark, toggleTheme } = useAppTheme();
  return (
    <Pressable onPress={toggleTheme} className="mr-4 p-2 active:opacity-60">
      {isDark ? <Sun size={20} color="#f7f8fc" /> : <Moon size={20} color="#141628" />}
    </Pressable>
  );
}

export default function QuizzesLayout() {
  const { isDark } = useAppTheme();

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: isDark ? '#1e2030' : '#ffffff',
        },
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 20,
          color: isDark ? '#f7f8fc' : '#141628',
        },
        headerTintColor: isDark ? '#f7f8fc' : '#141628',
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
