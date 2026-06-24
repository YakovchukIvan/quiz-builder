import { Tabs } from 'expo-router';
import { ClipboardList, Plus, Sun, Moon } from 'lucide-react-native';
import { Pressable } from 'react-native';
import { useAppTheme } from '../../src/hooks/useAppTheme';

function ThemeToggle() {
  const { isDark, toggleTheme } = useAppTheme();
  return (
    <Pressable onPress={toggleTheme} className="mr-4 p-2 active:opacity-60">
      {isDark ? <Sun size={20} color="#f7f8fc" /> : <Moon size={20} color="#141628" />}
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
          color: isDark ? '#f7f8fc' : '#141628',
        },
        headerStyle: {
          backgroundColor: isDark ? '#1e2030' : '#ffffff',
          borderBottomWidth: 1,
          borderBottomColor: isDark ? '#2a2d3e' : '#e4e7f0',
          elevation: 0,
          shadowOpacity: 0,
        },
        headerRight: () => <ThemeToggle />,
        tabBarActiveTintColor: isDark ? '#f7f8fc' : '#141628',
        tabBarInactiveTintColor: '#9ca3af',
        tabBarStyle: {
          backgroundColor: isDark ? '#1e2030' : '#ffffff',
          borderTopWidth: 1,
          borderTopColor: isDark ? '#2a2d3e' : '#e4e7f0',
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
        name="create/index"
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
