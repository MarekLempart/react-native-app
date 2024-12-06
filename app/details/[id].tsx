import { useLocalSearchParams, useRouter } from 'expo-router';
import { StyleSheet, View, Text, Image, Button } from 'react-native';

export default function DetailsScreen() {
const { id } = useLocalSearchParams();
  const router = useRouter();

  return <View style={styles.container}>
    <Text style={styles.title}>Ekran Details nr {id}</Text>
    <Image
      style={styles.image}
      source={{uri: 'https://reactnative.dev/img/tiny_logo.png'}} />
    <Button title='Wróć' onPress={() => router.back()} />
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
    fontSize: 20,
    color: 'green',
    fontWeight: 'bold',
    marginBottom: 30,
  },
  image: {
    width: 50,
    height: 50,
    marginBottom: 20
  }

});
