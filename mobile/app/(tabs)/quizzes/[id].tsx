import React from 'react';
import { View, Text, ScrollView, ActivityIndicator, Pressable } from 'react-native';
import { useLocalSearchParams, router, Stack } from 'expo-router';
import { useQuiz } from '../../../src/hooks/useQuiz';
import { Badge } from '../../../src/components/ui/Badge';
import { Card, CardContent } from '../../../src/components/ui/Card';
import { Circle, CheckSquare, AlignLeft } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const typeMeta = {
  BOOLEAN: { label: 'True / False', variant: 'boolean' as const },
  INPUT: { label: 'Short answer', variant: 'input' as const },
  CHECKBOX: { label: 'Multiple choice', variant: 'checkbox' as const },
};

export default function QuizDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: quiz, loading, error } = useQuiz(id);

  if (loading) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-bg-light dark:bg-bg-dark">
        <ActivityIndicator size="large" color="#6b5ce7" />
      </SafeAreaView>
    );
  }

  if (error || !quiz) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-bg-light dark:bg-bg-dark p-6">
        <Text className="text-destructive font-semibold mb-2">Error loading quiz</Text>
        <Text className="text-text-muted-light dark:text-text-muted-dark text-center mb-4">{error || 'Quiz not found'}</Text>
        <Pressable
          className="bg-primary px-4 py-2.5 rounded-xl active:opacity-80"
          onPress={() => router.back()}
        >
          <Text className="text-white font-semibold">Go Back</Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-bg-light dark:bg-bg-dark" edges={['left', 'right']}>
      {/* Set the native stack header title */}
      <Stack.Screen options={{ headerTitle: quiz.title }} />

      <ScrollView contentContainerClassName="p-6 gap-6 bg-bg-light dark:bg-bg-dark flex-grow">
        {quiz.questions.map((question, index) => {
          const meta = typeMeta[question.type];
          return (
            <Card key={question.id}>
              <CardContent className="p-5">
                <View className="flex-row gap-3 mb-4">
                  <View className="w-6 h-6 rounded-full border border-border-light dark:border-border-dark bg-bg-light dark:bg-border-dark flex items-center justify-center">
                    <Text className="text-xs font-bold text-text-muted-light dark:text-text-muted-dark">{index + 1}</Text>
                  </View>
                  <View className="flex-1 gap-1">
                    <View className="flex-row">
                      <Badge variant={meta.variant} label={meta.label} />
                    </View>
                    <Text className="text-[15px] font-semibold text-text-main-light dark:text-text-main-dark leading-snug">
                      {question.text}
                    </Text>
                  </View>
                </View>

                {/* Options Preview */}
                <View className="pl-9">
                  {question.type === 'BOOLEAN' && (
                    <View className="flex-row gap-4">
                      {['True', 'False'].map((opt) => (
                        <View key={opt} className="flex-row items-center gap-2">
                          <Circle size={16} color="#6b5ce7" />
                          <Text className="text-sm text-text-muted-light dark:text-text-muted-dark font-medium">{opt}</Text>
                        </View>
                      ))}
                    </View>
                  )}

                  {question.type === 'INPUT' && (
                    <View className="h-10 rounded-xl border border-dashed border-border-light dark:border-border-dark flex-row items-center px-3 bg-bg-light dark:bg-card-dark gap-2">
                      <AlignLeft size={14} color="#6b5ce7" />
                      <Text className="text-xs text-text-muted-light dark:text-text-muted-dark font-medium">Text answer...</Text>
                    </View>
                  )}

                  {question.type === 'CHECKBOX' && (
                    <View className="gap-2">
                      {question.options.map((opt) => (
                        <View key={opt.id} className="flex-row items-center gap-2">
                          <CheckSquare size={16} color="#6b5ce7" />
                          <Text className="text-sm text-text-muted-light dark:text-text-muted-dark font-medium">{opt.text}</Text>
                        </View>
                      ))}
                    </View>
                  )}
                </View>
              </CardContent>
            </Card>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}
