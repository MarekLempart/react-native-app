import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, Button, FlatList } from 'react-native';
import axios from 'axios';

export type TUser = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    }
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  }
};

export default function HomeScreen() {
  const router = useRouter();
  const [users, setUsers] = useState<TUser[]>([]);

  useEffect (() => {
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(response => setUsers(response.data))
      .catch(error => console.error(error));
  }, []);

  return <View style={styles.container}>
    <Text style={styles.title}>List Users</Text>
    <FlatList
      data={users}
      keyExtractor={user => user.id.toString()}
      renderItem={({ item }) => <View style={styles.userItem}>
        <Button title={item.name} onPress={() => router.push(`/details/${item.id}`)} />
      </View>}
    />
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
    backgroundColor: '#F0F0F0',
    paddingTop: 60,
  },
  title: {
    flex: 1,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  image: {
    width: 50,
    height: 50,
    marginBottom: 20
  },
  userItem: {
    padding: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#ccc',
  },
});
