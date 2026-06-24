import { Tabs } from 'expo-router';
import { ClipboardList, Plus } from 'lucide-react-native';
import { useAppTheme } from '../../src/hooks/useAppTheme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { QuizzesProvider } from '../../src/context/QuizzesContext';

export default function TabsLayout() {
  const { isDark } = useAppTheme();
  const insets = useSafeAreaInsets();

  return (
    <QuizzesProvider>
      <Tabs
        screenOptions={{
          headerShown: false, // all headers handled by nested Stacks
          tabBarActiveTintColor: isDark ? '#f7f8fc' : '#141628',
          tabBarInactiveTintColor: '#9ca3af',
          tabBarStyle: {
            backgroundColor: isDark ? '#1e2030' : '#ffffff',
            borderTopWidth: 1,
            borderTopColor: isDark ? '#2a2d3e' : '#e4e7f0',
            height: 45 + insets.bottom,
            paddingBottom: insets.bottom + 5,
            paddingTop: 5,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '500',
          },
        }}
      >
        <Tabs.Screen
          name="quizzes"
          options={{
            title: 'Quizzes',
            tabBarIcon: ({ color, size }) => <ClipboardList color={color} size={size} />,
          }}
        />
        <Tabs.Screen
          name="create"
          options={{
            title: 'Create Quiz',
            tabBarIcon: ({ color, size }) => <Plus color={color} size={size} />,
          }}
        />
      </Tabs>
    </QuizzesProvider>
  );
}
