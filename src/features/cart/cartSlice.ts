import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Item } from "../../utilities/utilities";

// Defining the type for the cart Items. x
type CartItem = Item;

const initialState: Record<string, CartItem> = {};

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addItem: (state, action: PayloadAction<CartItem>) => {
            const { name, price, quantity } = action.payload;

            if(state[name]) {
                state[name].quantity += 1;
            } else {
                state[name] = {...action.payload, quantity: 1 };
            }

        },
        changeItemQuantity: (state, action: PayloadAction<{name: string, newQuantity: number}>) => {
            const {name, newQuantity } = action.payload;

            if (state[name]) {
                state[name].quantity = newQuantity;
            }
        },
    },
});

// Actions
export const { addItem, changeItemQuantity } = cartSlice.actions;
// Reducer
export default cartSlice.reducer;
