import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const initialState: string = 'USD';

export const currencyFilterSlice = createSlice({
    name: "currencyFilter",
    initialState,
    reducers: {
        setCurrency: (state, action: PayloadAction<string>) => {
            console.log(action.payload)
            return action.payload;
        }
    },
})

export const { setCurrency } = currencyFilterSlice.actions;
export default currencyFilterSlice.reducer; 