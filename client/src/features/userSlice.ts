import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const url = import.meta.env.VITE_API;

export type UserType = {
    _id: string;
    first_name: string;
    last_name: string;
    email: string;
    domain: string;
    gender: string;
    avatar: string;
    available: boolean;
};

type InitialStateType = {
    users: UserType[];
    currentPage: number;
    totalPages: number;
    loading: 'Idle' | 'Fullfilled' | 'Pending' | 'Rejected';
    errors: string | null;
};

type FilterUsersType = {
    domain: string,
    available: boolean,
    gender: string,
    page: number
}

const initialState: InitialStateType = {
    users: [],
    currentPage: 1,
    totalPages: 1,
    loading: 'Idle',
    errors: null
};

export const fetchUsers = createAsyncThunk(
    'user/fetchUsers',
    async (page: number) => {
        const res = await axios.get(`${url}/users?page=${page}`);
        return res.data;
    }
);

export const searchUsers = createAsyncThunk(
    'users/search',
    async ({ name, page = 1 }: { name: string, page: number }) => {
        const parts = name.split(' ');
        const first_name = parts[0] || "";
        const last_name = parts[1] || "";
        let res = await axios.get(`${url}/users/search?first_name=${first_name}&last_name=${last_name}&page=${page}`);
        return res.data;
    }
);

export const filterUsers = createAsyncThunk(
    'users/filter',
    async ({ domain, available, gender, page = 1 }: FilterUsersType) => {
        const res = await axios.get(`${url}/users/filter?domain=${domain}&available=${available}&gender=${gender}&page=${page}`)
        return res.data;
    }
)

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: builders => {
        builders.addCase(fetchUsers.pending, state => {
            state.loading = 'Pending';
        }),
            builders.addCase(fetchUsers.fulfilled, (state, action) => {
                state.loading = 'Fullfilled';
                state.users = action.payload.users;
                state.currentPage = action.payload.currentPage;
                state.totalPages = action.payload.totalPages;
            }),
            builders.addCase(fetchUsers.rejected, (state, action) => {
                state.loading = 'Rejected';
                state.errors = action.error.message || 'Failed to fetch users';
            }),

            builders.addCase(searchUsers.pending, state => {
                state.loading = 'Pending';
            }),
            builders.addCase(searchUsers.fulfilled, (state, action) => {
                state.loading = 'Fullfilled';
                state.users = action.payload.users;
                state.currentPage = action.payload.currentPage;
                state.totalPages = action.payload.totalPages;
            }),
            builders.addCase(searchUsers.rejected, (state, action) => {
                state.loading = 'Rejected';
                state.errors = action.error.message || 'Error occured while searching users';
            })

        builders.addCase(filterUsers.pending, state => {
            state.loading = 'Pending';
        }),
            builders.addCase(filterUsers.fulfilled, (state, action) => {
                state.loading = 'Fullfilled';
                state.users = action.payload.users;
                state.currentPage = action.payload.currentPage;
                state.totalPages = action.payload.totalPages;
            }),
            builders.addCase(filterUsers.rejected, (state, action) => {
                state.loading = 'Rejected';
                state.errors = action.error.message || 'Error occured while filtering users';
            })
    }
});

export default userSlice.reducer;