import { createSlice } from "@reduxjs/toolkit";

export type initialStateType = {
    showSidebar: boolean;
};

const initialState: initialStateType = {
    showSidebar: false,
};

const sidebarSlice = createSlice({
    name: 'sidebar',
    initialState,
    reducers: {
        setShowSidebar: state => {
            state.showSidebar = !state.showSidebar;
        }
    },
});

export default sidebarSlice.reducer;
export const { setShowSidebar } = sidebarSlice.actions;