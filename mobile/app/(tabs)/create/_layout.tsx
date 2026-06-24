import { Stack } from 'expo-router';
import { useAppTheme } from '../../../src/hooks/useAppTheme';
import { ThemeToggle } from '../../../src/components/ui/ThemeToggle';

export default function CreateLayout() {
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
          headerTitle: 'Quiz Builder',
          headerRight: () => <ThemeToggle />,
        }}
      />
    </Stack>
  );
}
