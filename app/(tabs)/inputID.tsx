import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, View, TextInput, Button, Text, Alert } from 'react-native';

export default function TabInputIdScreen() {
  const router = useRouter();
  const [id, setId] = useState<string>('');

  const handleNavigate = () => {
    const parsedId = parseInt (id, 10);
    if (isNaN(parsedId) || parsedId < 1 || parsedId > 1000) {
      Alert.alert('Nieprawidłowe ID', 'Podaj liczbę całkowitą od 1 do 1000.');
      return;
    }
    router.push(`/details/${parsedId}`);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Wpisz ID</Text>
      <TextInput
      style={styles.input}
      placeholder='ID (1-1000)'
      keyboardType='numeric'
      onChangeText={setId}
      value={id}
      />
      <Button title={'Idź do Details'} onPress={handleNavigate} />
      <Button title='Idź do Home' onPress={() => router.back} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#F0F0F0',
  },
  label: {
    color: 'green',
    fontSize: 20,
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderRadius: 10,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
    backgroundColor: 'white',
  },
});
