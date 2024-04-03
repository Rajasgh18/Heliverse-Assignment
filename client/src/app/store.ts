import { configureStore } from '@reduxjs/toolkit';
import userSlice from '../features/userSlice';
import teamSlice from '../features/teamSlice';

const store = configureStore({
    reducer: {
        user: userSlice,
        team: teamSlice
    }
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;