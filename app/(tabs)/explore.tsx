import { useState } from 'react';
import { StyleSheet, View, TextInput, Button, Text } from 'react-native';

export default function TabTwoScreen() {
  const [name, setName] = useState<string>('');
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Jak się nazywasz?</Text>
      <TextInput
      style={styles.input}
      onChangeText={setName}
      value={name}
      />
      <Button title='Wyślij!' onPress={() => alert(`Cześć, ${name}`)}></Button>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      padding: 20,
    },
    label: {
      color: 'dark gray',
      justifyContent: 'center',
      fontSize: 20,
      marginBottom: 10,
    },
    input: {
      height: 40,
      borderRadius: 15,
      borderColor: 'gray',
      borderWidth: 1,
      padding: 10,
      marginBottom: 20,
    },
});
