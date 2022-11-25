import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import auth from './features/auth';
import user from './features/user';
import { gradesApi } from './features/grades';
import { documentsApi } from './features/documents';
import { coursesApi } from './features/courses';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { chaptersApi } from './features/chapters';
import { classroomsApi } from './features/classrooms';
import { studentsApi } from './features/students';
import { instructorsApi } from './features/instructors';
import { adminsApi } from './features/admin';
import { categoriessApi } from './features/categories';
import { exercisesApi } from './features/exercises';
import { questionsApi } from './features/questions';
import { usersApi } from './features/users';
import { sectionsApi } from './features/sections';

const isDev = import.meta.env.DEV;

export const store = configureStore({
  reducer: {
    auth,
    user,
    [gradesApi.reducerPath]: gradesApi.reducer,
    [documentsApi.reducerPath]: documentsApi.reducer,
    [coursesApi.reducerPath]: coursesApi.reducer,
    [chaptersApi.reducerPath]: chaptersApi.reducer,
    [classroomsApi.reducerPath]: classroomsApi.reducer,
    [studentsApi.reducerPath]: studentsApi.reducer,
    [instructorsApi.reducerPath]: instructorsApi.reducer,
    [adminsApi.reducerPath]: adminsApi.reducer,
    [categoriessApi.reducerPath]: categoriessApi.reducer,
    [exercisesApi.reducerPath]: exercisesApi.reducer,
    [sectionsApi.reducerPath]: sectionsApi.reducer,
    [questionsApi.reducerPath]: questionsApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(gradesApi.middleware)
      .concat(documentsApi.middleware)
      .concat(coursesApi.middleware)
      .concat(chaptersApi.middleware)
      .concat(classroomsApi.middleware)
      .concat(studentsApi.middleware)
      .concat(instructorsApi.middleware)
      .concat(adminsApi.middleware)
      .concat(categoriessApi.middleware)
      .concat(exercisesApi.middleware)
      .concat(sectionsApi.middleware)
      .concat(questionsApi.middleware)
      .concat(usersApi.middleware)
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
