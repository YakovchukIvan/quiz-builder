import React from 'react';
import { View, Text, ScrollView, ActivityIndicator, Pressable, Alert } from 'react-native';
import { useQuizzes } from '../../../src/hooks/useQuizzes';
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from '../../../src/components/ui/Card';
import { Button } from '../../../src/components/ui/Button';
import { router } from 'expo-router';
import { Trash2, Calendar, Layers } from 'lucide-react-native';
import { ScreenWrapper } from '../../../src/components/ui/ScreenWrapper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RefreshControl } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import { QuizListItem } from '../../../src/lib/types';

function AnimatedQuizCard({
  item,
  onPress,
  onDelete,
  formatDate,
  onConfirmDelete,
}: {
  item: QuizListItem;
  onPress: () => void;
  onDelete: () => void;
  formatDate: (d: string) => string;
  onConfirmDelete: (id: string, animateAndDelete: () => void) => void;
}) {
  const translateX = useSharedValue(0);
  const opacity = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
    opacity: opacity.value,
    overflow: 'hidden',
  }));

  const handleDelete = () => {
    translateX.value = withTiming(-400, { duration: 300 });
    opacity.value = withTiming(0, { duration: 300 }, (finished) => {
      if (finished) runOnJS(onDelete)();
    });
  };

  return (
    <Animated.View style={animatedStyle}>
      <Card>
        <Pressable onPress={onPress}>
          <CardHeader>
            <CardTitle className="text-base font-bold">{item.title}</CardTitle>
            <View className="flex-row items-center gap-1.5 mt-1">
              <Calendar size={13} color="#6b5ce7" />
              <Text className="text-xs text-text-muted-light dark:text-text-muted-dark">
                Created: {formatDate(item.createdAt)}
              </Text>
            </View>
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
              onPress={() => onConfirmDelete(item.id, handleDelete)}
            >
              <Trash2 size={16} color="#ef4444" />
            </Button>
          </CardFooter>
        </Pressable>
      </Card>
    </Animated.View>
  );
}

export default function QuizzesScreen() {
  const { data, loading, loadingMore, error, hasMore, total, refetch, loadMore, deleteQuiz } = useQuizzes();
  const insets = useSafeAreaInsets();

  const handleQuizPress = (id: string, title: string) => {
    router.push({
      pathname: '/(tabs)/quizzes/[id]',
      params: { id, title },
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

  const confirmDelete = (id: string, animateAndDelete: () => void) => {
    Alert.alert(
      'Delete Quiz',
      'Are you sure you want to delete this quiz? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: animateAndDelete },
      ]
    );
  };

  if (loading && data.length === 0) {
    return (
      <ScreenWrapper className="items-center justify-center">
        <ActivityIndicator size="large" color="#6b5ce7" />
      </ScreenWrapper>
    );
  }

  return (
    <ScreenWrapper edges={['left', 'right']}>
      {error ? (
        <View className="flex-1 items-center justify-center p-6">
          <Text className="text-destructive font-semibold mb-2">Error loading quizzes</Text>
          <Text className="text-text-muted-light dark:text-text-muted-dark text-center mb-4">{error}</Text>
          <Button variant="outline" title="Try Again" onPress={refetch} />
        </View>
      ) : data.length === 0 ? (
        <ScrollView 
          contentContainerClassName="flex-1 items-center justify-center p-8 bg-bg-light dark:bg-bg-dark"
          contentContainerStyle={{ paddingBottom: insets.bottom + 16 }}
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
          contentContainerClassName="p-6 gap-4 bg-bg-light dark:bg-bg-dark flex-grow"
          contentContainerStyle={{ paddingBottom: insets.bottom + 16 }}
          refreshControl={
            <RefreshControl 
              refreshing={loading} 
              onRefresh={refetch} 
              tintColor="#6b5ce7"
            />
          }
        >
          {/* Header count */}
          <Text className="text-sm text-text-muted-light dark:text-text-muted-dark font-semibold px-2 pb-2">
            {total} total
          </Text>

          {data.map((item) => (
            <AnimatedQuizCard
              key={item.id}
              item={item}
              onPress={() => handleQuizPress(item.id, item.title)}
              onDelete={() => deleteQuiz(item.id)}
              formatDate={formatDate}
              onConfirmDelete={confirmDelete}
            />
          ))}

          {/* Pagination Controls */}
          <View className="py-2 items-center justify-center">
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
    </ScreenWrapper>
  );
}
