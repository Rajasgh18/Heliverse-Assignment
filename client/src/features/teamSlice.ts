import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { UserType } from "./userSlice";

export type TeamType = {
    _id: string;
    name: string;
    members: UserType[];
};

type initialStateType = {
    teams: TeamType[];
    loading: 'Idle' | 'Fullfilled' | 'Pending' | 'Rejected';
    errors: string | null;
};

const initialState: initialStateType = {
    teams: [],
    loading: 'Idle',
    errors: null
}

const fetchTeams = createAsyncThunk("teams/fetch", async () => {
    const res = await axios.get(`${import.meta.env.VITE_API}/teams`);
    return res.data;
});

const teamSlice = createSlice({
    name: 'teams',
    initialState,
    reducers: {},
    extraReducers: builders => {
        builders.addCase(fetchTeams.pending, state => {
            state.loading = 'Pending'
        }),
            builders.addCase(fetchTeams.fulfilled, (state, action) => {
                state.loading = 'Fullfilled',
                    state.teams = action.payload.teams
            }),
            builders.addCase(fetchTeams.rejected, (state, action) => {
                state.loading = 'Rejected',
                    state.errors = action.error.message || "Error while fetching teams"
            })
    }
});

export default teamSlice.reducer;