import { configureStore } from '@reduxjs/toolkit';
import userSlice from '../features/userSlice';
import teamSlice from '../features/teamSlice';
import sidebarSlice from '../features/sidebarSlice';
import teambarSlice from '../features/teambarSlice';
import teambarDataSlice from '../features/teambarDataSlice';
import pageSlice from '../features/pageSlice';

const store = configureStore({
    reducer: {
        user: userSlice,
        team: teamSlice,
        sidebar: sidebarSlice,
        teambar: teambarSlice,
        teambarData: teambarDataSlice,
        page: pageSlice
    }
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;