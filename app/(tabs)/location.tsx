import React, { useState } from 'react';
import { StyleSheet, View, Button, Text } from 'react-native';
import * as Location from 'expo-location';

export default function TabLocationScreen() {
  const [location, setLocation] = useState<Location.LocationObjectCoords | null>(null);
  const [errorMsg, setErrorMsg] = useState<string>('');

  const getLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();

    if(status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return;
    }

    const currentLocation = await Location.getCurrentPositionAsync({});
    setLocation(currentLocation.coords);
  }


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lokalizacja GPS</Text>
      <Button title='Pobierz lokalizację' onPress={getLocation} />
      {errorMsg ? <Text style={styles.error}>{errorMsg}</Text> : null}
      {location && (
        <Text>współrzędne: {location.latitude}, {location.longitude}</Text>
      )}

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
        fontSize: 22,
        justifyContent: 'center',
        color: 'green',
        fontWeight: 'bold',
        marginBottom: 10,
    },
    error: {
      color: 'red',
      fontSize: 14,
      textAlign: 'center',
    }    
});
