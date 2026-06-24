import { View, Text } from 'react-native';

export default function HomeScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-slate-50 p-6">
      <View className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 items-center">
        <Text className="text-2xl font-bold text-slate-900 mb-2">Quiz Builder 🚀</Text>
        <Text className="text-slate-500 text-center">Чистий фундамент успішно запущено! Мобілка готова до роботи.</Text>
      </View>
    </View>
  );
}
