import React from 'react';
import { StyleSheet, View, Text, Image, Button } from 'react-native';
import { useAppContext } from './AppContext';

export default function SaveDataScreen() {
  const { photo, location, resetData } = useAppContext();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Zapisane dane</Text>
      {photo ? <Image source={{ uri: photo }} style={styles.image} /> : <Text>Brak zdjęcia</Text>}
      {location ? (
        <Text>Lokalizacja: {location.latitude}, {location.longitude}</Text>
      ) : (
        <Text>Brak lokalizacji</Text>
      )}
      <Button title="Resetuj dane" onPress={resetData} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  image: {
    width: 300,
    height: 300,
    marginBottom: 20,
  },
});
