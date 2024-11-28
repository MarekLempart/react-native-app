import { StyleSheet, View, Text, Image, Button } from 'react-native';

export default function HomeScreen() {
  return <View style={styles.container}>
    <Text>Witaj CodeStoryBro grupo!</Text>
    <Image
      style={styles.image}
      source={{uri: 'https://reactnative.dev/img/tiny_logo.png'}} />
    <Button title={'Start!'} onPress={() => alert(`Cześć`)}></Button>   
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

  },
  image: {
    width: 50,
    height: 50,
    marginBottom: 20
  }

});
