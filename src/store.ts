import { configureStore } from '@reduxjs/toolkit';
import inventoryReducer from './features/inventory/inventorySlice';
import cartReducer from './features/cart/cartSlice';


export const store = configureStore({
    reducer: {
        cart: cartReducer,
        inventory: inventoryReducer,

    },
});