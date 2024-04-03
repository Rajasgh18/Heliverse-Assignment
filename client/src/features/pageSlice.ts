import { createSlice } from "@reduxjs/toolkit";

export type initialStateType = {
    page: number;
};

const initialState: initialStateType = {
    page: 1,
};

const pageSlice = createSlice({
    name: 'page',
    initialState,
    reducers: {
        prevPage: state => {
            state.page--;
        },
        nextPage: state => {
            state.page++;
        },
        setPage: (state, action) => {
            state.page = action.payload;
        }
    },
});

export default pageSlice.reducer;
export const { prevPage, nextPage, setPage } = pageSlice.actions;