import { inventoryData } from './data';
import { Item } from '../../utilities/utilities';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Inventory } from './Inventory';

type Inventory = Item[];
const initialState = inventoryData;


export const inventorySlice = createSlice({
    name: "inventory",
    initialState,
    reducers: {
        loadData: () => inventoryData,
    },
})

export const { loadData } = inventorySlice.actions;
export default inventorySlice.reducer;
