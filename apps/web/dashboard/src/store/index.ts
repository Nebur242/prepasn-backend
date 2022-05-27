import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import auth from './features/auth';
import user from './features/user';
import { gradesApi } from './features/grades';
import { documentsApi } from './features/documents';
import { coursesApi } from './features/courses';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { chaptersApi } from './features/chapters';

const isDev = import.meta.env.DEV;

export const store = configureStore({
  reducer: {
    auth,
    user,
    [gradesApi.reducerPath]: gradesApi.reducer,
    [documentsApi.reducerPath]: documentsApi.reducer,
    [coursesApi.reducerPath]: coursesApi.reducer,
    [chaptersApi.reducerPath]: chaptersApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(gradesApi.middleware)
      .concat(documentsApi.middleware)
      .concat(coursesApi.middleware)
      .concat(chaptersApi.middleware)
      .concat(coursesApi.middleware)
      .concat(isDev ? logger : null),
  devTools: isDev,
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

declare global {
  type RootState = ReturnType<typeof store.getState>;
}
declare module 'react-redux' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultRootState extends RootState {}
}
