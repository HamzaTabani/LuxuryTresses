import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/AuthSlice';
import ecommerceReducer from './slices/ECommerceSlice'
import stylistReducer from './slices/StylistSlice'
import { combineReducers } from 'redux';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import contact from './services/random';
import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = {
  key: 'root',
  version: 1,
  storage: AsyncStorage,
  whitelist: [
    'userData',
    'ecommerceReducer',
    'stylistReducer'
  ],
  blacklist: [], 
};


const rootReducer = combineReducers({
  // [contact.reducerPath]: contact.reducer,
  userData: authReducer,
  ecommerceReducer: ecommerceReducer,
  stylistReducer: stylistReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  // middleware: getDefaultMiddleware =>
  //   getDefaultMiddleware({
  //     serializableCheck: {
  //       ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
  //     },
  //   }).concat(contact.middleware),
});

export default store;
export const persistor = persistStore(store);
