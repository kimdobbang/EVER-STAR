// src/store/Store.ts
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import sessionStorage from 'redux-persist/lib/storage/session';
import authReducer from './slices/authSlice';
import petReducer from './slices/petSlice';
import memorialBookReducer from './slices/memorialBookSlice';

const persistConfig = {
  key: 'root',
  storage: sessionStorage,
};

const rootReducer = combineReducers({
  auth: authReducer,
  pet: petReducer,
  memorialBook: memorialBookReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const Store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(Store);

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof Store.dispatch;
