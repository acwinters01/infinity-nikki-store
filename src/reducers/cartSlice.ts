import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Item } from "../utilities/utilities";

// Defining the type for the cart Items. x
interface CartState {
    [name: string]: Item;
}

const initialState: CartState = {};

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addItem: (state, action: PayloadAction<Item>) => {
            const { name } = action.payload;
            return {
                ...state,
                [name] : state[name]
                ? {...state[name], quantity: state[name].quantity + 1 }
                : { ...action.payload, quantity: 1 },
            }
        },

        changeItemQuantity: (state, action: PayloadAction<{ name: string, newQuantity: number }>) => {
            const {name, newQuantity } = action.payload;
            if (!state[name]) return state;
            
            return {
                ...state,
                [name]: { ...state[name], quantity: newQuantity}
            }
        },
    },
});


export const { addItem, changeItemQuantity } = cartSlice.actions; // Actions
export default cartSlice.reducer; // Reducer
