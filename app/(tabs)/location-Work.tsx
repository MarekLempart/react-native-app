import React from 'react';
import { StyleSheet, View, Button, Text } from 'react-native';
import * as Location from 'expo-location';
import { useAppContext } from '../AppContext';

export default function TabLocationScreen() {
  const { setLocation } = useAppContext();

  const getLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status === 'granted') {
      const currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation.coords);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lokalizacja GPS</Text>
      <Button title="Pobierz lokalizację" onPress={getLocation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    marginBottom: 20,
  },
});
