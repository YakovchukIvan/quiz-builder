import React from 'react';
import { View, Text, ScrollView, Pressable, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { useCreateQuiz } from '../../../src/hooks/useCreateQuiz';
import { Card, CardContent } from '../../../src/components/ui/Card';
import { Input } from '../../../src/components/ui/Input';
import { Button } from '../../../src/components/ui/Button';
import { Controller } from 'react-hook-form';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Trash2, Plus } from 'lucide-react-native';
import { router } from 'expo-router';

export default function CreateQuizScreen() {
  const {
    methods,
    fields,
    addQuestion,
    removeQuestion,
    addOption,
    removeOption,
    loading,
    onSubmit,
    errors,
  } = useCreateQuiz();

  return (
    <SafeAreaView className="flex-1 bg-slate-50 dark:bg-slate-950" edges={['left', 'right']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView contentContainerClassName="p-6 gap-6" keyboardShouldPersistTaps="handled">
          {/* Header Title inside ScrollView */}
          <View className="mb-2">
            <Text className="text-2xl font-bold text-slate-900 dark:text-slate-50 tracking-tight">Create Quiz</Text>
            <Text className="text-xs text-slate-500 dark:text-slate-400 font-medium">Add a title and build your questions</Text>
          </View>

          {/* Quiz Title */}
          <Card className="border border-slate-200 dark:border-slate-800">
            <CardContent className="p-5 gap-2">
              <Text className="text-sm font-semibold text-slate-700 dark:text-slate-300">Quiz title</Text>
              <Controller
                control={methods.control}
                name="title"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    placeholder="e.g. JavaScript Basics"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
              />
              {errors.title && (
                <Text className="text-xs text-red-500 font-medium">{errors.title.message}</Text>
              )}
            </CardContent>
          </Card>

          {/* Questions List */}
          {fields.map((field, index) => {
            const questionError = errors.questions?.[index];
            const type = methods.watch(`questions.${index}.type`);

            return (
              <Card key={field.id} className="border border-slate-200 dark:border-slate-800">
                <CardContent className="p-5 gap-4">
                  {/* Question Header */}
                  <View className="flex-row justify-between items-center">
                    <View className="flex-row items-center gap-2">
                      <View className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 items-center justify-center">
                        <Text className="text-xs font-bold text-slate-600 dark:text-slate-400">{index + 1}</Text>
                      </View>
                      <Text className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                        {type === 'BOOLEAN' && 'True / False Question'}
                        {type === 'INPUT' && 'Short Answer Question'}
                        {type === 'CHECKBOX' && 'Multiple Choice Question'}
                      </Text>
                    </View>
                    <Pressable
                      className="p-1 active:opacity-60"
                      onPress={() => removeQuestion(index)}
                    >
                      <Trash2 size={16} color="#dc2626" />
                    </Pressable>
                  </View>

                  {/* Question Text */}
                  <View className="gap-2">
                    <Text className="text-xs font-semibold text-slate-600 dark:text-slate-400">Question Text</Text>
                    <Controller
                      control={methods.control}
                      name={`questions.${index}.text`}
                      render={({ field: { onChange, onBlur, value } }) => (
                        <Input
                          placeholder="Type question here..."
                          onBlur={onBlur}
                          onChangeText={onChange}
                          value={value}
                        />
                      )}
                    />
                    {questionError?.text && (
                      <Text className="text-xs text-red-500 font-medium">
                        {questionError.text.message}
                      </Text>
                    )}
                  </View>

                  {/* Multiple Choice Options (Checkbox type) */}
                  {type === 'CHECKBOX' && (
                    <View className="gap-3 border-t border-slate-100 dark:border-slate-800 pt-3">
                      <Text className="text-xs font-semibold text-slate-600 dark:text-slate-400">Options</Text>
                      
                      {methods.watch(`questions.${index}.options`)?.map((_, optIdx) => {
                        const optError = questionError?.options?.[optIdx];
                        return (
                          <View key={optIdx} className="gap-1.5">
                            <View className="flex-row items-center gap-2">
                              <View className="flex-1">
                                <Controller
                                  control={methods.control}
                                  name={`questions.${index}.options.${optIdx}`}
                                  render={({ field: { onChange, onBlur, value } }) => (
                                    <Input
                                      placeholder={`Option ${optIdx + 1}`}
                                      onBlur={onBlur}
                                      onChangeText={onChange}
                                      value={value}
                                    />
                                  )}
                                />
                              </View>
                              <Pressable
                                className="p-2 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl active:opacity-60"
                                onPress={() => removeOption(index, optIdx)}
                              >
                                <Trash2 size={14} color="#64748b" />
                              </Pressable>
                            </View>
                            {optError && (
                              <Text className="text-[11px] text-red-500 font-medium">
                                {optError.message}
                              </Text>
                            )}
                          </View>
                        );
                      })}

                      {questionError?.options && 'message' in questionError.options && (
                        <Text className="text-xs text-red-500 font-medium">
                          {questionError.options.message as string}
                        </Text>
                      )}

                      <Button
                        variant="outline"
                        className="py-2 border-dashed border-slate-300 dark:border-slate-700"
                        onPress={() => addOption(index)}
                      >
                        <Plus size={14} color={methods.watch('questions').length > 0 ? undefined : '#0f172a'} />
                        <Text className="text-xs font-semibold text-slate-900 dark:text-slate-100">Add Option</Text>
                      </Button>
                    </View>
                  )}
                </CardContent>
              </Card>
            );
          })}

          {/* Form General Errors */}
          {(errors.questions?.message || errors.questions?.root?.message) && (
            <Text className="text-xs text-red-500 font-medium text-center">
              {(errors.questions.message || errors.questions.root?.message) as string}
            </Text>
          )}

          {errors.root && (
            <Text className="text-xs text-red-500 font-medium text-center">
              {errors.root.message}
            </Text>
          )}

          {/* Add Question Card */}
          <Card className="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            <CardContent className="p-5 gap-3">
              <Text className="text-sm font-semibold text-slate-700 dark:text-slate-300">Add question</Text>
              <View className="flex-row gap-2 flex-wrap">
                <Button
                  variant="outline"
                  className="flex-1 py-2"
                  onPress={() => addQuestion('BOOLEAN')}
                >
                  <Text className="text-xs font-semibold text-slate-900 dark:text-slate-100">+ True / False</Text>
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 py-2"
                  onPress={() => addQuestion('INPUT')}
                >
                  <Text className="text-xs font-semibold text-slate-900 dark:text-slate-100">+ Short answer</Text>
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 py-2"
                  onPress={() => addQuestion('CHECKBOX')}
                >
                  <Text className="text-xs font-semibold text-slate-900 dark:text-slate-100">+ Multiple choice</Text>
                </Button>
              </View>
            </CardContent>
          </Card>

          {/* Submission Buttons */}
          <View className="flex-row gap-3 pt-4 mb-8">
            <Button
              variant="outline"
              className="flex-1"
              onPress={() => router.push('/(tabs)/quizzes')}
              disabled={loading}
            >
              <Text className="text-slate-900 dark:text-slate-100 font-semibold">Cancel</Text>
            </Button>
            <Button
              className="flex-1 bg-slate-950 dark:bg-slate-50"
              onPress={onSubmit}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Text className="text-white dark:text-slate-900 font-semibold">Create Quiz</Text>
              )}
            </Button>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
