import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { UserType } from "./userSlice";

export type TeamType = {
    _id: string;
    name: string;
    members: UserType[];
};

type initialStateType = {
    team: TeamType;
    loading: 'Idle' | 'Fullfilled' | 'Pending' | 'Rejected';
    errors: string | null;
};

const initialState: initialStateType = {
    team: { _id: "", name: "", members: [] },
    loading: 'Idle',
    errors: null
}

export const fetchTeam = createAsyncThunk("teams/fetch", async (id: string) => {
    const res = await axios.get(`${import.meta.env.VITE_API}/team/${id}`);
    return res.data;
});

export const addTeams = createAsyncThunk("teams/add", async (data: { name: string, members: UserType[] }) => {
    const res = await axios.post(`${import.meta.env.VITE_API}/team`, data);
    return res.data;
});

const teamSlice = createSlice({
    name: 'teams',
    initialState,
    reducers: {},
    extraReducers: builders => {
        builders.addCase(fetchTeam.pending, state => {
            state.loading = 'Pending'
        }),
            builders.addCase(fetchTeam.fulfilled, (state, action) => {
                state.loading = 'Fullfilled',
                    state.team = action.payload
            }),
            builders.addCase(fetchTeam.rejected, (state, action) => {
                state.loading = 'Rejected',
                    state.errors = action.error.message || "Error while fetching teams"
            }),

            builders.addCase(addTeams.pending, state => {
                state.loading = 'Pending'
            }),
            builders.addCase(addTeams.fulfilled, (state, action) => {
                state.loading = 'Fullfilled',
                    state.team = action.payload
            }),
            builders.addCase(addTeams.rejected, (state, action) => {
                state.loading = 'Rejected',
                    state.errors = action.error.message || "Error while fetching teams"
            })
    }
});

export default teamSlice.reducer;