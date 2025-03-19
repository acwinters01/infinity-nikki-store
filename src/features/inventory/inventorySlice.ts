import { inventoryData } from './data';
import { Item } from '../../utilities/utilities';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Inventory } from './Inventory';
import { isValidElement } from 'react';


const initialState: Item [] = inventoryData;

export const inventorySlice = createSlice({
    name: "inventory",
    initialState,
    reducers: {
        loadData: () => initialState,
    },
})



export const { loadData } = inventorySlice.actions;
export default inventorySlice.reducer;
