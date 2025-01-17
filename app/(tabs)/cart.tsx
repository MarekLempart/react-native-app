import { RootState } from '@/store';
import {
    addItem,
    removeItemById,
    removeItemByName,
    updateQuantity,
    sortItemsByPrice,
    sortItemsByName,
    selectItemById,
} from '@/store/slices/cartSlice';
import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    Button,
    FlatList,
    TouchableOpacity
} from 'react-native';
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { CartItem } from '@/store/types';

type RootStackParamList = {
    Cart: undefined;
    Details: { item: CartItem};
};

export default function CartScreen() {
    const cart = useSelector ((state: RootState) => state.cart.array);
    const dispatch = useDispatch();
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productDescription, setProductDescription] = useState('');

    const handleAddItem = () => {
        if (productName && productPrice) {
            dispatch(
                addItem({
                    id: Date.now(),
                    name: productName,
                    description: productDescription || 'No description provided',
                    quantity: 1,
                    price: parseFloat(productPrice),
                })
            );
            setProductName('');
            setProductPrice('');
            setProductDescription('');
        }
    };

    const renderItem = ({ item }: { item: CartItem }) => (
        <TouchableOpacity
            onPress={() => navigation.navigate('Details', { item })}
            style={styles.item}
        >
            <Text>{item.name}</Text>
            <Text>${item.price.toFixed(2)}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Koszyk</Text>

            {/* Formularz dodawania produktów */}
            <TextInput
                style={styles.input}
                placeholder="Nazwa produktu"
                value={productName}
                onChangeText={setProductName}
            />
            <TextInput
                style={styles.input}
                placeholder="Cena produktu"
                value={productPrice}
                keyboardType="numeric"
                onChangeText={setProductPrice}
            />
            <TextInput
                style={styles.input}
                placeholder="Opis produktu (opcjonalne)"
                value={productDescription}
                onChangeText={setProductDescription}
            />
            <Button title="Dodaj produkt" onPress={handleAddItem} />

            {/* Lista produktów */}
            <FlatList
                data={cart}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                style={styles.list}
            />

            {/* Przyciski zarządzania */}
            <View style={styles.buttons}>
                <Button title="Sortuj po cenie" onPress={() => dispatch(sortItemsByPrice())} />
                <Button title="Sortuj po nazwie" onPress={() => dispatch(sortItemsByName())} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 70,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#777',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
    },
    list: {
        paddingTop: 5,
    },
    item: {
        padding: 5,
        backgroundColor: '#f9f9f9',
        borderBottomWidth: 1,
        borderBottomColor: '#339',
    },
    buttons: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});
