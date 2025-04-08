import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import notesReducer from '../features/notes/notesSlice';
import { 
    useDispatch, 
    useSelector, 
    TypedUseSelectorHook 
  } from 'react-redux';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    notes: notesReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;