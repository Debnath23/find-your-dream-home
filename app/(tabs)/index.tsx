import { useRouter } from 'expo-router';
import { Image, StyleSheet, Platform, Text, View, TouchableOpacity } from 'react-native';

export default function HomeScreen() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Text>Debnath</Text>
      <TouchableOpacity onPress={() => router.push('/(auth)/sign-in')}>
        <Text>Click Me</Text>
      </TouchableOpacity>
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: 399,
    height: 552,
    backgroundColor: '#fff',
  }
});
