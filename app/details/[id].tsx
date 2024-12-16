import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, Button } from 'react-native';
import axios from 'axios';
import { TUser } from '../(tabs)';

export default function DetailsScreen() {
const { id } = useLocalSearchParams();
  const router = useRouter();
  const [user, setUser] = useState<TUser | null>(null);

  useEffect (() => {
    axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then(response => setUser(response.data))
      .catch(error => console.error(error));
  }, []);

  return <View style={styles.container}>
    <Text style={styles.title}>Użytkownik nr {id}</Text>
    {user ? <View>
        <Text>{user.name}</Text>
        <Text>{user.username}</Text>
        <Text>{user.email}</Text>
        <Text>{user.phone}</Text>
        <Text>{user.website}</Text>
        <Text>{user.address.street}</Text>
        <Text>{user.address.suite}</Text>
        <Text>{user.address.city}</Text>
        <Text>{user.address.zipcode}</Text>
        <Text>{user.address.geo.lat}</Text>r
        <Text>{user.address.geo.lng}</Text>
        <Text>{user.company.name}</Text>
        <Text>{user.company.catchPhrase}</Text>
        <Text>{user.company.bs}</Text>
      </View> : <Text>Loader...</Text>}
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
