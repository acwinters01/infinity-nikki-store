import { Item } from '../utilities/utilities';
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllOutfits, getInventory } from '../utilities/api';


export const fetchInventory = createAsyncThunk("inventory/fetchInventory", async () => {
    const response = await getInventory();
    return response as Item[];
});

export const getOutfits = createAsyncThunk('inventory/getOutfitItems', async () => {
    const response = await getAllOutfits();
    return response as Item[];
})

// Initial state
interface InventoryState {
    inventory: Item[];
    selectedOutfitItems: Item[];
    loading: boolean;
    error: string | null;
}

const initialState: InventoryState = {
    inventory: [],
    selectedOutfitItems: [],
    loading: false,
    error: null,

};

export const inventorySlice = createSlice({
    name: "inventory",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchInventory.pending, (state) => {
                console.log('Fetching inventory...');
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchInventory.fulfilled, (state, action: PayloadAction<Item[]>) => {
                console.log('Fetched inventory...')
                state.inventory = action.payload;
                state.loading = false;
            })
            .addCase(fetchInventory.rejected, (state, action) => {
                console.error("Error fetching inventory:", action.error.message);
                state.loading = false;
                state.error = action.error.message || "Failed to fetch inventory.";
            })

            // Get Outfit Items
            .addCase(getOutfits.pending, (state) => {
                console.log("Fetching Outfits...");
                state.loading = true;
            })
            .addCase(getOutfits.fulfilled, (state, action: PayloadAction<Item[]>) => {
                console.log(`Outfits Fetched...`);
                state.selectedOutfitItems = action.payload;
                state.loading = false;
            })
            .addCase(getOutfits.rejected, (state, action) => {
                console.error("Error Fetching Outfit:", action.error.message);
                state.loading = false
                state.error = action.error.message || `Failed to fetch: ${state}`;
            })
    },


});

export default inventorySlice.reducer;