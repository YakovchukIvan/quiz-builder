import React from 'react';
import { View, Text, ScrollView, ActivityIndicator, Pressable } from 'react-native';
import { useQuizzes } from '../../../src/hooks/useQuizzes';
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from '../../../src/components/ui/Card';
import { Button } from '../../../src/components/ui/Button';
import { router } from 'expo-router';
import { Trash2, Calendar, Layers } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RefreshControl } from 'react-native';

export default function QuizzesScreen() {
  const { data, loading, loadingMore, error, hasMore, refetch, loadMore, deleteQuiz } = useQuizzes();

  const handleQuizPress = (id: string) => {
    router.push({
      pathname: '/(tabs)/quizzes/[id]',
      params: { id },
    });
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    } catch {
      return '';
    }
  };

  if (loading && data.length === 0) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-slate-50 dark:bg-slate-950">
        <ActivityIndicator size="large" color="#0f172a" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-slate-50 dark:bg-slate-950" edges={['left', 'right']}>
      {error ? (
        <View className="flex-1 items-center justify-center p-6">
          <Text className="text-red-500 font-semibold mb-2">Error loading quizzes</Text>
          <Text className="text-slate-500 dark:text-slate-400 text-center mb-4">{error}</Text>
          <Button variant="outline" title="Try Again" onPress={refetch} />
        </View>
      ) : data.length === 0 ? (
        <ScrollView 
          contentContainerClassName="flex-1 items-center justify-center p-8"
          refreshControl={<RefreshControl refreshing={loading} onRefresh={refetch} />}
        >
          <Layers size={48} color="#94a3b8" className="mb-4" />
          <Text className="text-lg font-bold text-slate-900 dark:text-slate-50 mb-1">No Quizzes Found</Text>
          <Text className="text-sm text-slate-500 dark:text-slate-400 text-center">
            Pull down to refresh or create a new quiz.
          </Text>
        </ScrollView>
      ) : (
        <ScrollView 
          contentContainerClassName="p-6 gap-4"
          refreshControl={
            <RefreshControl 
              refreshing={loading} 
              onRefresh={refetch} 
              tintColor="#94a3b8"
            />
          }
        >
          {data.map((item) => (
            <Card key={item.id} className="border border-slate-200 dark:border-slate-800">
              <Pressable onPress={() => handleQuizPress(item.id)}>
                <CardHeader>
                  <CardTitle className="text-base text-slate-900 dark:text-slate-50 font-bold">{item.title}</CardTitle>
                  <CardDescription className="flex-row items-center gap-1.5 mt-1">
                    <Calendar size={13} color="#64748b" />
                    <Text className="text-slate-500 dark:text-slate-400 text-xs">
                      Created: {formatDate(item.createdAt)}
                    </Text>
                  </CardDescription>
                </CardHeader>
                <CardFooter className="justify-between items-center pt-2">
                  <View className="bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-full px-3 py-1">
                    <Text className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                      {item.questionCount} {item.questionCount === 1 ? 'question' : 'questions'}
                    </Text>
                  </View>
                  <Button
                    variant="outline"
                    className="p-2 border-transparent bg-red-50 dark:bg-red-950/20 active:bg-red-100 dark:active:bg-red-950/40"
                    onPress={() => deleteQuiz(item.id)}
                  >
                    <Trash2 size={16} color="#dc2626" />
                  </Button>
                </CardFooter>
              </Pressable>
            </Card>
          ))}

          {/* Pagination Controls */}
          <View className="py-4 items-center justify-center">
            {hasMore ? (
              loadingMore ? (
                <ActivityIndicator size="small" color="#0f172a" />
              ) : (
                <Button 
                  title="Load next 10" 
                  variant="outline"
                  className="w-full"
                  onPress={loadMore} 
                />
              )
            ) : (
              <Text className="text-sm text-slate-400 dark:text-slate-600 font-medium">
                No more quizzes
              </Text>
            )}
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
