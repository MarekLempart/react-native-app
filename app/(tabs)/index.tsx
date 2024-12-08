import { useRouter } from 'expo-router';
import { StyleSheet, View, Text, Image, Button } from 'react-native';

export default function HomeScreen() {
  const router = useRouter();

  return <View style={styles.container}>
    <Text style={styles.title}>Ekran główny</Text>
    <Image
      style={styles.image}
      source={{uri: 'https://reactnative.dev/img/tiny_logo.png'}} />
    <Button title={'Idź do About'} onPress={() => router.push('/(tabs)/about')}></Button>
    <Button title={'Idź do Details nr 33'} onPress={() => router.push('/details/33')}></Button>
  </View>
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0F0F0'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  image: {
    width: 50,
    height: 50,
    marginBottom: 20
  }

});
