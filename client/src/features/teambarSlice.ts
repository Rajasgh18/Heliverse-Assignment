import { createSlice } from "@reduxjs/toolkit";

export type initialStateType = {
    showTeambar: boolean;
};

const initialState: initialStateType = {
    showTeambar: false,
};

const teambarSlice = createSlice({
    name: 'teambar',
    initialState,
    reducers: {
        setShowTeambar: state => {
            state.showTeambar = !state.showTeambar;
        }
    },
});

export default teambarSlice.reducer;
export const { setShowTeambar } = teambarSlice.actions;