import { configureStore, getDefaultMiddleware, Store } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import signUpSlice from './slices/signUpSlice';

export interface ThunkExtraArguments {
  store: Store;
}

const isDevDebug =
  process.env.NODE_ENV !== 'development' && process.env.DEBUG !== 'true';

const thunkArgument = {} as ThunkExtraArguments;

const middleWares = getDefaultMiddleware({
  thunk: {
    extraArgument: thunkArgument,
  },
  serializableCheck: false,
  ...(isDevDebug ? { logger } : {}),
});

const store = configureStore({
  reducer: {
    signUp: signUpSlice,
  },
  middleware: middleWares,
});

thunkArgument.store = store;

export type RootState = ReturnType<typeof store.getState>;

export default store;
