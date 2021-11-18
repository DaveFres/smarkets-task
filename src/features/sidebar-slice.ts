import { createSlice } from "@reduxjs/toolkit";

export const sidebarSlice = createSlice({
    name: "sidebar",
    initialState: {
        isOpened: true,
    },
    reducers: {
        toggle: (state) => {
            state.isOpened = !state.isOpened;
        },
    },
});

export const { toggle } = sidebarSlice.actions;

export default sidebarSlice.reducer;
