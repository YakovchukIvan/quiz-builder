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
      <SafeAreaView className="flex-1 items-center justify-center bg-bg-light dark:bg-bg-dark">
        <ActivityIndicator size="large" color="#6b5ce7" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-bg-light dark:bg-bg-dark" edges={['left', 'right']}>
      {error ? (
        <View className="flex-1 items-center justify-center p-6">
          <Text className="text-destructive font-semibold mb-2">Error loading quizzes</Text>
          <Text className="text-text-muted-light dark:text-text-muted-dark text-center mb-4">{error}</Text>
          <Button variant="outline" title="Try Again" onPress={refetch} />
        </View>
      ) : data.length === 0 ? (
        <ScrollView 
          className="bg-bg-light dark:bg-bg-dark"
          contentContainerClassName="flex-1 items-center justify-center p-8"
          refreshControl={<RefreshControl refreshing={loading} onRefresh={refetch} />}
        >
          <Layers size={48} color="#6b5ce7" className="mb-4" />
          <Text className="text-lg font-bold text-text-main-light dark:text-text-main-dark mb-1">No Quizzes Found</Text>
          <Text className="text-sm text-text-muted-light dark:text-text-muted-dark text-center">
            Pull down to refresh or create a new quiz.
          </Text>
        </ScrollView>
      ) : (
        <ScrollView 
          className="bg-bg-light dark:bg-bg-dark"
          contentContainerClassName="p-6 gap-4"
          refreshControl={
            <RefreshControl 
              refreshing={loading} 
              onRefresh={refetch} 
              tintColor="#6b5ce7"
            />
          }
        >
          {data.map((item) => (
            <Card key={item.id}>
              <Pressable onPress={() => handleQuizPress(item.id)}>
                <CardHeader>
                  <CardTitle className="text-base font-bold">{item.title}</CardTitle>
                  <CardDescription className="flex-row items-center gap-1.5 mt-1">
                    <Calendar size={13} color="#6b5ce7" />
                    <Text className="text-text-muted-light dark:text-text-muted-dark text-xs">
                      Created: {formatDate(item.createdAt)}
                    </Text>
                  </CardDescription>
                </CardHeader>
                <CardFooter className="justify-between items-center pt-2">
                  <View className="bg-bg-light dark:bg-border-dark border border-border-light dark:border-border-dark rounded-full px-3 py-1">
                    <Text className="text-xs font-semibold text-text-main-light dark:text-text-main-dark">
                      {item.questionCount} {item.questionCount === 1 ? 'question' : 'questions'}
                    </Text>
                  </View>
                  <Button
                    variant="outline"
                    className="p-2 border-transparent bg-destructive/10 active:bg-destructive/20"
                    onPress={() => deleteQuiz(item.id)}
                  >
                    <Trash2 size={16} color="#ef4444" />
                  </Button>
                </CardFooter>
              </Pressable>
            </Card>
          ))}

          {/* Pagination Controls */}
          <View className="py-4 items-center justify-center">
            {hasMore ? (
              loadingMore ? (
                <ActivityIndicator size="small" color="#6b5ce7" />
              ) : (
                <Button 
                  title="Load next 10" 
                  variant="outline"
                  className="w-full"
                  onPress={loadMore} 
                />
              )
            ) : (
              <Text className="text-sm text-text-muted-light dark:text-text-muted-dark font-medium">
                No more quizzes
              </Text>
            )}
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
