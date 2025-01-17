import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem } from "../types";

interface CartState {
    array: CartItem[];
}

const initialState: CartState = {
    array: [],
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addItem: (state, action: PayloadAction<CartItem>) => {
            state.array.push(action.payload);
        },
        removeItemById: (state, action: PayloadAction<number>) => {
            state.array = state.array.filter(item => item.id !== action.payload);
        },
        removeItemByName: (state, action: PayloadAction<string>) => {
            state.array = state.array.filter(item => item.name !== action.payload);
        },
        updateQuantity: (state, action: PayloadAction<{ id: number; quantity: number}>) => {
            const item = state.array.find(item => item.id === action.payload.id);
            if (item) {
                item.quantity = action.payload.quantity;
            }
        },
        sortItemsByPrice: (state) => {
            state.array.sort((a, b) => a.price - b.price);
        },
        sortItemsByName: (state) => {
            state.array.sort((a,b) => a.name.localeCompare(b.name));
        },
        selectItemById : (state, action: PayloadAction<number>) => {
            const selectItemById = state.array.find(item => item.id === action.payload);
            if (selectItemById) {
                console.log("Selected item:", selectItemById);
            }
        },
    },
});

export const {
    addItem,
    removeItemById,
    removeItemByName,
    updateQuantity,
    sortItemsByPrice,
    sortItemsByName,
    selectItemById,
} = cartSlice.actions;
export default cartSlice.reducer;