import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, View, Button, Text } from 'react-native';

export default function TabAboutScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>About page !</Text>
      <Button title='Wróć' onPress={() => router.back()} />
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
        fontSize: 20,
        justifyContent: 'center',
        color: 'green',
        fontWeight: 'bold',
        marginBottom: 10,
    },
});
