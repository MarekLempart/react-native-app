import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, Button, ScrollView } from 'react-native';
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
  }, [id]);

  if (!user) {
    return (
      <View style={styles.container}>
        <Text>Loader...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Użytkownik nr {id}</Text>
      <View style={styles.container}>
        {Object.entries({
          Name: user.name,
          Username: user.username,
          Email: user.email,
          Phone: user.phone,
          Website: user.website,
          'Address (Street)': user.address.street,
          'Address (Suite)': user.address.suite,
          'Address (City)': user.address.city,
          'Address (Zipcode)': user.address.zipcode,
          'Geo (Latitude)': user.address.geo.lat,
          'Geo (Longitude)': user.address.geo.lng,
          'Company Name': user.company.name,
          'Catch Phrase': user.company.catchPhrase,
          'Company BS': user.company.bs,
        }).map(([key, value]) => (
          <Text key={key} style={styles.dataRow}>
            <Text style={styles.dataKey}>{key}: </Text>
            <Text>{value}</Text>
          </Text>
        ))}
      </View>

    {/* {user ? <View>
        <Text>{user.name}</Text>
        <Text>{user.username}</Text>
        <Text>{user.email}</Text>
        <Text>{user.phone}</Text>
        <Text>{user.website}</Text>
        <Text>{user.address.street}</Text>
        <Text>{user.address.suite}</Text>
        <Text>{user.address.city}</Text>
        <Text>{user.address.zipcode}</Text>
        <Text>{user.address.geo.lat}</Text>
        <Text>{user.address.geo.lng}</Text>
        <Text>{user.company.name}</Text>
        <Text>{user.company.catchPhrase}</Text>
        <Text>{user.company.bs}</Text>
        </View> : <Text>Loader...</Text>} */}
      <Image
        style={styles.image}
        source={{uri: 'https://reactnative.dev/img/tiny_logo.png'}} />
      <Button title='Wróć' onPress={() => router.back()} />
  </ScrollView>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    padding: 20,
    // justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0F0F0'
  },
  title: {
    alignItems: 'center',
    fontSize: 22,
    color: 'green',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  dataContainer: {
    width: '100%',
    marginBottom: 20,
  },
  dataRow: {
    fontSize: 16,
    marginBottom: 8,
    lineHeight: 22,
  },
  dataKey: {
    fontWeight: 'bold',
  },
  image: {
    width: 50,
    height: 50,
    marginBottom: 50
  }

});
