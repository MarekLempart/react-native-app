import { useRouter } from 'expo-router';
import { useForm } from 'react-hook-form';
import { StyleSheet, View, Text, TextInput, Button, Alert, ScrollView, SafeAreaView } from 'react-native';
import axios from 'axios';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

// Definicja walidacji formularza
const schema = Yup.object().shape({
  name: Yup.string().min(3, 'Imię musi mieć co najmniej 3 litery').required('Imię jest wymagane'),
  username: Yup.string().min(3, 'Nazwa użytkownika musi mieć co najmniej 3 litery').required('Nazwa użytkownika jest wymagana'),
  email: Yup.string().email('Nieprawidłowy email').required('Email jest wymagany'),
  phone: Yup.string().matches(/^[0-9]{9,15}$/, 'Numer telefonu musi mieć od 9 do 15 cyfr').required('Numer telefonu jest wymagany'),
  address: Yup.object().shape({
    street: Yup.string().min(3, 'Nazwa ulicy musi mieć co najmniej 3 litery').optional(),
    suite: Yup.string().min(1, 'Numer apartamentu musi być poprawny').optional(),
    city: Yup.string().min(3, 'Nazwa miasta musi mieć co najmniej 3 litery').optional(),
    zipcode: Yup.string().matches(/^\d{2}(-\d{3})?$/, 'Nieprawidłowy kod pocztowy').optional(),
  }).optional(),
  company: Yup.object().shape({
    name: Yup.string().min(3, 'Nazwa firmy musi mieć co najmniej 3 litery').optional(),
    catchPhrase: Yup.string().optional(),
    bs: Yup.string().optional(),
  }).optional(),
});

type FormData = {
  name: string;
  username: string;
  email: string;
  phone: string;
  address?: {
    street?: string;
    suite?: string;
    city?: string;
    zipcode?: string;
  };
  company?: {
    name?: string;
    catchPhrase?: string;
    bs?: string;
  };
};

export default function TabAddUserScreen() {
  const router = useRouter();

  // Inicjalizacja formularza
  const {
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  // Ustawienie wartości pól
  const handleInputChange = (name: keyof FormData | string, value: string) => {
    setValue(name as keyof FormData, value);
  };

  // Obsługa wysłania formularza
  const onSubmit = async (data: FormData) => {
    try {
      await axios.post('https://jsonplaceholder.typicode.com/users', data);
      Alert.alert('Sukces', 'Użytkownik został dodany.');
      reset(); // Czyszczenie formularza
      router.push('/'); // Przekierowanie na ekran główny
    } catch (error) {
      Alert.alert('Błąd', 'Nie udało się dodać użytkownika.');
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.title}>Dodaj nowego użytkownika</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <TextInput
          style={styles.input}
          placeholder="Imię"
          onChangeText={(value) => handleInputChange('name', value)}
        />
        {errors.name && <Text style={styles.error}>{errors.name.message}</Text>}

        <TextInput
          style={styles.input}
          placeholder="Nazwa użytkownika"
          onChangeText={(value) => handleInputChange('username', value)}
        />
        {errors.username && <Text style={styles.error}>{errors.username.message}</Text>}

        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          onChangeText={(value) => handleInputChange('email', value)}
        />
        {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}

        <TextInput
          style={styles.input}
          placeholder="Telefon"
          keyboardType="phone-pad"
          onChangeText={(value) => handleInputChange('phone', value)}
        />
        {errors.phone && <Text style={styles.error}>{errors.phone.message}</Text>}

        <Text style={styles.sectionTitle}>Adres (opcjonalny)</Text>
        <TextInput
          style={styles.input}
          placeholder="Ulica"
          onChangeText={(value) => handleInputChange('address.street', value)}
        />
        {errors.address?.street && <Text style={styles.error}>{errors.address.street.message}</Text>}

        <TextInput
          style={styles.input}
          placeholder="Apartament"
          onChangeText={(value) => handleInputChange('address.suite', value)}
        />
        {errors.address?.suite && <Text style={styles.error}>{errors.address.suite.message}</Text>}

        <TextInput
          style={styles.input}
          placeholder="Miasto"
          onChangeText={(value) => handleInputChange('address.city', value)}
        />
        {errors.address?.city && <Text style={styles.error}>{errors.address.city.message}</Text>}

        <TextInput
          style={styles.input}
          placeholder="Kod pocztowy"
          onChangeText={(value) => handleInputChange('address.zipcode', value)}
        />
        {errors.address?.zipcode && <Text style={styles.error}>{errors.address.zipcode.message}</Text>}

        <Text style={styles.sectionTitle}>Firma (opcjonalna)</Text>
        <TextInput
          style={styles.input}
          placeholder="Nazwa firmy"
          onChangeText={(value) => handleInputChange('company.name', value)}
        />
        {errors.company?.name && <Text style={styles.error}>{errors.company.name.message}</Text>}

        <TextInput
          style={styles.input}
          placeholder="Slogan"
          onChangeText={(value) => handleInputChange('company.catchPhrase', value)}
        />
        {errors.company?.catchPhrase && <Text style={styles.error}>{errors.company.catchPhrase.message}</Text>}

        <TextInput
          style={styles.input}
          placeholder="BS"
          onChangeText={(value) => handleInputChange('company.bs', value)}
        />
        {errors.company?.bs && <Text style={styles.error}>{errors.company.bs.message}</Text>}
      </ScrollView>

      <View style={styles.footer}>
        <Button title="Dodaj użytkownika" onPress={handleSubmit(onSubmit)} />
        <Button title="Wróć" onPress={() => router.back()} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   padding: 20,
  //   backgroundColor: '#F0F0F0',
  // },
  safeArea: {
    flex: 1,
    backgroundColor: '#F0F0F0',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 10,
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  footer: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 70,
  },
  title: {
    fontSize: 24,
    color: 'green',
  },
  // label: {
  //   color: 'green',
  //   fontSize: 20,
  //   marginBottom: 10,
  // },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  sectionTitle: {
    color: 'blue',
    fontSize: 18,
    marginBottom: 10,
    marginTop: 20,
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
  // buttonContainer: {
  //   flexDirection: 'row',
  //   justifyContent: 'space-between'
  // },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});

  // export type TUser = {
  //   id: number;
  //   name: string;
  //   username: string;
  //   email: string;
  //   address: {
  //     street: string;
  //     suite: string;
  //     city: string;
  //     zipcode: string;
  //     geo: {
  //       lat: string;
  //       lng: string;
  //     }
  //   };
  //   phone: string;
  //   website: string;
  //   company: {
  //     name: string;
  //     catchPhrase: string;
  //     bs: string;
  //   }
  // };