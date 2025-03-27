import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface LabelFilterState {
    selectedLabels: (string | number)[];
}

const initialState: LabelFilterState = {
    selectedLabels: [],
};

export const labelFilterSlice = createSlice({
    name: "labelFilter",
    initialState,
    reducers: {
        toggleLabel: (state, action: PayloadAction<string | number>) => {
            // console.log('ALEX',typeof action.payload)
            const label = action.payload;
            // console.log("Action Payload Label: ", label)
            if (state.selectedLabels.includes(label)) {
                // console.log(`${label} already added.`)
                state.selectedLabels = state.selectedLabels.filter(l => l !== label);
            } else {
                // console.log("label added: ", label)
                state.selectedLabels.push(label)
            }
        },

        clearLabels: (state) => {
            state.selectedLabels = [];
        }

    }
});

export const { toggleLabel, clearLabels } = labelFilterSlice.actions;
export default labelFilterSlice.reducer;