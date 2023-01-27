import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
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
import { filterSlice } from './filter/filterSlice';
import { contactsSlice } from './contacts/contactsSlice';
import { authSlice } from './auth/slice';
import { contactsInfoAPI } from './contactsInfo/contactsInfoAPI';
import { contactsAPI } from './contacts/operations';

const middleware = [
  ...getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
  contactsInfoAPI.middleware,
  contactsAPI.middleware,
];

const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token'],
};

const store = configureStore({
  reducer: {
    // [contactsSlice.name]: contactsSlice.reducer,
    [filterSlice.name]: filterSlice.reducer,
    [authSlice.name]: persistReducer(authPersistConfig, authSlice.reducer),
    [contactsInfoAPI.reducerPath]: contactsInfoAPI.reducer,
    [contactsAPI.reducerPath]: contactsAPI.reducer,
  },
  middleware,
  devTools: process.env.NODE_ENV === 'development',
});

const persistor = persistStore(store);

export { store, persistor };
