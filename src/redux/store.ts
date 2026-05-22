import { configureStore } from '@reduxjs/toolkit';
import diaryReducer from './slices/diarySlice';
import authReducer from './slices/authSlice';

const store = configureStore({
  reducer: {
    diary: diaryReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;