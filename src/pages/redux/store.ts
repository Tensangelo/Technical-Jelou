import { configureStore } from '@reduxjs/toolkit';
import countReducer from './features/countBooksSlice';

const store = configureStore({
    reducer: {
        readingList: countReducer
    },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch