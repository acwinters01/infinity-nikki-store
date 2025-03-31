import axios from 'axios';
import { Item } from '../utilities/utilities';
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';


const API_BASE_URL = "http://localhost:5500"; // Adjust if backend is deployed

export const fetchInventory = createAsyncThunk("inventory/fetchInventory", async () => {
    const response = await axios.get(`${API_BASE_URL}/inventory`);
    return response.data as Item[];
});

// Initial state
const initialState: Item[] = [];

export const inventorySlice = createSlice({
    name: "inventory",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchInventory.pending, (state) => {
                console.log('Fetching inventory...')
            })
            .addCase(fetchInventory.fulfilled, (state, action: PayloadAction<Item[]>) => {
                console.log('Fetched inventory...')
                return action.payload; // Update inventory with fetched data
            })
            .addCase(fetchInventory.rejected, (state, action) => {
                console.error("Error fetching invengtory:", action.payload)
            });
    },


});

export default inventorySlice.reducer;