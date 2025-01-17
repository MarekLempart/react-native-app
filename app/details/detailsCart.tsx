import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { CartItem } from "@/store/types";

interface DetailsScreenProps {
    route: {
        params: {
            item: CartItem;
        };
    };
}

export default function DetailScreen({ route }: DetailsScreenProps) {
    const { item } = route.params;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{item.name}</Text>
            <Text style={styles.description}>{item.description}</Text>
            <Text style={styles.price}>Cena: ${item.price.toFixed(2)}</Text>
            <Text style={styles.quantity}>Ilość: {item.quantity}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        marginBottom: 10,
    },
    price: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    quantity: {
        fontSize: 16,
    },
});