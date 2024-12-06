import { useState } from 'react';
import { StyleSheet, View, TextInput, Button, Text, Alert } from 'react-native';

export default function TabEmailScreen() {
  const [email, setEmail] = useState<string>('');
  const [error, setError] = useState<boolean | null>(null);

  const handleOnPress = () => {
    if (email.indexOf('@') === -1 || email.length < 3) {
        setError(true);
        Alert.alert('Error', 'Nieprawidłowy e-mail !!!');        
    } else {
        setError(false);
        Alert.alert('Sukces', `Twój e-mail, to ${email}`, [
            { text: 'OK', onPress: () => setEmail('') },
        ]);
    }    
  };

  const handleTextChange = (text: string) => {
    setEmail(text);

    if (text === '' || error) {
        setError(null);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Jaki jest Twój e-mail ?</Text>
      <TextInput
      style={styles.input}
      placeholder='Twój e-mail'
      onChangeText={handleTextChange}
      value={email}
      autoCapitalize='none'
      keyboardType='email-address'
      />
      <Button title='Sprawdź i Wyślij !' onPress={handleOnPress} />
      {error && <Text style={styles.error}>Nieprawidłowy adres e-mail !</Text>}
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
      color: 'green',
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
    error: {
        fontSize: 24,
        color: 'red',
        marginTop: 70,
        textAlign: 'center',
    },
});
