
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const searchTermSlice = createSlice({
    name: "searchTerm",
    initialState: '',
    reducers: {
        setSearchTerm: (state, action: PayloadAction<string>) => {
             return action.payload
        }, 

        clearSearchTerm: () => {
            return '';
        },
    },
});

export const { setSearchTerm, clearSearchTerm } = searchTermSlice.actions;
export default searchTermSlice.reducer;