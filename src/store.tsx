import { configureStore } from '@reduxjs/toolkit';
import inventoryReducer from './reducers/inventorySlice';
import cartReducer from './reducers/cartSlice';
import searchTermReducer from './reducers/searchTermSlice';
import currencyFilterReducer from './reducers/currencyFilterSlice';
import labelFilterReducer from './reducers/labelFilterSlice';


export const store = configureStore({
    reducer: {
        cart: cartReducer,
        inventory: inventoryReducer,
        searchTerm: searchTermReducer,
        currencyFilter: currencyFilterReducer,
        labelFilter: labelFilterReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;