import { createSlice } from "@reduxjs/toolkit";
import { TeamType } from "./teamSlice";

const initialState: TeamType = {
    _id: "",
    name: "",
    members: []
};

const teambarDataSlice = createSlice({
    name: 'teambar-data',
    initialState,
    reducers: {
        setTeambarData: (state, action) => {
            state._id = action.payload._id;
            state.name = action.payload.title;
            state.members = action.payload.members;
        },
        updateMembers: (state, action)=>{
            state.members= action.payload;
        }
    },
});

export default teambarDataSlice.reducer;
export const { setTeambarData, updateMembers } = teambarDataSlice.actions;