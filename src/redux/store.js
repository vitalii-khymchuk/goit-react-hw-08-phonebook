import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { filterSlice } from './filter/filterSlice';
import { contactsSlice } from './contacts/contactsSlice';
import { authSlice } from './auth/slice';

const rootReducer = combineReducers({
  [contactsSlice.name]: contactsSlice.reducer,
  [filterSlice.name]: filterSlice.reducer,
  [authSlice.name]: authSlice.reducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export { store };
