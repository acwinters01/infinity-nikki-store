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


// export const cartReducer = (cart: Record<string, CartItem> = initialCart, action: any) => {
//     switch(action.type) {
//         case 'case/addItem': {
//             const { name, price } = action.payload;
//             const quantity: number = cart[name] ? cart[name].quantity + 1 : 1;
//             const newItem = { price, quantity };

//             return {
//                 ...cart,
//                 [name] : newItem
//             };
//         }

//         case 'cart/changeItemQuantity': {
//             const {name, newQuantity } = action.payload;
//             const itemsToUpdate = cart[name];

//             const updatedItem = {
//                 ...itemsToUpdate,
//                 quantity: newQuantity
//             };

//             return {
//                 ...cart,
//                 [name]: updatedItem
//             };
//         }

//         default: {
//             return cart;
//         }
//     }
// }