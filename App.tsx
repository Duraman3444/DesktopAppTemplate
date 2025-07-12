import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import './global.css';

export default function App() {
  return (
    <View className="flex-1 bg-white items-center justify-center">
      <Text className="text-lg font-bold">Hello React Native + NativeWind!</Text>
      <Text className="text-blue-500 mt-2">Your app is ready to go! 🚀</Text>
      <StatusBar style="auto" />
    </View>
  );
}
