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

        addAll: (state, action: PayloadAction<Item[]>) => {
            const items = action.payload;
            
            items.forEach(item => {
                const name = item.name;
                if(!state[name]) {
                    state[name] = { ...item, quantity: 1 };

                } else {
                    state[name].quantity += 1;
                }
            });

        }
    },
});


export const { addAll, addItem, changeItemQuantity } = cartSlice.actions; // Actions
export default cartSlice.reducer; // Reducer
