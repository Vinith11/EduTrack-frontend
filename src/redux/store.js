import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Use localStorage as default
import authReducer from './slices/authSlice';
import { combineReducers } from 'redux';

const persistConfig = {
  key: 'root', // Key for the root reducer
  storage,     // Define storage as localStorage
  whitelist: ['auth'], // Specify which reducers to persist
};

const rootReducer = combineReducers({
  auth: authReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
export default store;
