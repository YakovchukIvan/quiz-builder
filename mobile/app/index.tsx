import { View, Text } from 'react-native';

export default function HomeScreen() {
  return (
    <View className="items-center justify-center flex-1 p-6 bg-slate-50">
      <View className="items-center p-6 bg-white border shadow-sm rounded-2xl border-slate-200">
        <Text className="mb-2 text-2xl font-bold text-slate-900">Quiz Builder 🚀</Text>
        <Text className="text-center text-slate-500">Чистий фундамент успішно запущено! Мобілка готова до роботи.</Text>
      </View>
    </View>
  );
}
