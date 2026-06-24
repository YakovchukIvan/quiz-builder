import { Tabs } from 'expo-router';
import { ClipboardList, Plus, Sun, Moon } from 'lucide-react-native';
import { Pressable } from 'react-native';
import { useAppTheme } from '../../src/hooks/useAppTheme';

function ThemeToggle() {
  const { isDark, toggleTheme } = useAppTheme();
  return (
    <Pressable onPress={toggleTheme} className="mr-4 p-2 active:opacity-60">
      {isDark ? <Sun size={20} color="#e2e8f0" /> : <Moon size={20} color="#0f172a" />}
    </Pressable>
  );
}

export default function TabsLayout() {
  const { isDark } = useAppTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        headerTitle: 'Quiz Builder',
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 20,
          color: isDark ? '#f8fafc' : '#0f172a',
        },
        headerStyle: {
          backgroundColor: isDark ? '#0f172a' : '#ffffff',
          borderBottomWidth: 1,
          borderBottomColor: isDark ? '#1e293b' : '#f1f5f9',
          elevation: 0,
          shadowOpacity: 0,
        },
        headerRight: () => <ThemeToggle />,
        tabBarActiveTintColor: isDark ? '#f8fafc' : '#0f172a',
        tabBarInactiveTintColor: '#94a3b8',
        tabBarStyle: {
          backgroundColor: isDark ? '#0f172a' : '#ffffff',
          borderTopWidth: 1,
          borderTopColor: isDark ? '#1e293b' : '#f1f5f9',
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
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
          headerShown: false, // The nested stack in quizzes handles its own headers
          title: 'Quizzes',
          tabBarIcon: ({ color, size }) => (
            <ClipboardList
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          title: 'Create Quiz',
          tabBarIcon: ({ color, size }) => (
            <Plus
              color={color}
              size={size}
            />
          ),
        }}
      />
    </Tabs>
  );
}
