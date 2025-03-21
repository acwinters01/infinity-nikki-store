import { configureStore } from '@reduxjs/toolkit';
import inventoryReducer from './features/inventory/inventorySlice';
import cartReducer from './features/cart/cartSlice';
import searchTermReducer from './features/searchTerm/searchTermSlice';
import currencyFilterReducer from './features/filters/currencyFilter/currencyFilterSlice';


export const store = configureStore({
    reducer: {
        cart: cartReducer,
        inventory: inventoryReducer,
        searchTerm: searchTermReducer,
        currencyFilter: currencyFilterReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;