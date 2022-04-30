import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';

import auth from './features/auth';
import user from './features/user';
import grades from './features/grades';

export const store = configureStore({
  reducer: {
    auth,
    user,
    grades,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

declare global {
  type RootState = ReturnType<typeof store.getState>;
}
declare module 'react-redux' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultRootState extends RootState {}
}
