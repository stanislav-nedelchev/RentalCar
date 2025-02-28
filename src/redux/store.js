import { configureStore } from '@reduxjs/toolkit';
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
import storage from 'redux-persist/lib/storage';
import { carsReducer } from './cars/slice.js';
import { favoritesReducer } from './favorites/slice.js';
import { filtersReducer } from './filters/slice.js';

const carsConfig = {
  key: 'carsKey',
  storage,
  whitelist: ['cars'],
};

const favoritesPersistConfig = {
  key: 'favorites',
  storage,
};

const filtersPersistConfig = {
  key: 'filters',
  storage,
};

export const store = configureStore({
  reducer: {
    cars: persistReducer(carsConfig, carsReducer),
    favorites: persistReducer(favoritesPersistConfig, favoritesReducer),
    filters: persistReducer(filtersPersistConfig, filtersReducer),
    // filters: filtersReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export const persistor = persistStore(store);
